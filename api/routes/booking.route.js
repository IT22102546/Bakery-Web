import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import { createBooking, getBookingsByShop, getBookingsByUser, updateBookingStatus } from '../controllers/booking.controller.js';

const router = express.Router();

router.post('/create',verifyToken, createBooking);
router.get('/getBookingsByShop/:shopId', verifyToken, getBookingsByShop);
router.patch('/updateBooking/:bookingId', updateBookingStatus);
router.get('/getBookingsByUser/:userId', getBookingsByUser);

export default router;