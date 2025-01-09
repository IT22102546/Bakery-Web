import Booking from '../models/booking.model.js';
import User from '../models/user.model.js';

export const createBooking = async (req, res) => {
  const { shopId, cakeType, quantity, message, contactName, contactNumber, date } = req.body;
  const userId = req.user.id; 

  try {
    const newBooking = new Booking({
      userId,
      shopId,
      cakeType,
      quantity,
      message,
      contactName,
      contactNumber,
      date,
    });

    await newBooking.save();
    res.status(201).json({ message: 'Booking created successfully', booking: newBooking });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to create booking' });
  }
};

export const getBookingsByShop = async (req, res) => {
    try {
      const shopId = req.params.shopId;
  
      // Find bookings with the given shopId
      const bookings = await Booking.find({ shopId });
  
      if (!bookings.length) {
        return res.status(404).json({ message: 'No bookings found for this shop.' });
      }
  
      // Fetch related user data manually
      const enrichedBookings = await Promise.all(
        bookings.map(async (booking) => {
          const user = await User.findById(booking.userId).select('name email');
          return {
            ...booking.toObject(),
            user, 
          };
        })
      );
  
      res.status(200).json({ bookings: enrichedBookings });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ message: 'No Available bookings For this Shop.' });
    }
  };


  export const updateBookingStatus = async (req, res) => {
    const { bookingId } = req.params;
    const { action } = req.body; // 'confirm' or 'reject'
  
    try {
      const booking = await Booking.findById(bookingId);
  
      if (!booking) {
        return res.status(404).json({ message: 'Booking not found.' });
      }
  
      // Update the booking's status based on the action
      if (action === 'confirm') {
        booking.isConfirm = true;
        booking.isReject = false;
      } else if (action === 'reject') {
        booking.isConfirm = false;
        booking.isReject = true;
      } else {
        return res.status(400).json({ message: 'Invalid action.' });
      }
  
      await booking.save();
      res.status(200).json({ message: 'Booking status updated successfully', booking });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ message: 'Failed to update booking status.' });
    }
  };

  export const getBookingsByUser = async (req, res) => {
    try {
      const userId = req.params.userId;
      const bookings = await Booking.find({ userId: userId });
  
      if (!bookings) {
        return res.status(404).json({ message: 'No bookings found for this user.' });
      }
  
      res.status(200).json({ bookings });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  }