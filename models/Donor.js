import mongoose from "mongoose";

const DonorSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    bloodType: { type: String, required: true },
  },
  { timestamps: true }
);

const Donor = mongoose.model("Donor", DonorSchema);
export default Donor;
