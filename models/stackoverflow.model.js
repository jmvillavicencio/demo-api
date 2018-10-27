import mongoose from 'mongoose';

const mockedStackoverflow = require('./mocks/stackoverflow.mock');

const StackoverflowSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  questionId: String,
  answerId: String,
},
{
  timestamps: true,
});

StackoverflowSchema.methods = {};
StackoverflowSchema.statics = {
  async list(params = {}) {
    const list = await this.find(params)
      .sort({ createdAt: -1 })
      .exec();
    if (process.env.DEVELOPMENT && !list.length) {
      return mockedStackoverflow;
    }
    return list;
  },
};

const Stackoverflow = mongoose.model('Stackoverflow', StackoverflowSchema);
module.exports = Stackoverflow;


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
  function objectIdFromDate(date) {
    return Math.floor(date.getTime() / 1000).toString(16) + "0000000000000000";
  };
  const datesinmonth = getDaysInMonth(9, 2018);
  const ret = [];
  datesinmonth.forEach((date) => {
	  const objId = objectIdFromDate(date);
    const r = randomIntFromInterval(0,5);
    for (let i = 0; i < r; i++) {
        const questionId = objectIdFromDate(date);
        const answerId = objectIdFromDate(new Date());
        ret.push({
            date: date.toString(),questionId,answerId
        })
    }
  });
  return JSON.stringify(ret);
}
*/
