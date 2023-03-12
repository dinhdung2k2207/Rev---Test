import express, { Router } from "express";
import {AuthController} from "../controllers/auth.controller";

const router: Router = express.Router();
const authController = new AuthController();

router.route("/signUp").post(authController.signUp);
router.route("/signIn").post(authController.signIn);
router.route("/verifyOTP").post(authController.verifyOtp);

export default router;