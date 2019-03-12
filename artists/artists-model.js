const db = require('../data/dbConfig.js');

module.exports = {
    getArtists,
    getArtistByName,
    getTracksForArtist
};

function getArtists(){
    return db('artists');
}
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