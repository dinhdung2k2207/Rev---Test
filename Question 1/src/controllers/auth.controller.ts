import { NextFunction, Request, Response } from "express";
import * as bcrypt from "bcryptjs";
import { Patient, UserOTPVerification } from "../models";
import nodemailer from "nodemailer";
import { Role } from "../enums/role.enum";
import { generalTokens } from "../utils/generalToken";
import { sendRefreshToken } from "../utils/sendRefreshToken";

export class AuthController {
  public sendOTPVerificationEmail = async (
    { _id, email }: any,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    try {
      const otp = `${Math.floor(1000 + Math.random() * 9000)}`;
      let transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: "dax.padberg@ethereal.email", // generated ethereal user
          pass: "P7CfrthMeSUVd9NGGs", // generated ethereal password
        },
      });
      const mailOptions = {
        from: "dax.padberg@ethereal.email",
        to: email,
        subject: "Verify Your Email",
        html: `<p>Enter ${otp} in the app to verify your email address and complete sign up</p>
        <p>otp code will expires on 1 hours</p>
        `,
      };
      const otpHash = bcrypt.hashSync(otp, 10);
      const newOTPVerification = new UserOTPVerification({
        patientsId: _id,
        otp: otpHash,
        createdAt: Date.now(),
        expiresAt: Date.now() + 3600000,
      });

      await newOTPVerification.save();

      let info = await transporter.sendMail(mailOptions);

      return {
        status: "PENDING",
        message: "Verification otp email sent",
        data: {
          userId: _id,
          email,
          linkEmail: nodemailer.getTestMessageUrl(info)
        },
      };
    } catch (error) {
      return next(error);
    }
  };

  public verifyOtp = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    try {
      const { patientsId, otp } = req.body;

      if (!patientsId || !otp) {
        throw Error("Empty otp details are not allowed");
      } else {
        const userOTPRecords = await UserOTPVerification.find({ patientsId });

        if (userOTPRecords.length <= 0) {
          throw new Error(
            "Account record doesn't exist or has been verified already. Please sign up or login"
          );
        } else {
          const { expiresAt } = userOTPRecords[0];
          const hashedOtp = userOTPRecords[0].otp;

          if (expiresAt < Date.now()) {
            await UserOTPVerification.deleteMany({ patientsId });

            throw new Error("Code has expired. Please request again");
          } else {
            const validOTP = await bcrypt.compare(otp, hashedOtp);

            if (!validOTP) {
              throw new Error("Invalid code passed. Check your inbox");
            } else {
              await Patient.findByIdAndUpdate(patientsId, { is_verified: true });
              await UserOTPVerification.deleteMany({ patientsId });

              return {
                status: "VERIFIED",
                message: "User email verified successfully",
              };
            }
          }
        }
      }
    } catch (error) {
      return next(error);
    }
  };

  public signUp = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    try {
      const { first_name, last_name, email, address, password, type } = req.body;

      const passwordHash = bcrypt.hashSync(password, 10);
      const newPatient = new Patient({
        first_name,
        last_name,
        email,
        address,
        password: passwordHash,
        is_verified: false,
        type,
        role: Role.USER
      });

      await newPatient.save();
      const mail = await this.sendOTPVerificationEmail(newPatient, email, next);

      return res.json({
        data: newPatient,
        mail: mail.data.linkEmail
      })
    } catch (error) {
      return next(error);
    }
  };

  public signIn = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    try {
      const { email, password } = req.body;
      const currUser = await Patient.findOne({ email });

      if (!currUser) {
        return res.json({
          message: "Email wrong",
        });
      }

      const isValidPassword = bcrypt.compareSync(password, currUser.password);

      if (!isValidPassword) {
        return res.json({
          message: "Wrong Password",
        });
      }

      const { accessToken, refreshToken } = generalTokens
      (
        currUser._id.toString()
      );

      sendRefreshToken(res, refreshToken);

      return res.json({
        accessToken,
      })
    } catch (error) {
      return next(error);
    }
  };

}
