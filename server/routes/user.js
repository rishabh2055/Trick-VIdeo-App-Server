import { Router } from 'express';
import path from 'path';
const router = new Router();
const multer = require('multer');

import User from '../controllers/user';
import Communication from '../controllers/communication';
import {checkDuplicateMobileNoOrEmail} from '../middlewares/verifyUser';
import * as authReq from '../middlewares/authJWT';

const UPLOAD_DIR = path.join(__dirname, '../../src/assets/uploads');

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOAD_DIR);
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});
let upload = multer({storage: storage});

router.post('/login', User.login);
router.post('/signup', [checkDuplicateMobileNoOrEmail], User.signup);
router.get('/currentLocation', User.getCurrentLocation);
router.get('/all', [authReq.verifyToken], User.getAllUsers);
router.get('/communication', [authReq.verifyToken], Communication.getAll);
router.get('/:uid', [authReq.verifyToken], User.getUser);
router.post('/upload', [authReq.verifyToken, upload.single('upload')], User.uploadImage);
router.post('/communication', [authReq.verifyToken], Communication.saveCommunication);

export default router;
