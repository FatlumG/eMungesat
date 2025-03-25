import express from "express";
import {
  getAllTours,
  getOneTour,
  addReview,
  createTour,
  updateTour,
  deleteTour,
} from "./tour.controller.js";
import upload from "../../config/multer.js";
import {
  authorize,
  isAuthenticated,
} from "../../middlewares/auth.middleware.js";
const router = express.Router();

router.post(
  "/",
  isAuthenticated,
  authorize("admin", "moderator"),
  upload.single("image"),
  createTour
);
router.get("/", getAllTours);
router.get("/:id", getOneTour);
router.post("/:tourId/addReview", isAuthenticated, addReview);

router.put(
  "/:id",
  isAuthenticated,
  authorize("admin", "moderator"),
  updateTour
);
router.delete(
  "/:id",
  isAuthenticated,
  authorize("admin", "moderator"),
  deleteTour
);

export default router;
