import RideRequest from "../models/rideRequest.model.js";
import User from "../models/user.model.js"; // Import the User model
import { errorHandler } from "../utils/error.js";
import bcryptjs from "bcryptjs";

export const createRideRequest = async (req, res, next) => {
    try {
        const { username, email, password, mobile, address, age, idNumber } = req.body;

        const mobileRegex = /^(071|076|077|075|078|070|074|072)\d{7}$/;
        const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{5,}$/;

        // Validate input fields
        if (!username || !email || !password || !mobile || !address || !age || !idNumber) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        } else if (!mobileRegex.test(mobile)) {
            return next(errorHandler(400, "Invalid mobile number format"));
        } else if (!passwordRegex.test(password)) {
            return next(
                errorHandler(
                    400,
                    "Password should be at least 5 characters long and contain at least one uppercase letter, one digit, and one symbol (!@#$%^&*()_+)."
                )
            );
        }else if (username.length < 7 || req.body.username.length > 20) {
            return next(errorHandler(400, 'Username must be between 7 and 20 characters'));}

        
        const existingUser = await User.findOne({
            $or: [{ email }, { mobile }],
        });

        if (existingUser) {
            if (existingUser.email === email) {
                return next(errorHandler(400, "Email is already in use by another account"));
            }
            if (existingUser.mobile === mobile) {
                return next(errorHandler(400, "Mobile number is already in use by another account"));
            }
        }

       
        const newRideRequest = new RideRequest({ username, email, password, mobile, address, age, idNumber });
        await newRideRequest.save();

        res.status(201).json({ success: true, message: "Ride request created successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const getAllRideRequests = async (req, res) => {
    try {
        const rideRequests = await RideRequest.find(); 
        res.status(200).json({ success: true, data: rideRequests });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const confirmRiderRequest = async (req, res) => {
    const { id } = req.params;

    try {
        const riderRequest = await RideRequest.findById(id);

        if (!riderRequest) {
            return res.status(404).json({ success: false, message: "Rider request not found." });
        }

        if (riderRequest.isConfirm) {
            return res.status(400).json({ success: false, message: "Request already confirmed." });
        }

        // Hash the password
          const hashedPassword = bcryptjs.hashSync(riderRequest.password, 10);

      
        const newUser = new User({
            username: riderRequest.username,
            email: riderRequest.email,
            password: hashedPassword, 
            adress: riderRequest.address,
            mobile: riderRequest.mobile,
            IdNumber: riderRequest.idNumber,
            age: riderRequest.age,
            isRider: true,
        });

        await newUser.save();

        // Mark the rider request as confirmed
        riderRequest.isConfirm = true;
        await riderRequest.save();

        res.status(200).json({ success: true, message: "Rider request confirmed." });
    } catch (error) {
        console.error("Error confirming rider request:", error);
        res.status(500).json({ success: false, message: "Server error." });
    }
};
export const rejectRiderRequest = async (req, res) => {
    const { id } = req.params;

    try {
        const riderRequest = await RideRequest.findById(id);

        if (!riderRequest) {
            return res.status(404).json({ success: false, message: "Rider request not found." });
        }

        if (riderRequest.isReject) {
            return res.status(400).json({ success: false, message: "Request already rejected." });
        }

       
        // Mark the rider request as confirmed
        riderRequest.isReject = true;
        await riderRequest.save();

        res.status(200).json({ success: true, message: "Rider request rejected." });
    } catch (error) {
        console.error("Error confirming rider request:", error);
        res.status(500).json({ success: false, message: "Server error." });
    }
};
