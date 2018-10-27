import mongoose from 'mongoose';

const mockedRepos = require('./mocks/githubRepos.mock');

const GithubRepoSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
},
{
  timestamps: true,
});

GithubRepoSchema.methods = {};
GithubRepoSchema.statics = {
  async list(params = {}) {
    const list = await this.find(params)
      .sort({ createdAt: -1 })
      .exec();
    if (process.env.DEVELOPMENT && !list.length) {
      return mockedRepos;
    }
    return list;
  },
  get(id) {
    return this.findById(id)
      .exec()
      .then((creditCardTransaction) => {
        if (creditCardTransaction) {
          return creditCardTransaction;
        }
        if (process.env.DEVELOPMENT) {
          const index = mockedRepos.findIndex(e => e._id === id);
          if (index >= 0) {
            return mockedRepos[index];
          }
        }
        return Promise.reject(new Error('No such credit card exists!'));
      });
  }
};

const GithubRepo = mongoose.model('GithubRepo', GithubRepoSchema);
module.exports = GithubRepo;
