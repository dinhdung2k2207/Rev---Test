import { NextFunction, Request, Response } from "express";
import { Patient } from "../models";

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
        password:
          "$2a$10$Qo1aLdtW/RWBUD16pdXYSeDQcv4GfpcEGt81vKb6HmIrGxw7HuJsq",
        is_verified: true,
        role: "admin",
      });

      return res.json({
        data: adminAcc,
      })
    } catch (error) {
      return next(error);
    }
  };
}
