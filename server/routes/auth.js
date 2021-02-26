import express from 'express';
import {signup, signinUser} from '../controllers/auth.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/signin', signinUser);

export default router;