import mongoose from "mongoose";

const bankSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    account_holder_name: {
      type: String,
      required: true,
    },
    account_number: {
      type: String,
      required: true,
      unique: true,
    },
    ifsc_code: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const BankRef = mongoose.model("BankRef", bankSchema);

export default BankRef;
