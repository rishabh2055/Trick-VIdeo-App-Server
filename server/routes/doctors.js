import { Router } from 'express';
const router = new Router();

import Doctor from '../controllers/doctor';
import * as authReq from '../middlewares/authJWT';

router.post('/department/add', [authReq.verifyToken], Doctor.saveDoctorsDepartment);
router.get('/department/all', [authReq.verifyToken], Doctor.allDoctorsDepartment);
router.post('/:uid', [authReq.verifyToken, authReq.isDoctor], Doctor.updateDoctorProfile);

export default router;
