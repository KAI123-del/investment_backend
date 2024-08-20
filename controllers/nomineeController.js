import NomineeRef from "../models/nomineeModel.js";
import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";

const addNomineeController = asyncHandler(async (req, res) => {
  try {
    let { name, relation, phone, email, aadhaar_number } = req.body;

    let userNomineeRef = await NomineeRef.create({
      name,
      relation,
      phone,
      email,
      aadhaar_number,
      user: req.user._id,
    });

    if (userNomineeRef) {
      res.status(200).json({
        nomineeDataId: userNomineeRef._id,
        message: "Nominee added successfully !!!",
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

const getAllUserNominee = asyncHandler(async (req, res) => {
  try {
    let userRelatedNominee = await NomineeRef.find({ user: req.user._id });
    if (userRelatedNominee.length) {
      res.status(200).json(userRelatedNominee);
    } else {
      res.status(500).json({ message: "No nominee data for current user !!!" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export { addNomineeController, getAllUserNominee };
