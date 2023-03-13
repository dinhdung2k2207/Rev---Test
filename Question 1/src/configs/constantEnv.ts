import * as dotEnv from "dotenv";

dotEnv.config();

export const HOST = (process.env.HOST as string) || "http://localhost";
export const PORT = process.env.PORT as string;
export const AUTH_EMAIL = process.env.AUTH_EMAIL as string;
export const AUTH_PASS = process.env.AUTH_PASS as string;
export const DB_CONN_STRING = process.env.DB_CONN_STRING as string;
export const SECRET_KEY = process.env.SECRET_KEY as string;
export const SECRET_REFRESH = process.env.SECRET_REFRESH as string;
export const EXPIRES_ACCESS_TOKEN = process.env.EXPIRES_ACCESS_TOKEN as string;
export const EXPIRES_REFRESH_TOKEN = process.env
  .EXPIRES_REFRESH_TOKEN as string;
export const EXPIRES_SESSION_TOKEN = process.env
  .EXPIRES_SESSION_TOKEN as string;
