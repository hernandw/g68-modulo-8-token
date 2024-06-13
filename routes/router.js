import express from 'express';
import { home, login } from '../controllers/controller.js';

const router = express.Router();

router.get('/', home);
/* router.get('/token', token); */
router.get('/login', login);

export default router;