import BankRef from "../models/bankDetailModel.js";
import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";

const addBankDetail = asyncHandler(async (req, res) => {
  try {
    let { account_holder_name, account_number, ifsc_code } = req.body;

    let userBankDetail = await BankRef.create({
      account_holder_name,
      account_number,
      ifsc_code,
      user: req.user._id,
    });

    if (userBankDetail) {
      res.status(200).json({
        linkedBankId: userBankDetail._id,
        message: "Bank details added successfully !!!",
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

const getAllLinkedBankDetails = asyncHandler(async (req, res) => {
  try {
    let allBankDetails = await BankRef.find({ user: req.user._id });
    if (allBankDetails.length) {
      res.status(200).json(allBankDetails);
    } else {
      res
        .status(500)
        .json({ message: "No Bank is linked for current user !!!" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export { addBankDetail, getAllLinkedBankDetails };
