import Booking from "../models/booking.model.js"; // Ensure you have a Booking model
import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";

// Create a booking
export const createBooking = async (req, res, next) => {
  try {
    const { userId, serviceType, date, time, notes } = req.body;

    // Validate user existence
    const user = await User.findById(userId);
    if (!user) {
      return next(errorHandler(404, "User not found"));
    }

    // Create booking
    const newBooking = new Booking({
      userId,
      serviceType,
      date,
      time,
      notes,
    });

    const savedBooking = await newBooking.save();
    res.status(201).json({ message: "Booking created successfully", booking: savedBooking });
  } catch (error) {
    next(error);
  }
};

// Get all bookings (Admin-only)
export const getAllBookings = async (req, res, next) => {
  try {
    if (!req.user.isAdmin) {
      return next(errorHandler(403, "You are not authorized to view all bookings"));
    }

    const bookings = await Booking.find().populate("userId", "username email");
    res.status(200).json({ bookings });
  } catch (error) {
    next(error);
  }
};

// Get bookings by user ID
export const getUserBookings = async (req, res, next) => {
  try {
    const { userId } = req.params;

    // Validate user existence
    const user = await User.findById(userId);
    if (!user) {
      return next(errorHandler(404, "User not found"));
    }

    const bookings = await Booking.find({ userId });
    res.status(200).json({ bookings });
  } catch (error) {
    next(error);
  }
};

// Update a booking
export const updateBooking = async (req, res, next) => {
  try {
    const { bookingId } = req.params;
    const { serviceType, date, time, notes } = req.body;

    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return next(errorHandler(404, "Booking not found"));
    }

    // Check if the booking belongs to the authenticated user or the user is admin
    if (req.user.id !== booking.userId.toString() && !req.user.isAdmin) {
      return next(errorHandler(403, "You are not authorized to update this booking"));
    }

    // Update booking details
    booking.serviceType = serviceType || booking.serviceType;
    booking.date = date || booking.date;
    booking.time = time || booking.time;
    booking.notes = notes || booking.notes;

    const updatedBooking = await booking.save();
    res.status(200).json({ message: "Booking updated successfully", booking: updatedBooking });
  } catch (error) {
    next(error);
  }
};

// Delete a booking
export const deleteBooking = async (req, res, next) => {
  try {
    const { bookingId } = req.params;

    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return next(errorHandler(404, "Booking not found"));
    }

    // Check if the booking belongs to the authenticated user or the user is admin
    if (req.user.id !== booking.userId.toString() && !req.user.isAdmin) {
      return next(errorHandler(403, "You are not authorized to delete this booking"));
    }

    await booking.remove();
    res.status(200).json({ message: "Booking deleted successfully" });
  } catch (error) {
    next(error);
  }
};
