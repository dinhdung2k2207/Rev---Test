import express, { Router } from "express";
import { AdminController } from "../controllers";
import { checkAdmin, checkSession } from "../middlewares/checkRole.middleware";

const router: Router = express.Router();
const adminController = new AdminController();

router
  .route("/createGroup")
  .post([checkSession, checkAdmin], adminController.createGroup);
router
  .route("/addPatientToGroup")
  .patch([checkSession, checkAdmin], adminController.addPatientToGroup);
router
  .route("/addInfatOrChildToPatientRecord")
  .patch(
    [checkSession, checkAdmin],
    adminController.addInfatOrChildToPatientRecord
  );
router
  .route("/getAllPatientRecords")
  .get([checkSession, checkAdmin], adminController.getAllPatientRecords);

export default router;
