import { sign } from "jsonwebtoken";
import { SECRET_REFRESH, SECRET_KEY } from "../configs/constantEnv";

export const generalToken = ({
  data,
  expiresIn,
  secretKey,
}: {
  data: object;
  expiresIn: string;
  secretKey: string;
}) => {
  return sign(data, secretKey, { expiresIn });
};

export const generalTokens = (
  userId: string,
  sessionId: string
): {
  accessToken: string;
  refreshToken: string;
} => {
  const accessToken = generalToken({
    data: {
      id: userId,
      sessionId,
    },
    expiresIn: "5d",
    secretKey: SECRET_KEY,
  });

  const refreshToken = generalToken({
    data: {
      id: userId,
      sessionId,
    },
    expiresIn: "7d",
    secretKey: SECRET_REFRESH,
  });

  return {
    accessToken,
    refreshToken,
  };
};
