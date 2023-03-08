import express from 'express';
import { getUserDetails } from '../controller/index.js';

const router = express.Router();

router.get('/user', getUserDetails);

export default router;