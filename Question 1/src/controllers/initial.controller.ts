import { NextFunction, Request, Response } from "express";
import { Patient } from "../models";
import * as bcrypt from "bcryptjs";
import { Role } from "../enums/role.enum";
import { PatientType } from "../enums/patient.enum";
export class InitialController {
  public initAdminAcc = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    try {
      const adminAcc = await Patient.create({
        first_name: "Admin",
        last_name: "Admin",
        email: "admin@gmail.com",
        password: bcrypt.hashSync("12345678", 10),
        is_verified: true,
        role: Role.ADMIN,
      });

      return res.json({
        data: adminAcc,
      });
    } catch (error) {
      return next(error);
    }
  };

  public initPatientAccount = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    try {
      // Parent
      for (let index = 0; index < 10; index++) {
        await Patient.create({
          first_name: `Patient ${index}`,
          last_name: `Last name ${index}`,
          email: `patient${index}@gmail.com`,
          password: bcrypt.hashSync("12345678", 10),
          is_verified: true,
          role: Role.USER,
          type: PatientType.PARENT,
        });
      }

      //Infant
      for (let index = 10; index < 20; index++) {
        await Patient.create({
          first_name: `Infant ${index}`,
          last_name: `Infant Last name ${index}`,
          email: `Infant${index}@gmail.com`,
          password: bcrypt.hashSync("12345678", 10),
          is_verified: true,
          role: Role.USER,
          type: PatientType.INFANT,
        });
      }

      //Child
      for (let index = 20; index < 30; index++) {
        await Patient.create({
          first_name: `Child ${index}`,
          last_name: `Child Last name ${index}`,
          email: `Child${index}@gmail.com`,
          password: bcrypt.hashSync("12345678", 10),
          is_verified: true,
          role: Role.USER,
          type: PatientType.CHILD,
        });
      }

      return res.json({
        message: "Init patient records success",
      });
    } catch (error) {
      return next(error);
    }
  };
}
