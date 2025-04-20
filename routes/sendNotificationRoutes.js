// routes/sendNotificationRoutes.js
import express from "express";
import { notifyDonors } from "../controllers/sendNotificationController.js";

const router = express.Router();

router.post("/send-notifications", notifyDonors);

export default router;
