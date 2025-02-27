import express from "express";
import userRoutes from "../modules/users/user.routes.js";
import tourRoutes from '../modules/tours/tour.routes.js';

const routers = express.Router();

routers.use("/users", userRoutes);
routers.use("/tours", tourRoutes);

export default routers;
