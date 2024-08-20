import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import generateToken from "../utlis/generateToken.js";
import twilio from "twilio";

// @ generaten otp
// @route POST /api/users/generate_otp
// @access public
const generateOtpController = asyncHandler(async (req, res) => {
  try {
    let {
      userMobileNumber,
      authSidTwilio,
      authTokenTwilio,
      phoneNumberTwilio,
    } = req.body;

    let userDetailData = await User.findOne({
      mobile_number: userMobileNumber,
    });

    if (userDetailData) {
      let mingeneratedOtpNumber = Math.pow(10, 6 - 1);
      let maxgeneratedOtpNumber = Math.pow(10, 6) - 1;
      let randomNumbergeneratedOtpNumber =
        Math.floor(
          Math.random() * (maxgeneratedOtpNumber - mingeneratedOtpNumber + 1)
        ) + mingeneratedOtpNumber;

      let generatedOtpNumber =
        Math.round(randomNumbergeneratedOtpNumber / 10) * 10;

      let expiryTimeForOtp = new Date();

      expiryTimeForOtp.setMinutes(expiryTimeForOtp.getMinutes() + 10);
      userDetailData["otp"] = generatedOtpNumber;

      userDetailData["expiry"] = expiryTimeForOtp;

      await userDetailData.save();
      let client = twilio(authSidTwilio, authTokenTwilio);

      await client.messages.create({
        body:
          "Please Refer To The Otp For Verification .It Will Expire After 10 minutes.Your Otp is: " +
          generatedOtpNumber,
        from: phoneNumberTwilio,
        to: userDetailData["mobile_number"],
      });

      res.status(200).json({ message: "Otp Sent To Respected Mobile NUmber." });
    } else {
      res.status(400).json({ message: "User Not Found !!!!" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// @ verify otp
// @route POST /api/users/verify_otp
// @access public
const verifyOtpController = asyncHandler(async (req, res) => {
  try {
    let { userMobileNumber, user_otp } = req.body;

    let userDetailData = await User.findOne({
      mobile_number: userMobileNumber,
    });

    if (!userDetailData) {
      return res.status(400).json({ message: "User Not Found !!!!" });
    }

    if (userDetailData.otp !== user_otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    let currentTime = new Date();
    if (currentTime > userDetailData.expiry) {
      return res.status(400).json({ message: "OTP has expired" });
    }

    const token = generateToken(userDetailData._id);

    res
      .status(200)
      .json({ token: token, message: "otp verification success !!!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// @ get user profile
// @route GET /api/users/profile
// @access private

const getUserProfile = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(500).json({ message: "User Not Found !!!" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//@POST add user
// @route POST /api/users/register
//@access public

const registerUser = asyncHandler(async (req, res) => {
  try {
    let {
      name,
      mobile_number,
      aadhar_card_no,
      pan_card_no,
      date_of_birth,
      gender,
      permanent_address,
      job,
    } = req.body;

    let newUser = await User.create({
      name,
      mobile_number,
      aadhar_card_no,
      date_of_birth,
      pan_card_no,
      gender,
      permanent_address,
      job,
    });

    if (newUser) {
      res.status(200).json({ message: "user created successfully !!!" });
    } else {
      res
        .status(500)
        .json({ message: "Make sure to provide all required details !!" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export {
  getUserProfile,
  generateOtpController,
  verifyOtpController,
  registerUser,
};
