exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('puppies').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('puppies').insert({name: 'George', breed: 'Great Dane'}),
        knex('puppies').insert({name: 'Spot', breed: 'Corgi'}),
        knex('puppies').insert({name: 'Joe', breed: 'Labradoodle'})
      ]);
    });
};
