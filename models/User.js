import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    userType: { type: String, required: true, enum: ["Donor", "Hospital", "BloodBank"] },
    profileId: { type: mongoose.Schema.Types.ObjectId, refPath: "userType" }, // Dynamic reference
    latitude: { type: Number, default: null },  // Store location here
    longitude: { type: Number, default: null }, // Store location here

    subscription: {
      endpoint: String,
      keys: {
        p256dh: String,
        auth: String
      }
    }
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);
export default User;
