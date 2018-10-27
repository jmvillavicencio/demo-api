import mongoose from 'mongoose';

const mockedExperience = require('./mocks/experience.mock');

const ExperienceSchema = new mongoose.Schema({
  company: {
    type: String,
    required: true,
  },
  position: {
    type: String,
    required: true,
  },
  from: {
    type: Date,
    required: true,
  },
  to: Date,
  skills: [{ type: String }],
  image: String,
  type: {
    type: String,
    default: 'job',
  },
},
{
  timestamps: true,
});

ExperienceSchema.methods = {};
ExperienceSchema.statics = {
  async list(params = {}) {
    const list = await this.find(params)
      .sort({ createdAt: -1 })
      .exec();
    if (process.env.DEVELOPMENT && !list.length) {
      if (params.type) {
        return mockedExperience.filter(e => e.type === params.type);
      }
      return mockedExperience;
    }
    return list;
  },
};

const Experience = mongoose.model('Experience', ExperienceSchema);
module.exports = Experience;
