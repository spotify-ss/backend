const db = require('../data/dbConfig.js');
const axios = require('axios');

module.exports = {
    getTracks,
    getTrackByName,
    getTracksByArtistId,
    getMeanValue,
    getClosestTracks,
    mapTracks,
    getTrackByTrackId
};

function getTracks(query){
    // let { page = 1, limit = 100, sortby = 'id', sortdir = 'asc' } = query;
    // const offset = limit * (page - 1);

    // let res = db('tracks')
    //     .orderBy(sortby, sortdir)
    //     .limit(limit)
    //     .offset(offset);

    // return res;
    return db('tracks');
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

async function getTrackByTrackId(track_id){
    const track = await db('tracks').where(track_id).first();

    return track;
}

async function getMeanValue(){
    const tracks = await db('tracks');
    
    const data = { songs: tracks, key: 'B652B7B42C7BA2CFCEB4963ED3F92'};
    
    const response = await axios.post('https://spotify-ss-data-science.herokuapp.com/api/v1.0/aggregate', data);
    const json = await response.data;

    let meanvalue = { mean_values: json };

    return meanvalue;
}

async function getClosestTracks(track_id, page_number, tracks) {
    const mean_values = await getMeanValue();
    
    const data = { key: 'B652B7B42C7BA2CFCEB4963ED3F92', songs: tracks, mean_values: mean_values.mean_values };

    
    const response = await axios.post(`https://spotify-ss-data-science.herokuapp.com/api/v1.0/closest/${track_id}/${page_number}`, data);
    const json = await response.data;

    let result = Object.entries(json);

    return result;
}

async function mapTracks(array){
    // const closestTracks =  await array.map( track => {
    //     return getTrackByTrackId({track_id: track[0]});
    // });
    let promises = [];
    for(let i =0; i< array.length; i++){
        let track = getTrackByTrackId({track_id: array[i][0]});
        promises.push(track);
    }

    return Promise.all(promises);
}