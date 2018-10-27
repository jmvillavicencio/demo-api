import express from 'express';
import commitRoutes from './commit.routes';
import repoRoutes from './repo.routes';

const router = express.Router();

router.use('/commit', commitRoutes);
router.use('/repo', repoRoutes);

export default router;
