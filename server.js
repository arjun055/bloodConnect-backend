import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import bloodBankRoutes from "./routes/bloodBankRoutes.js";
import subscriptionRoutes from "./routes/subscriptionRoutes.js";
import notificationRoutes from "./routes/sendNotificationRoutes.js";

dotenv.config();
const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(express.static('public'));

 
// Routes
app.use("/api/auth", authRoutes);
app.use("/api", bloodBankRoutes);
app.use("/api",subscriptionRoutes);
app.use("/api",notificationRoutes);

// Connect to MongoDB
const PORT = 8080;

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("MongoDB Connected");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((error) => console.log("MongoDB connection error:", error));
