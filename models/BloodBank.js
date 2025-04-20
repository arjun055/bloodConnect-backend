import mongoose from "mongoose";

const BloodBankSchema = new mongoose.Schema(
  {
    bloodBankId: { 
      type: String, 
      required: true, 
      unique: true, 
      match: [/^bb.*/, "Blood Bank ID should start with 'bb...'"] 
    },
    name: { type: String, required: true },
  },
  { timestamps: true }
);

const BloodBank = mongoose.model("BloodBank", BloodBankSchema);
export default BloodBank;
