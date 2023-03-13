import { Schema, Types, model } from "mongoose";
import * as roleEnum from "../enums/role.enum";
import * as patientEnum from "../enums/patient.enum";

interface IPatient {
  first_name: string;
  last_name: string;
  email: string;
  address: string;
  group?: any;
  password: string;
  is_verified: boolean;
  verification_code: string;
  type?: patientEnum.PatientType;
  childrens?: [Types.ObjectId];
  role: roleEnum.Role;
  login_sessions: Types.ObjectId;
}

const patientSchema = new Schema<IPatient>(
  {
    first_name: { type: String, trim: true },
    last_name: { type: String, trim: true },
    email: { type: String, trim: true, unique: true },
    address: { type: String, trim: true },
    group: {
      type: Schema.Types.ObjectId,
      ref: "Group",
    },
    password: { type: String, trim: true },
    is_verified: { type: Boolean },
    verification_code: { type: String, trim: true },
    type: { type: String, trim: true },
    childrens: [
      {
        type: Schema.Types.ObjectId,
        ref: "Patient",
      },
    ],
    role: { type: String, trim: true },
    login_sessions: {
      type: Schema.Types.ObjectId,
      ref: "LoginSession",
    },
  },
  { timestamps: true }
);

export const Patient = model<IPatient>("Patient", patientSchema);
