var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server');
chai.use(chaiHttp);
var expect = chai.expect;



describe('the time request', function() {

  before(function(done) {
    server.listen(8080, done);
  });

  after(function(done) {
    server.close(done);
  });

  it('should return the current date via plain text', function(done) {
    chai.request('http://localhost:8080')
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

  before(function(done) {
    server.listen(8080, done);
  });

  after(function(done) {
    server.close(done);
  });

  it('should respond to a get request', function(done) {
    chai.request('http://localhost:8080')
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
    chai.request('http://localhost:8080')
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
