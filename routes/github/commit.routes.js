import express from 'express';
import GithubCommitCtrl from '../../controllers/gihubCommit.controller';

const router = express.Router();

router.route('/totalByDate')
  .get(GithubCommitCtrl.getTotalByDate);

export default router;
