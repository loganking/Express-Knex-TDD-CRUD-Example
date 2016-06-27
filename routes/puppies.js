var express = require('express'),
    router = express.Router(),
    knex = require('../db/knex');

router.get('/', function(req, res) {
  knex('puppies').select().orderBy('id').then(function(data){
    res.status(200).render('puppies/index', {puppies:data});
  }).catch(function(err){
    console.error(err);
    res.sendStatus(500);
  });
});

router.get('/new', function(req, res) {
  res.render('puppies/new');
});

router.get('/:id', function(req, res) {
  knex('puppies').select().where({id: req.params.id}).then(function(data){
    res.status(200).render('puppies/show', {puppy:data[0]});
  }).catch(function(err){
    console.error(err);
    res.sendStatus(500);
  });
});

router.get('/:id/edit', function(req, res) {
  knex('puppies').select().where({id: req.params.id}).then(function(data){
    res.status(200).render('puppies/edit', {puppy:data[0]});
  }).catch(function(err){
    console.error(err);
    res.sendStatus(500);
  });
});

router.put('/:id', function(req, res) {
  knex('puppies').update({name: req.body.puppy.name, breed: req.body.puppy.breed}).where({id: req.params.id}).then(function(data){
    res.redirect('/puppies');
  }).catch(function(err){
    console.error(err);
    res.sendStatus(500);
  });
});

router.post('/', function(req, res) {
  knex('puppies').insert({name: req.body.puppy.name, breed: req.body.puppy.breed}).then(function(data){
    res.redirect('/puppies');
  }).catch(function(err){
    console.error(err);
    res.sendStatus(500);
  });
});

router.delete('/:id', function(req, res){
  knex('puppies').delete().where({id: req.params.id}).then(function(data){
    res.redirect('/puppies');
  }).catch(function(err){
    console.error(err);
    res.sendStatus(500);
  });
});

module.exports = router;
