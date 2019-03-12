const db = require('../data/dbConfig.js');
const axios = require('axios');

module.exports = {
    getTracks,
    getTrackByName,
    getTracksByArtistId,
    getMeanValue
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

async function getMeanValue(){
    const tracks = await db('tracks');
    
    const data = { songs: tracks, key: 'B652B7B42C7BA2CFCEB4963ED3F92'};
    
    const response = await axios.post('https://spotify-ss-data-science.herokuapp.com/api/v1.0/aggregate', data);
    const json = await response.data;

    let meanvalue = { mean_values: json };
    
    return meanvalue;
}

