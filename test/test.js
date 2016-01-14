var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server');
chai.use(chaiHttp);
var expect = chai.expect;



describe('the time request', function() {

  it('should return the current date via plain text', function(done) {
    chai.request(server)
      .get('/time')
      .end(function(err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res).to.have.header('content-type', 'text/plain');
        done();
      });
  });
});

describe('the greet url', function() {

  it('should respond to a get request', function(done) {
    chai.request(server)
      .get('/greet/George')
      .end(function(err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res).to.have.header('content-type', 'text/plain');
        expect(res.text).to.equal('Hi George');
        done();
      });
  });

  it('should respond to a post request', function(done) {
    chai.request(server)
      .post('/greet')
      .type('form')
      .send({ name: 'George'})
      .end(function(err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res).to.have.header('content-type', 'text/plain');
        expect(res.text).to.equal('Hi George');
        done();
      });
  });
});
