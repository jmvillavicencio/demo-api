import express from 'express';
import ExperienceCtrl from '../controllers/experience.controller';

const router = express.Router();

router.route('/all').get(ExperienceCtrl.getAll);
router.route('/jobs').get(ExperienceCtrl.getJobs);
router.route('/projects').get(ExperienceCtrl.getProjects);

export default router;
