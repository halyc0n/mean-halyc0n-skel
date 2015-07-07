var expect = require('chai').expect,
    supertest = require('supertest'),
    api = supertest('http://localhost:8888/users'),

    app = require('../index'),

    User = require('../app/models/user');

describe('Users controller', function() {

  afterEach(function(done) {
    User.remove({}, done);
  });

  describe('index', function() {

    var user;

    before(function(done) {
      user = new User();
      user.username = 'test_username';
      user.password = 'test_password';
      user.save(done);
    });

    it('should return user', function(done) {
      api.get('/')
        .expect(200)
        .end(function(err, res) {
          expect(res.body.length).to.equal(1);
          expect(res.body[0]).to.have.property('username');
          expect(res.body[0].username).to.equal(user.username);
          expect(res.body[0]).not.to.have.property('password');
          done();
        });
    });
  });
});
