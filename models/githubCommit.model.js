import mongoose from 'mongoose';

const mockedCommits = require('./mocks/githubCommits.mock');

const GithubCommitSchema = new mongoose.Schema({
  repo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'GithubRepo',
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
},
{
  timestamps: true,
});

GithubCommitSchema.methods = {};
GithubCommitSchema.statics = {
  async list(params = {}) {
    const list = await this.find(params)
      .sort({ createdAt: -1 })
      .exec();
    if (process.env.DEVELOPMENT && !list.length) {
      return mockedCommits;
    }
    return list;
  },
};

const GithubCommit = mongoose.model('GithubCommit', GithubCommitSchema);
module.exports = GithubCommit;


/*
* For creating mocked data i used the next function
function createData() {
  function getDaysInMonth(month, year) {
     var date = new Date(year, month, 1);
     var days = [];
     while (date.getMonth() === month) {
        days.push(new Date(date));
        date.setDate(date.getDate() + 1);
     }
     return days;
  }
  function randomIntFromInterval(min,max) {
      return Math.floor(Math.random()*(max-min+1)+min);
  }
  const datesinmonth = getDaysInMonth(9, 2018);
  const ret = [];
  const mockedRepos = require('./githubRepos.mock');

  mockedRepos.forEach((repo) => {
  	datesinmonth.forEach((date) => {
  	  const r = randomIntFromInterval(0,5);
    	for (let i = 0; i < r; i++) {
    		ret.push({
    			repo: repo._id,
    			date: date.toString()
    		});
    	}
    });
  });
  return JSON.stringify(ret);
}
*/
