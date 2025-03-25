import express from "express";
import {
  createBooking,
  getAllBookings,
  getMyBookings,
  cancelBooking,
} from "./bookings.controller.js";
import { isAuthenticated } from "../../middlewares/auth.middleware.js";
const router = express.Router();

router.post("/:tourId/book", isAuthenticated, createBooking);
router.get("/myBookings", isAuthenticated, getAllBookings);
router.get("/myBookings", getMyBookings);
router.patch("/:bookingId/cancel", cancelBooking);

export default router;
