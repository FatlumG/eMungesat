import express from "express";
import {
  getAllTours,
  getOneTour,
  addReview,
  createTour,
  updateTour,
  deleteTour,
} from "./tour.controller.js";

const router = express.Router();

router.get("/", getAllTours);
router.get("/:id", getOneTour);
router.post("/:tourId/addReview", addReview);
router.post("/", createTour);
router.put("/:id", updateTour);
router.delete("/:id", deleteTour);

export default router;
