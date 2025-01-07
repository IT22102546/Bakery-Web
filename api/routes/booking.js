import express from "express";
import {
  createBooking,
  getAllBookings,
  getUserBookings,
  updateBooking,
  deleteBooking,
} from "../controllers/booking.controller.js";
import { verifyToken, verifyAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();
router.post("/", verifyToken, createBooking);
router.get("/", verifyToken, verifyAdmin, getAllBookings);
router.get("/:userId", verifyToken, getUserBookings);
router.patch("/:bookingId", verifyToken, updateBooking);
router.delete("/:bookingId", verifyToken, deleteBooking);

export default router;
