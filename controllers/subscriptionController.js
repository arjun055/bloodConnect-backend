import User from "../models/User.js";

export const saveSubscription = async (req, res) => {
  const { userId, subscription } = req.body;

  if (!userId || !subscription) {
    return res.status(400).json({ error: "userId and subscription are required" });
  }

  try {
    await User.findByIdAndUpdate(userId, { subscription });
    res.status(200).json({ message: "Subscription saved!" });
  } catch (err) {
    console.error("Error saving subscription:", err);
    res.status(500).json({ error: "Failed to save subscription" });
  }
};
