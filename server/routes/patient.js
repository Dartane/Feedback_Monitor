import express from "express";
import Controller from "../controllers/patient.js";
import { authenticateToken } from "../middleware/authorization.js";
import { checkPatientRole } from "../middleware/checkPatientRole.js";

const router = express.Router();

router.get( "/finished",  authenticateToken,  checkPatientRole,  Controller.getFinish);
router.get( "/doctor-schedule/:id",  authenticateToken,  checkPatientRole,  Controller.getSchedule);


router.post("/feedback-add",authenticateToken,checkPatientRole,Controller.createFeedback)
router.get("/appointments",authenticateToken,checkPatientRole,Controller.getAppointments)
router.delete("/appointments/:id",authenticateToken,checkPatientRole,Controller.deleteAppointment)
router.put("/appointments/:id",authenticateToken,checkPatientRole,Controller.updateAppointment)

router.get("/receipts",authenticateToken,checkPatientRole, Controller.getReceipt)
router.delete("/receipts/:id",authenticateToken,checkPatientRole, Controller.deleteReceipt)



export default router;
