import { Schema, Types, model } from "mongoose";

interface IGroup {
  name: string;
  patients: Types.ObjectId[];
}

const groupSchema = new Schema<IGroup>(
  {
    name: { type: String, trim: true },
    patients: [
      {
        type: Schema.Types.ObjectId,
        ref: "Patient",
      },
    ],
  },
  { timestamps: true }
);

export const Group = model<IGroup>("Group", groupSchema);
