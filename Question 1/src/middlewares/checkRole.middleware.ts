import { Request, Response, NextFunction } from "express";
import _ from "lodash";
import {
  getAuthTokenInfo,
  getUserFromAuthToken,
} from "../utils/getUserFromAuthToken";
import { LoginSession } from "../models";

export const checkSession = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const bearerToken = req.headers.authorization;

    if (!bearerToken) {
      throw new Error("You must be logged in");
    }

    const user = await getUserFromAuthToken(bearerToken);
    console.log("🚀 ~ file: checkRole.middleware.ts:21 ~ user:", user);

    if (!user) {
      throw new Error("Not authenticated to perform operations");
    }

    const tokenData = getAuthTokenInfo(bearerToken);
    const sessionId = _.get(tokenData, "sessionId");

    const session = await LoginSession.findById(sessionId);
    console.log(
      "🚀 ~ file: checkRole.middleware.ts:32 ~ session:",
      session.token
    );

    console.log(user.login_sessions.token === session.token);
    if (user.login_sessions.token !== session.token) {
      throw new Error("Please login again");
    }

    return next();
  } catch (error) {
    return next(new Error("AUTHENTICATION_FAILED"));
  }
};

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

    const user = await getUserFromAuthToken(bearerToken);

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
