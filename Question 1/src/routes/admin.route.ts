import express, { Router } from "express";
import { AdminController } from "../controllers";
import { checkAdmin } from "../middlewares/checkRole.middleware";

const router: Router = express.Router();
const adminController = new AdminController();

router.route("/createGroup").post([checkAdmin], adminController.createGroup);
router
  .route("/addPatientToGroup")
  .patch([checkAdmin], adminController.addPatientToGroup);
router
  .route("/addInfatOrChildToPatientRecord")
  .patch([checkAdmin], adminController.addInfatOrChildToPatientRecord);
router
  .route("/getAllPatientRecords")
  .get([checkAdmin], adminController.getAllPatientRecords);

export default router;
