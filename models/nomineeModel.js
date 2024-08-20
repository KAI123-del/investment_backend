import mongoose from "mongoose";

const nomineeSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    name: {
      type: String,
      required: true,
    },
    relation: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    aadhaar_number: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const NomineeRef = mongoose.model("NomineeRef", nomineeSchema);

export default NomineeRef;
