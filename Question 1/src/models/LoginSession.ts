import { Schema, Types, model } from "mongoose";

interface ILoginSession {
  patient: Types.ObjectId;
  token: string;
  expires_at: any;
}

const loginSessionSchema = new Schema<ILoginSession>(
  {
    patient: {
      type: Schema.Types.ObjectId,
      ref: "Patient",
    },
    token: { type: String, trim: true },
    expires_at: { type: Date },
  },
  { timestamps: true }
);

export const LoginSession = model<ILoginSession>("LoginSession", loginSessionSchema);
