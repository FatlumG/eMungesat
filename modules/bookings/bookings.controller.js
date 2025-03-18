import Booking from "./bookings.model.js";
import Tour from "../tours/tour.model.js";

export const createBooking = async (req, res) => {
  try {
    const tourId = req.params.tourId;
    const { guests, date, user } = req.body;
    const tour = await Tour.findById(tourId);
    if (!tour) return res.status(404).json({ message: "Tour not found!" });

    const booking = new Booking({
      user,
      tour: tourId,
      guests,
      date,
    });
    await booking.save();
    res
      .status(201)
      .json({ message: "Booking created successfully", data: booking });
  } catch (error) {
    res.status(400).json({ message: "Server Error", error: error });
  }
};

export const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.status(200).json(bookings);
  } catch (error) {
    res.status(404).json({ message: "Server Error", error: error });
  }
};

export const getMyBookings = async (req, res) => {
  try {
    const userId = req.params.userId;
    const bookings = await Booking.find({ user: userId }).populate(
      "tour",
      "title location price"
    );
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const cancelBooking = async (req, res) => {
  try {
    const bookingId = req.params.bookingId;
    const updatedBooking = await Booking.findByIdAndUpdate(
      bookingId,
      { status: "canceled" },
      { new: true }
    );

    if (!updatedBooking) return res.status(404).json({ message: "Not found!" });

    res.status(200).json({
      message: "Booking canceled successfully!",
      data: updatedBooking,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error });
  }
};
