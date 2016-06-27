var express = require('express'),
    router = express.Router(),
    knex = require('../../db/knex');

router.get('/', function(req, res) {
  knex('puppies').select().orderBy('id').then(function(data){
    res.json({puppies:data});
  }).catch(function(err){
    console.error(err);
    res.sendStatus(500);
  });
});

router.get('/:id', function(req, res) {
  knex('puppies').select().where({id: req.params.id}).then(function(data){
    res.json({puppy:data[0]});
  }).catch(function(err){
    console.error(err);
    res.sendStatus(500);
  });
});

router.put('/:id', function(req, res) {
  knex('puppies').update({name: req.body.puppy.name, breed: req.body.puppy.breed}).where({id: req.params.id}).then(function(data){
    res.sendStatus(200);
  }).catch(function(err){
    console.error(err);
    res.sendStatus(500);
  });
});

router.post('/', function(req, res) {
  knex('puppies').insert({name: req.body.puppy.name, breed: req.body.puppy.breed}).then(function(data){
    res.sendStatus(200);
  }).catch(function(err){
    console.error(err);
    res.sendStatus(500);
  });
});

router.delete('/:id', function(req, res){
  knex('puppies').delete().where({id: req.params.id}).then(function(data){
    res.sendStatus(200);
  }).catch(function(err){
    console.error(err);
    res.sendStatus(500);
  });
});

module.exports = router;
