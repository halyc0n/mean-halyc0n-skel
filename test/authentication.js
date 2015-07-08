'use strict';

var expect    = require('chai').expect,
    supertest = require('supertest'),
    index     = supertest('http://localhost:8888'),
    utils     = require('./utils/utils.js'),
    app       = require('../index'),
    User      = require('../app/models/user');

describe('Authentication', function() {

  afterEach(function(done) {
    User.remove({}, done);
  });

  describe('signup', function() {

    it('should register user', function(done) {
      index.post('/signup')
        .send({ username: 'test_username', password: 'test_password' })
        .expect(200)
        .end(function(err, res) {

          User.count({}, function(err, count) {
            expect(count).to.equal(1);
            done();
          });
        });
    });
  });

  describe('signup', function() {

    before(function(done) {
      utils.createUser(done);
    });

    it('should not register user', function(done) {
      index.post('/signup')
        .send({ username: 'test_username', password: 'test_password' })
        .expect(200)
        .end(function(err, res) {

          User.count({}, function(err, count) {
            expect(count).to.equal(1);
            done();
          });
        });
    });
  });

  describe('login', function() {

    beforeEach(function(done) {
      utils.createUser(done);
    });

    it('should redirect to /admin#/', function(done) {
      index.post('/login')
        .send({ username: 'test_username', password: 'test_password' })
        .expect(200)
        .end(function(err, res) {
          expect(res.statusCode).to.equal(302);
          expect(res.headers.location).to.equal('/admin#/');
          done();
        });
    });

    it('should redirect to /login (wrong password)', function(done) {
      index.post('/login')
        .send({ username: 'test_username', password: 'password' })
        .expect(200)
        .end(function(err, res) {
          expect(res.statusCode).to.equal(302);
          expect(res.headers.location).to.equal('/login');
          done();
        });
    });

    it('should redirect to /login (wrong username)', function(done) {
      index.post('/login')
        .send({ username: 'username', password: 'test_password' })
        .expect(200)
        .end(function(err, res) {
          expect(res.statusCode).to.equal(302);
          expect(res.headers.location).to.equal('/login');
          done();
        });
    });
  });
});
