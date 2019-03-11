const db = require('../../data/dbConfig.js');

module.exports = {
    addUser,
    getUserBy
};

async function addUser(user){
    const [id] = await db('users').insert(user);

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