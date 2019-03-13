
exports.up = function(knex, Promise) {
    return knex.schema.createTable('postiveSongs', ps => {
        ps
            .integer('user_id')
            .unsigned()
            .references('id')
            .inTable('users')
            .onDelete('CASCADE')
            .onUpdate('CASCADE');

        ps
            .integer('track_id')
            .unsigned()
            .references('id')
            .inTable('tracks')
            .onDelete('CASCADE')
            .onUpdate('CASCADE');

    }).createTable('negativeSongs', ns => {
        ns
            .integer('user_id')
            .unsigned()
            .references('id')
            .inTable('users')
            .onDelete('CASCADE')
            .onUpdate('CASCADE');

        ns
            .integer('track_id')
            .unsigned()
            .references('id')
            .inTable('tracks')
            .onDelete('CASCADE')
            .onUpdate('CASCADE');
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('postiveSongs').dropTableIfExists('negativeSongs');
};
