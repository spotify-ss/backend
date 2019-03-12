
exports.up = function(knex, Promise) {
    return knex.schema.createTable('artists', artist => {
        artist.increments();

        artist.string('name', 100).notNullable().unique();
    })
    .createTable('tracks', track => {
        track.increments();

        track.string('track_name', 255).notNullable();
        track.string('track_id', 255).notNullable();
        track.decimal('acousticness', null).notNullable();
        track.decimal('danceability', null).notNullable();
        track.integer('duration_ms').notNullable();
        track.decimal('energy', null).notNullable();
        track.decimal('instrumentalness', null).notNullable();
        track.integer('key').notNullable();
        track.decimal('liveness', null).notNullable();
        track.decimal('loudness', null).notNullable();
        track.integer('mode').notNullable();;
        track.decimal('speechiness', null).notNullable();
        track.decimal('tempo', null).notNullable();
        track.integer('time_signature').notNullable();
        track.decimal('valence', null).notNullable();
        track.integer('popularity').notNullable();
        track.string('artist_name', 255);

        track
            .integer('artist_id')
            .unsigned()
            .references('id')
            .inTable('artists')
            .onDelete('CASCADE')
            .onUpdate('CASCADE');
    })
    .createTable('userTracks', userT => {
        userT
            .integer('track_id')
            .unsigned()
            .references('id')
            .inTable('tracks')
            .onDelete('CASCADE')
            .onUpdate('CASCADE');
        
        userT
            .integer('user_id')
            .unsigned()
            .references('id')
            .inTable('users')
            .onDelete('CASCADE')
            .onUpdate('CASCADE');
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('artists').dropTableIfExists('tracks').dropTableIfExists('userTracks');
};
