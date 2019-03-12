const db = require('../data/dbConfig.js');

module.exports = {
    getTrackByName,
    getTracksByArtistId
};

function getTrackByName(track_name){
    return db('tracks')
        .where({ track_name })
        .first();
}

function getTracksByArtistId(artist_id){
    return db('tracks')
        .where({ artist_id });
}