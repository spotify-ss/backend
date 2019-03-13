const db = require('../data/dbConfig.js');

module.exports = {
    mapTracks
}

async function getTrackByTrackId(track_id){
    const track = await db('tracks').where(track_id).first();

    return track;
}

async function mapTracks(array){
    let promises = [];

    for(let i =0; i< array.length; i++){
        let track = getTrackByTrackId({track_id: array[i][0]});
        promises.push(track);
    }

    return Promise.all(promises);
}