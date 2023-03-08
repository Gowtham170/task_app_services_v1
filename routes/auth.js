import express from 'express';
import multer from 'multer';

import { register, login, logout, isLoggedIn } from '../controller/index.js';

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads');
  },
  filename: (req, file, cb) => {
    cb(
      null,
      new Date().toISOString().replace(/:/g, '-') + '-' + file.originalname
    );
  },
});

const filefilter = (req, file, cb) => {
  const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png'];
  if(allowedFileTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
      cb(null, false);
  }
};


const upload = multer({ storage: storage, filefilter: filefilter });

router.post('/register', upload.single('imageFile'), register);
router.post('/login', login);
router.get('/logout', logout);
router.get('/isLoggedIn', isLoggedIn);

export default router;  