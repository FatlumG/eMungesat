import express from "express";
import userRoutes from "../modules/users/user.routes.js";
import tourRoutes from "../modules/tours/tour.routes.js";
import bookingRoutes from "../modules/bookings/bookings.routes.js";
import authRoutes from "../auth/auth.routes.js";

const routers = express.Router();

routers.use("/users", userRoutes);
routers.use("/tours", tourRoutes);
routers.use("/bookings", bookingRoutes);
routers.use("/auth", authRoutes);

export default routers;
