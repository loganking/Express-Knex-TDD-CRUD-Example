var expect = require('chai').expect;
var app = require('../app')
var request = require('supertest')(app);
var Promise = require('bluebird');
var knex = require('../db/knex');
var config = require('../knexfile')['test'];

beforeEach(function(done){
    knex.migrate.rollback().then(function(data){
      return knex.migrate.latest();
    }).then(function(data){
      return knex.seed.run();
    }).then(function(data){
      done();
    }).catch(function(error){
      done(error);
    });
});

describe("GET /puppies", function () {
  it("should return a successful response", function (done) {
    request.get('/puppies')
      .expect(200)
      .end(function (err, res) {
        if (err) return done(err)
        expect(res.text).to.have.length.above(0);
        done();
      })
  });
})

describe("GET /api/v1/puppies", function () {
  it("should return all puppy resources ordered by id", function (done) {
    request.get('/api/v1/puppies')
      .end(function (err, res) {
        if (err) return done(err)
        expect(res.body.puppies.length).to.eq(3);
        expect(res.body.puppies[0]).to.deep.eq({id:1, name:'George', breed:'Great Dane'});
        expect(res.body.puppies[1]).to.deep.eq({id:2, name:'Spot', breed:'Corgi'});
        expect(res.body.puppies[2]).to.deep.eq({id:3, name:'Joe', breed:'Labradoodle'});
        done();
      })
  });
})

describe("POST /puppies", function () {
  it("should return a redirection response after creating new puppy", function (done) {
    request.post('/puppies')
      .type('form')
      .send('puppy[name]=yips')
      .send('puppy[breed]=Chihuahua')
      .expect(302)
      .end(function (err, res) {
        if (err) return done(err)
        expect(res.text).to.have.length.above(0);
        done();
      })
  });
})
