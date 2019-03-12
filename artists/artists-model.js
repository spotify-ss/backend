const db = require('../data/dbConfig.js');

module.exports = {
    getArtistByName,
    getTracksForArtist
};

function getArtistByName(name) {
    return db('artists')
        .where({ name })
        .first();
}

function getTracksForArtist(id) {
    return db('tracks')
        .where('artist_id', id)
        .then( tracks => tracks.map( track => { return { ...track }}));
}