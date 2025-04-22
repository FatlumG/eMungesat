import express from "express";
import {
  createBookingAndCheckoutSession,
  getMyBooking,
  cancelBooking,
  handleStripeWebhook,
  updateBooking,
  confirmBooking,
} from "./booking.controller.js";
import { isAuthenticated } from "../../middleware/auth.middleware.js";
const router = express.Router();
router.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  handleStripeWebhook
);

router.post("/:tourId/book", isAuthenticated, createBookingAndCheckoutSession);
router.put("/:bookingId", isAuthenticated, updateBooking);
router.put("/:bookingId/confirm", isAuthenticated, confirmBooking);
router.get("/myBookings", isAuthenticated, getMyBooking);
router.delete("/:bookingId/cancel", isAuthenticated, cancelBooking);

export default router;
