
exports.up = function(knex, Promise) {
    return knex.schema.createTable('users', user => {
        user.increments();

        user.string('username', 100).notNullable().unique();
        user.string('password', 255).notNullable();
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('users');
};  
