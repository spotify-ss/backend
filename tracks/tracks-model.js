const db = require('../data/dbConfig.js');
const axios = require('axios');

module.exports = {
    getTracks,
    getTrackByName,
    getTracksByName,
    getTracksByArtistId,
    getClosestTracks,
    getClosestValues
};

function getTracks(){
    // let { page = 1, limit = 100, sortby = 'id', sortdir = 'asc' } = query;
    // const offset = limit * (page - 1);

    // let res = db('tracks')
    //     .orderBy(sortby, sortdir)
    //     .limit(limit)
    //     .offset(offset);

    // return res;
    return db('tracks');
}
async function getTrackByName(track_name){
    const tracks = await getTracks();
    let input = track_name.toLowerCase();
    let track;

    for(let i = 0; i < 6000; i++){
        if(tracks[i].track_name.toLowerCase() === input){
            track = tracks[i];
        }
    }
    
    return track;
}
async function getTracksByName(track_name){
    const tracks = await getTracks();
    let input = track_name.toLowerCase();
    let track = [];

    for(let i = 0; i < 6000; i++){
        if(tracks[i].track_name.toLowerCase().includes(input)){
            track.push(tracks[i]);
        }
    }
    
    return track;
    // return db('tracks')
    //     .where({ track_name })
    //     .first();
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

async function getClosestTracks(track_id, page_number) {
    const tracks = await getTracks();
    const { mean_values } = await getMeanValue();
    
    const data = { key: 'B652B7B42C7BA2CFCEB4963ED3F92', songs: tracks, mean_values };

    
    const response = await axios.post(`https://spotify-ss-data-science.herokuapp.com/api/v1.0/closest/${track_id}/${page_number}`, data);
    const json = await response.data;

    let result = Object.entries(json);

    return result;
}

async function getClosestValues(target, page_number) {
    const tracks = await getTracks();
    const { mean_values } = await getMeanValue();

    const data = { key: 'B652B7B42C7BA2CFCEB4963ED3F92', songs: tracks, mean_values, target };

    const response = await axios.post(`https://spotify-ss-data-science.herokuapp.com/api/v1.0/closest/target/${page_number}`, data);
    const json = await response.data;

    let result = Object.entries(json);

    return result;
}
