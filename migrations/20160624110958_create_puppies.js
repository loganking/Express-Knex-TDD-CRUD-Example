exports.up = function(knex, Promise) {
  return knex.schema.createTable('puppies', function (table) {
    table.increments();
    table.string('name').notNullable();
    table.string('breed').notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('puppies');
};
