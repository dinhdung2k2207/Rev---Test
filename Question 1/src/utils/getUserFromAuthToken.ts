import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import _ from "lodash";
import { SECRET_KEY } from "../configs/constantEnv";
import { Patient } from "../models";

export const getUserFromAuthToken = async (
  bearerToken: string
): Promise<any> => {
  const data = getAuthTokenInfo(bearerToken);
  const id = _.get(data, "id");
  const user = await Patient.findById(id).populate("login_sessions");

  return user;
};

export const getAuthTokenInfo = (bearerToken: string) => {
  const token = bearerToken.split(" ")[1];
  const data: any = verify(token, SECRET_KEY || "");

  return data;
};
