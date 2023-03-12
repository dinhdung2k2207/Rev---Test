import express, { Router } from "express";
import { AdminController } from "../controllers";

const router: Router = express.Router();
const adminController = new AdminController();

router.route("/createGroup").post(adminController.createGroup);
router.route("/addPatientToGroup").patch(adminController.addPatientToGroup);
router.route("/addInfatOrChildToPatientRecord").patch(adminController.addInfatOrChildToPatientRecord);
router.route("/getAllPatientRecords").get(adminController.getAllPatientRecords);

export default router;