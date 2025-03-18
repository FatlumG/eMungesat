import express from "express";
import {
  createBooking,
  getAllBookings,
  getMyBookings,
  cancelBooking,
} from "./bookings.controller.js";
const router = express.Router();

router.post("/:tourId/book", createBooking);
router.get("/myBookings", getAllBookings);
router.get("/myBookings/:userId", getMyBookings);
router.patch("/:bookingId/cancel", cancelBooking);

export default router;
