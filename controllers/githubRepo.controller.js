import GithubRepo from '../models/githubRepo.model';
import GithubCommit from '../models/githubCommit.model';

const getAllParticipations = async (req, res) => {
  const allCommits = await GithubCommit.list();
  const allParticipationsByRepoID = allCommits.reduce((acum, actual) => {
    const cpyOfAcum = { ...acum };
    if (!cpyOfAcum[actual.repo]) {
      cpyOfAcum[actual.repo] = 0;
    }
    cpyOfAcum[actual.repo] += 1;
    return cpyOfAcum;
  }, {});
  const allParticipations = {};
  await Promise.all(Object.keys(allParticipationsByRepoID).map(async (repoID) => {
    const repo = await GithubRepo.get(repoID);
    allParticipations[repo.name] = allParticipationsByRepoID[repoID];
  }));
  res.json(allParticipations);
};

export default {
  getAllParticipations,
};
