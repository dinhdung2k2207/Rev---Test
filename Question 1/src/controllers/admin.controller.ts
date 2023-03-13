import { NextFunction, Request, Response } from "express";
import { Group, Patient } from "../models";
import { Role } from "../enums/role.enum";
import { PatientType } from "../enums/patient.enum";

export class AdminController {
  public addPatientToGroup = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    try {
      const { groupID, patients } = req.body;
      const currGroup = await Group.findById(groupID);

      if (!currGroup) {
        return res.json({
          error: true,
          message: "Group is not exist",
        });
      }

      currGroup.patients = [...currGroup.patients, ...patients];

      await currGroup.save();

      return res.json({
        message: "Add patients to group successfully",
        data: currGroup,
      });
    } catch (error) {
      return next(error);
    }
  };

  public addInfantOrChildToPatientRecord = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    try {
      const { patientID, childID } = req.body;
      const patient = await Patient.findOne({
        _id: patientID,
        type: PatientType.PARENT,
      });

      if (!patient) {
        throw new Error("Patient is not exist");
      }

      const child = await Patient.find({
        _id: childID,
        $or: [{ type: PatientType.CHILD }, { type: PatientType.INFANT }],
      });

      if (!child) {
        throw new Error("Patient is not exist");
      }

      patient.childrens.push(childID);
      await patient.save();

      return res.json({
        data: patient,
      });
    } catch (error) {
      return next(error);
    }
  };

  public createGroup = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    try {
      const { name, patients } = req.body;
      const newGroup = await Group.create({
        name,
        patients,
      });

      return res.json({
        data: newGroup,
      });
    } catch (error) {
      return next(error);
    }
  };

  public getAllPatientRecords = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    try {
      let queryObject = { ...req.query };
      let queryString = JSON.stringify(queryObject);

      queryString = queryString.replace(
        /\b(gte|gt|lte|lt)\b/g,
        (match) => `$${match}`
      );
      queryObject = JSON.parse(queryString);

      let allPatients = await Patient.find({
        is_verified: true,
        role: Role.USER,
        ...queryObject,
      }).populate("childrens");

      return res.json({
        data: allPatients,
        count: allPatients.length,
      });
    } catch (error) {
      return next(error);
    }
  };
}
