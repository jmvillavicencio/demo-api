import express from 'express';
import GithubRepoCtrl from '../../controllers/githubRepo.controller';

const router = express.Router();

router.route('/allParticipations')
  .get(GithubRepoCtrl.getAllParticipations);

export default router;
