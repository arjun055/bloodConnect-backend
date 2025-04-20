import express from "express";
import { getAllBloodBanks } from "../controllers/bloodBankController.js";

const router = express.Router();

router.get("/bloodbanks", getAllBloodBanks);

export default router;
