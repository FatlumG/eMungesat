import express from "express";
import {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "./user.controller.js";
import {
  authorize,
  isAuthenticated,
} from "../../middlewares/auth.middleware.js";
const router = express.Router();

router.get(
  "/getAllUsers",
  isAuthenticated,
  authorize("admin", "moderator"),
  getUsers
);
router.post("/createUsers", createUser);
router.get("/getOneUser/:id", isAuthenticated, getUserById);
router.put("/updateUser/:userId", isAuthenticated, updateUser);
router.delete(
  "/deleteUser/:id",
  isAuthenticated,
  authorize("admin", "moderator"),
  deleteUser
);
router.delete("/deleteMe", isAuthenticated, deleteUser);

export default router;
