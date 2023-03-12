import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import { SECRET_KEY } from "../configs/constantEnv";
import _ from "lodash";
import { Patient } from "../models";

export const checkAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const bearerToken = req.headers.authorization;

    if (!bearerToken) {
      throw new Error("You must be logged in");
    }
    
    const token = bearerToken.split(" ")[1];
    const data: any = verify(token, SECRET_KEY || "");
    const id = _.get(data, "id");
    const user = await Patient.findById(id);

    if (!user) {
      throw new Error("Not authenticated to perform operations");
    }

    if (user.role !== "admin") {
      throw new Error("User not permission");
    }

    return next();
  } catch (error) {
    return next(new Error("AUTHENTICATION_FAILED"));
  }

};
