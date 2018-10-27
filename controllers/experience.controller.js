import Experience from '../models/experience.model';


const getAll = async (req, res) => {
  const all = await Experience.list();
  return res.json(all);
};

const getJobs = async (req, res) => {
  const all = await Experience.list({ type: 'job' });
  return res.json(all);
};

const getProjects = async (req, res) => {
  const all = await Experience.list({ type: 'project' });
  return res.json(all);
};

export default {
  getAll,
  getProjects,
  getJobs,
};
