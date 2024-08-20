import express from "express";
import {
  getUserProfile,
  generateOtpController,
  verifyOtpController,
  registerUser,
} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();
router.post("/login", generateOtpController);
router.route("/verify_otp").post(verifyOtpController);
router.route("/add_user").post(registerUser);
router.route("/profile").get(protect, getUserProfile);

export default router;
