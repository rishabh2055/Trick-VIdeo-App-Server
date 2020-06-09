import { Router } from 'express';
const router = new Router();

import user from './user';
import appointment from './appointment';
import doctors from './doctors';

router.use('/user', user);
router.use('/appointment', appointment);
router.use('/doctor', doctors);

export default router;
