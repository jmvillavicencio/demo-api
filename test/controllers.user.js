const { expect } = require('chai');
const sinon = require('sinon');
const request = require('supertest');
const app = require('../server');

describe('User signup controller', () => {
  it('should not signup user without password', (done) => {
    request(app)
      .post('/user/signup')
      .send({ email: 'algo@algo.com' })
      .expect(500)
      .end((err, res) => {
        expect(res.body).to.have.property('type');
        expect(res.body.type).to.equal('validation');
        expect(res.body).to.have.property('errors');
        expect(res.body.errors).to.be.an('array');
        expect(res.body.errors[0]).to.have.property('msg');
        expect(res.body.errors[0]).to.have.property('param');
        expect(res.body.errors[0].param).to.equal('password');
        done();
      });
  });
  it('should not signup user without email', (done) => {
    request(app)
      .post('/user/signup')
      .send({ password: 'somepassword' })
      .expect(500)
      .end((err, res) => {
        expect(res.body).to.have.property('type');
        expect(res.body.type).to.equal('validation');
        expect(res.body).to.have.property('errors');
        expect(res.body.errors).to.be.an('array');
        expect(res.body.errors[0]).to.have.property('msg');
        expect(res.body.errors[0]).to.have.property('param');
        expect(res.body.errors[0].param).to.equal('email');
        done();
      });
  });
});
