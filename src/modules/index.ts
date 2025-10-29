import express from 'express';
import combinations from './combinations/router';
const router = express.Router();

router.use('', combinations);

export default router;