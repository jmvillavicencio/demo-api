import GithubCommit from '../models/githubCommit.model';

const getTotalByDate = async (req, res) => {
  const all = await GithubCommit.list();
  const totalByDate = all.reduce((acum, actual) => {
    const cpyOfAcum = { ...acum };
    if (!cpyOfAcum[actual.date]) {
      cpyOfAcum[actual.date] = 0;
    }
    cpyOfAcum[actual.date] += 1;
    return cpyOfAcum;
  }, {});
  res.json(totalByDate);
};

export default {
  getTotalByDate,
};
