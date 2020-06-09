import { Router } from 'express';
const router = new Router();

import Appointment from '../controllers/appointment';
import * as authReq from '../middlewares/authJWT';

router.get('/', [authReq.verifyToken, authReq.isDoctor], Appointment.getAllAppointments);
router.post('/add', [authReq.verifyToken, authReq.isDoctor], Appointment.addNewAppointment);
router.post('/delete', [authReq.verifyToken, authReq.isDoctor], Appointment.deleteAppointment);

export default router;
