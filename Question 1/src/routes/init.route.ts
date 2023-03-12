import express, { Router } from "express";
import { InitialController } from "../controllers/";

const initialController = new InitialController
const router: Router = express.Router();

router.route('/initAdminAcc').post(initialController.initAdminAcc);

export default router;