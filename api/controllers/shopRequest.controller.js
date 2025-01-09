import ShopRequest from "../models/shopRequest.model.js";
import User from "../models/user.model.js"; // Import the User model
import { errorHandler } from "../utils/error.js";
import bcryptjs from "bcryptjs";

export const createShopRequest = async (req, res, next) => {
    try {
        const { username, email, password, mobile, address } = req.body;

        const mobileRegex = /^(071|076|077|075|078|070|074|072)\d{7}$/;
        const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{5,}$/;

        // Validate input fields
        if (!username || !email || !password || !mobile || !address) {
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
            return next(errorHandler(400, 'ShopName must be between 7 and 20 characters'));}
    

        
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

       
        const newRideRequest = new ShopRequest({ username, email, password, mobile, address});
        await newRideRequest.save();

        res.status(201).json({ success: true, message: "Shop request created successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const confirmShopRequest = async (req, res) => {
    const { id } = req.params;

    try {
        const shopRequest = await ShopRequest.findById(id);

        if (!shopRequest) {
            return res.status(404).json({ success: false, message: "Rider request not found." });
        }

        if (shopRequest.isConfirm) {
            return res.status(400).json({ success: false, message: "Request already confirmed." });
        }


        const hashedPassword = bcryptjs.hashSync(shopRequest.password, 10);

        // Create a new user from the shop request
        const newUser = new User({
            username: shopRequest.username,
            email: shopRequest.email,
            password: hashedPassword, 
            adress: shopRequest.address,
            mobile: shopRequest.mobile,
            isAdmin: true,
        });

        await newUser.save();

        shopRequest.isConfirm = true;
        await shopRequest.save();

        res.status(200).json({ success: true, message: "Shop request confirmed." });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error." });
    }
};


export const rejectmShopRequest = async (req, res) => {
    const { id } = req.params;

    try {
        const shopRequest = await ShopRequest.findById(id);

        if (!shopRequest) {
            return res.status(404).json({ success: false, message: "Shop request not found." });
        }

        if (shopRequest.isReject) {
            return res.status(400).json({ success: false, message: "Request already rejected." });
        }


        shopRequest.isReject = true;
        await shopRequest.save();

        res.status(200).json({ success: true, message: "Shop request confirmed." });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error." });
    }
};


export const getAllShopRequests = async (req, res) => {
    try {
        const shopRequests = await ShopRequest.find(); 
        res.status(200).json({ success: true, data: shopRequests });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};