
exports.up = function(knex, Promise) {
    return knex.schema.createTable('postiveTracks', pt => {
        pt
            .integer('user_id')
            .unsigned()
            .references('id')
            .inTable('users')
            .onDelete('CASCADE')
            .onUpdate('CASCADE');

        pt
            .integer('track_id')
            .unsigned()
            .references('id')
            .inTable('tracks')
            .onDelete('CASCADE')
            .onUpdate('CASCADE');

    }).createTable('negativeTracks', nt => {
        nt
            .integer('user_id')
            .unsigned()
            .references('id')
            .inTable('users')
            .onDelete('CASCADE')
            .onUpdate('CASCADE');

        nt
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
