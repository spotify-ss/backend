const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const usersRouter = require('./users-router.js');
const artistsRouter = require('./artists-router.js');

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());
server.use('/api/users', usersRouter);
server.use('/api/artists', artistsRouter);

server.get('/', (req, res) => {
    res.status(200).json({api: 'Api is running'})
});

module.exports = server;