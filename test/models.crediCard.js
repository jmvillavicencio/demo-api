const { expect } = require('chai');
const sinon = require('sinon');
require('sinon-mongoose');

const CreditCard = require('../models/creditCard.model');

describe('Credit Card Model', () => {
  it('should create a new credit card', (done) => {
    const CreditCardMock = sinon.mock(new CreditCard({ number: '4509540494005423', name: 'test', expiry: '11/2018' }));
    const creditCard = CreditCardMock.object;

    CreditCardMock
      .expects('save')
      .yields(null);

    creditCard.save((err) => {
      CreditCardMock.verify();
      CreditCardMock.restore();
      expect(err).to.be.null;
      done();
    });
  });
  it('should return error', (done) => {
    const CreditCardMock = sinon.mock(new CreditCard({ number: '4509540494005423' }));
    const creditCard = CreditCardMock.object;
    const expectedError = {
      name: 'ValidationError'
    };
    CreditCardMock
      .expects('save')
      .yields(expectedError);

    creditCard.save((err, result) => {
      CreditCardMock.verify();
      CreditCardMock.restore();
      expect(err.name).to.equal('ValidationError');
      expect(result).to.be.undefined;
      done();
    });
  });
});
