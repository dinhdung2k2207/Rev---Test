import express from "express";
import authRouter from "./auth.route";
import initialRouter from "./init.route";
import adminRouter from "./admin.route";

const router = express.Router();

router.use(authRouter);
router.use(initialRouter);
router.use(adminRouter);

export default router;
