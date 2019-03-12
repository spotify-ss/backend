const db = require('../data/dbConfig.js');

module.exports = {
    getTracks,
    getTrackByName,
    getTracksByArtistId
};

function getTracks(query){
    let { page = 1, limit = 100, sortby = 'id', sortdir = 'asc' } = query;
    const offset = limit * (page - 1);

    let res = db('tracks')
        .orderBy(sortby, sortdir)
        .limit(limit)
        .offset(offset);

    return res;
}

function getTrackByName(track_name){
    return db('tracks')
        .where({ track_name })
        .first();
}

function getTracksByArtistId(artist_id){
    return db('tracks')
        .where({ artist_id });
}