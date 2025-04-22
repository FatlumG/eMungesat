import express from "express";
import {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  deleteMe,
  getMe,
} from "./user.controller.js";
import {
  authorize,
  isAuthenticated,
} from "../../middleware/auth.middleware.js";
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
router.get("/me", isAuthenticated, getMe);
router.delete("/deleteMe", isAuthenticated, deleteMe);

export default router;
