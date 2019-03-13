const axios = require('axios');
const db = require('../data/dbConfig.js');

module.exports = {
    addUser,
    getUserBy,
    addPositiveTrack,
    addNegativeTrack,
    getUserPredictedTracks,
    getUserFitValues,
    getUserPosTracks,
    getUserNegTracks,
    delPositiveTrack,
    delNegativeTrack
};

async function addUser(user){
    const [id] = await db('users').insert(user, 'id');

    return getUserById(id);
}

function getUserById(id) {
    return db('users')
        .where({ id })
        .first();
}

function getUserBy(username) {
    return db('users')
        .where(username)
        .first();
}

function addPositiveTrack(user_id, track_id) {
    return db('postiveTracks')
        .insert({ user_id, track_id });
}

function addNegativeTrack(user_id, track_id) {
    return db('negativeTracks')
        .insert({ user_id, track_id });
}

function getUserPosTracks(id){
    return db('postiveTracks')
        .join('users', 'users.id', 'postiveTracks.user_id')
        .join('tracks', 'tracks.id', 'postiveTracks.track_id')
        .where('users.id', id)
        .select(
            'acousticness', 
            'danceability', 
            'duration_ms', 
            'energy', 
            'instrumentalness', 
            'key', 
            'liveness', 
            'loudness', 
            'mode', 
            'speechiness', 
            'tempo', 
            'time_signature',
            'valence',
            'popularity',
            'track_name',
            'tracks.track_id',
            'tracks.id');

}

function getUserNegTracks(id){
    return db('negativeTracks')
        .join('users', 'users.id', 'negativeTracks.user_id')
        .join('tracks', 'tracks.id', 'negativeTracks.track_id')
        .where('users.id', id)
        .select(
            'acousticness', 
            'danceability', 
            'duration_ms', 
            'energy', 
            'instrumentalness', 
            'key', 
            'liveness', 
            'loudness', 
            'mode', 
            'speechiness', 
            'tempo', 
            'time_signature',
            'valence',
            'popularity',
            'track_name',
            'tracks.track_id',
            'tracks.id');

}

function delPositiveTrack(track_id) {
    return db('postiveTracks')
        .where({ track_id })
        .del();
}

function delNegativeTrack(track_id) {
    return db('negativeTracks')
        .where({ track_id })
        .del();
}

async function getUserFitValues(user_id){
    const posTracks = await getUserPosTracks(user_id);
    const negTracks = await getUserNegTracks(user_id);
    const { mean_values } = await getMeanValue();

    const data = { key: 'B652B7B42C7BA2CFCEB4963ED3F92', pos_songs: posTracks, neg_songs: negTracks, mean_values };

    const response = await axios.post('https://spotify-ss-data-science.herokuapp.com/api/v1.0/user/fit', data);
    const json = await response.data;

    return json;

}   

async function getUserPredictedTracks(user_id, page_number){
    const tracks = await db('tracks');
    const { mean_values } = await getMeanValue();
    const model = await getUserFitValues(user_id);
    
    const data = { key: 'B652B7B42C7BA2CFCEB4963ED3F92',  songs: tracks, mean_values, model: model };

    const response = await axios.post(`https://spotify-ss-data-science.herokuapp.com/api/v1.0/user/predict/${page_number}`, data);
    const json = await response.data;

    let result = Object.entries(json);

    return result;
}

async function getMeanValue(){
    const tracks = await db('tracks');
    
    const data = { songs: tracks, key: 'B652B7B42C7BA2CFCEB4963ED3F92'};
    
    const response = await axios.post('https://spotify-ss-data-science.herokuapp.com/api/v1.0/aggregate', data);
    const json = await response.data;

    let meanvalue = { mean_values: json };

    return meanvalue;
}