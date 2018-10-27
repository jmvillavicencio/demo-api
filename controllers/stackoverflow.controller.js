import Stackoverflow from '../models/stackoverflow.model';

const getAnswersByDate = async (req, res) => {
  const all = await Stackoverflow.list();
  const totalAnswersByDate = all.reduce((acum, actual) => {
    const cpyOfAcum = { ...acum };
    if (!cpyOfAcum[actual.date]) {
      cpyOfAcum[actual.date] = 0;
    }
    cpyOfAcum[actual.date] += 1;
    return cpyOfAcum;
  }, {});
  res.json(totalAnswersByDate);
};

export default {
  getAnswersByDate,
};
