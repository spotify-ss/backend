const db = require('../data/dbConfig.js');

module.exports = {
    getArtists,
    getArtistByName,
    getTracksForArtist
};

function getArtists(query){
    let { page = 1, limit = 100, sortby = 'id', sortdir = 'asc' } = query;
    const offset = limit * (page - 1);

    let res = db('artists')
        .orderBy(sortby, sortdir)
        .limit(limit)
        .offset(offset);

    return res;
}
async function getArtistByName(name) {
    const artists = await db('artists');
    let input = name.toLowerCase();
    let artist;

    for(let i = 0; i < 2975; i++){
        if(artists[i].name.toLowerCase() === input){
            artist = artists[i];
        }
    }
    
    return artist;
    // return db('artists')
    //     .where({ name })
    //     .first();
}

function getTracksForArtist(id) {
    return db('tracks')
        .where('artist_id', id)
        .then( tracks => tracks.map( track => { return { ...track }}));
}