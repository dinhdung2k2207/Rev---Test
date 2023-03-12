import { Schema, Types, model } from "mongoose";

interface IUserOTPVerification {
  patientsId: Types.ObjectId;
  otp: string;
  createdAt: any;
  expiresAt: any;
}

const UserOTPVerificationSchema = new Schema<IUserOTPVerification>(
  {
    patientsId: {
      type: Schema.Types.ObjectId,
      ref: "Patient",
    },
    otp: { type: String, trim: true },
    createdAt: { type: Date },
    expiresAt: { type: Date },
  },
  { timestamps: true }
);

export const UserOTPVerification = model<IUserOTPVerification>(
  "UserOTPVerification",
  UserOTPVerificationSchema
);
