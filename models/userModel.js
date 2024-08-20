import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    mobile_number: {
      type: Number,
      required: true,
    },
    aadhar_card_no: {
      type: String,
      required: false,
    },
    pan_card_no: {
      type: String,
      required: false,
    },
    date_of_birth: {
      type: Date,
      required: false,
    },
    gender: {
      type: String,
      required: false,
    },
    permanent_address: {
      type: String,
      required: false,
    },
    job: {
      type: String,
      required: false,
    },
    otp: {
      type: Number,
      required: false,
    },
    profile_image: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.matchPassword = async function (enteredPassword) {
  console.log("pass is here", enteredPassword);
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model("User", userSchema);

export default User;
