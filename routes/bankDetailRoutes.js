import express from "express";
import {
  addBankDetail,
  getAllLinkedBankDetails,
} from "../controllers/bankDetailController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/add_bank").post(protect, addBankDetail);
router.route("/get_all_linked_banks").post(protect, getAllLinkedBankDetails);

export default router;
