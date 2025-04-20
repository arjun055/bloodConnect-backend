import mongoose from "mongoose";

const HospitalSchema = new mongoose.Schema(
  {
    hospitalId: { 
      type: String, 
      required: true, 
      unique: true, 
      match: [/^hos.*/, "Hospital ID should start with 'hos...'"] 
    },
    name: { type: String, required: true },
  },
  { timestamps: true }
);

const Hospital = mongoose.model("Hospital", HospitalSchema);
export default Hospital;
