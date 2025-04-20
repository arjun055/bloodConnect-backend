import bcrypt from "bcryptjs";
import User from "../models/User.js";
import Donor from "../models/Donor.js";
import Hospital from "../models/Hospital.js";
import BloodBank from "../models/BloodBank.js";

// SIGNUP-API
export const signup = async (req, res) => {
    try {
        let { username, email, password, userType, bloodType, id, latitude, longitude } = req.body;

        if(userType==="donor"){
            userType="Donor"
        }else if(userType==="hospital"){
            userType="Hospital"
        }else{
            userType="BloodBank"
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists. Please login!" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        let profile;
        if (userType === "Donor") {
            profile = await Donor.create({ username, bloodType});
        } else if (userType === "Hospital") {
            profile = await Hospital.create({ hospitalId: id, name: username});
        } else if (userType === "BloodBank") {
            profile = await BloodBank.create({ bloodBankId: id, name: username});
        } else {
            return res.status(400).json({ message: "Invalid user type!" });
        }

        // Create user entry
        const newUser = await User.create({
            email,
            password: hashedPassword,
            userType,
            profileId: profile._id,
            latitude,
            longitude
        });

        res.status(201).json({
            message: "User registered successfully!",
            user:{
                _id: newUser._id,
                email: newUser.email,
                userType: newUser.userType
            }
        });
    } catch (error) {
        console.error("Signup error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// LOGIN-API
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User not found. Please sign up!" });
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials!" });
        }

        res.status(200).json({ 
            message: "Login successful!",
            user:{
                _id: user._id,
                email: user.email,
                userType: user.userType
            }
        });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};


