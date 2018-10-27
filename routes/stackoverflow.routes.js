import express from 'express';
import StackoverflowCtrl from '../controllers/stackoverflow.controller';

const router = express.Router();

router.route('/totalAnswersByDate').get(StackoverflowCtrl.getAnswersByDate);

export default router;
