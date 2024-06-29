import express from "express";
import {
  deleteUser,
  getUsers,
  getUser,
  updateUser,
  savePost,
  profilePosts,
  createBooking,
  getNotifications,
} from "../controllers/user.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";


const router = express.Router();

router.get("/", getUsers);
router.get("/search/:id", verifyToken, getUser);
router.put("/:id", verifyToken, updateUser);
router.delete("/:id", verifyToken, deleteUser);
router.post("/save", verifyToken, savePost);
router.get("/profilePosts/:id", verifyToken, profilePosts);

router.post("/booking", verifyToken, createBooking);


router.get("/notifications", verifyToken, getNotifications);




export default router;