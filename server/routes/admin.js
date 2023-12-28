import express from "express";
import Controller from "../controllers/admin.js";
import multer from 'multer';

import { authenticateToken } from "../middleware/authorization.js";
import { checkAdminRole } from "../middleware/checkAdminRole.js";

const router = express.Router();


const upload = multer({ dest: 'uploads/' });

router.post("/doctor-add", authenticateToken,checkAdminRole, Controller.addDoctor);
router.get("/engineers", authenticateToken,checkAdminRole, Controller.getAllDoctors);
router.get("/engineersnames", authenticateToken,checkAdminRole, Controller.getAllDoctorsNames);
router.delete("/doctor/:id", authenticateToken,checkAdminRole, Controller.deleteDoctor);
router.put("/doctor/:id", authenticateToken, Controller.updateDoctor);
router.get('/engfeedtable/:id',authenticateToken, Controller.getEngFeedTableById);


router.post("/schedule-create",authenticateToken,checkAdminRole,Controller.createSchedule);
router.get("/doctor-schedule/:id",authenticateToken, checkAdminRole,Controller.getSchedule);
router.get("/doctor-schedules",authenticateToken, Controller.getAllSchedules);
router.delete("/doctor-schedule/:id",authenticateToken,checkAdminRole,Controller.deleteSchedule)

export default router;
