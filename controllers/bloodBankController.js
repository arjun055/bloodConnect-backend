import User from "../models/User.js";
import BloodBank from "../models/BloodBank.js";

export const getAllBloodBanks = async (req, res) => {
  try {
    // Find all users with userType "blood bank" and populate profileId (BloodBank details)
    const bloodBanks = await User.find({ userType: "BloodBank" })
      .populate({ path: "profileId", model: "BloodBank" })
      .select("email latitude longitude profileId"); // Only fetch necessary fields

    console.log("POPULATED DATA: ", bloodBanks[0].profileId); // Should show name and bloodBankId

    // Transform the data to return required fields in a structured format
    const formattedBloodBanks = bloodBanks.map((bb) => ({
      bloodBankId: bb.profileId?.bloodBankId || null,
      name: bb.profileId?.name || "Unknown",
      mail: bb.email,
      latitude: bb.latitude,
      longitude: bb.longitude,
    }));

    // console.log("BloodBanks: ",formattedBloodBanks, " ", formattedBloodBanks.length);
    res.status(200).json(formattedBloodBanks);
  } catch (error) {
    console.error("Error fetching blood banks:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
