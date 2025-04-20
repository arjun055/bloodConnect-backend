import webpush from "../config/webpush.js";
import User from "../models/User.js";

// Haversine formula to calculate distance (in km)
const getDistanceInKm = (lat1, lon1, lat2, lon2) => {
  const toRad = (val) => (val * Math.PI) / 180;
  const R = 6371; // Earth's radius in km
 
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

export const notifyDonors = async (req, res) => {
  const { title, message, hospitalLat, hospitalLng, range, bloodType } = req.body;

  try {
    // Get all donors with valid subscriptions and location
    const allDonors = await User.find({
      userType: "Donor",
      subscription: { $ne: null },
      latitude: { $exists: true },
      longitude: { $exists: true },
    })
    .populate({ path: "profileId", model: "Donor" })
    .select("email latitude longitude profileId subscription");

    let eligibleDonors = [];

    // if (range === "Everyone") {
    //   eligibleDonors = allDonors;
    // } else {
    //   const maxRange = Number(range);
    //   eligibleDonors = allDonors.filter((donor) => {
    //     const distance = getDistanceInKm(
    //       hospitalLat,
    //       hospitalLng,
    //       donor.latitude,
    //       donor.longitude
    //     );

    //     const isWithinRange = range === "Everyone" || distance <= Number(range);
    //     const isMatchingBloodType = bloodType === "Everyone" || ( donor.profileId && donor.profileId.bloodType === bloodType );
    //     // return distance <= maxRange;
    //     return isWithinRange && isMatchingBloodType;
    //   });
    // }

    if (range === "Everyone") {
      eligibleDonors = allDonors.filter((donor) => {
        const isMatchingBloodType = bloodType === "Everyone" || (donor.profileId && donor.profileId.bloodType === bloodType);
        return isMatchingBloodType;
      });
    } else {
      const maxRange = Number(range);
      eligibleDonors = allDonors.filter((donor) => {
        const distance = getDistanceInKm(
          hospitalLat,
          hospitalLng,
          donor.latitude,
          donor.longitude
        );
    
        const isWithinRange = distance <= maxRange;
        const isMatchingBloodType = bloodType === "Everyone" || (donor.profileId && donor.profileId.bloodType === bloodType);
    
        return isWithinRange && isMatchingBloodType;
      });
    }
    

    eligibleDonors.map((donor)=>{
      console.log(donor.email);
    })

    if (eligibleDonors.length === 0) {
      return res.json({ message: "No eligible donors found in this range." });
    }

    const payload = JSON.stringify({ title, message });

    for (const donor of eligibleDonors) {
      try {
        await webpush.sendNotification(donor.subscription, payload);
      } catch (err) {
        console.error(`Failed to notify donor ${donor.email || donor._id}:`, err);
      }
    }

    res.status(200).json({ message: `Notifications sent to ${eligibleDonors.length} donors.` });
  } catch (err) {
    console.error("Notification sending failed:", err);
    res.status(500).json({ error: "Failed to send notifications" });
  }
};

