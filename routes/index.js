import express from 'express';
import experienceRoutes from './experience.routes';
import stackoverflowRoutes from './stackoverflow.routes';
import githubRoutes from './github';

const router = express.Router();

router.route('/ping').get((req, res) => {
  res.send('pong');
});
router.use('/experience', experienceRoutes);
router.use('/stackoverflow', stackoverflowRoutes);
router.use('/github', githubRoutes);

export default router;
