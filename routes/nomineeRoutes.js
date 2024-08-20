import express from "express";
import {
  addNomineeController,
  getAllUserNominee,
} from "../controllers/nomineeController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/add_nominee").post(protect, addNomineeController);
router.route("/get_all_nominee").post(protect, getAllUserNominee);

export default router;
