const db = require('../data/dbConfig.js');

module.exports = {
    addUser,
    getUserBy,
    addPostiveTrack,
    addNegativeTrack
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

function addPostiveTrack(user_id, track_id) {
    return db('postiveTracks')
        .insert({ user_id, track_id });
}

function addNegativeTrack(user_id, track_id) {
    return db('negativeTracks')
        .insert({ user_id, track_id });
}
function getUserPosSongs(){

}

function getUserNegSongs(){

}

async function getUserFitValues(){

}

async function getMeanValue(){
    const tracks = await db('tracks');
    
    const data = { songs: tracks, key: 'B652B7B42C7BA2CFCEB4963ED3F92'};
    
    const response = await axios.post('https://spotify-ss-data-science.herokuapp.com/api/v1.0/aggregate', data);
    const json = await response.data;

    let meanvalue = { mean_values: json };

    return meanvalue;
}