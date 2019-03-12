const express = require('express');

const Artists = require('../artists/artists-model.js');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const artists = await Artists.getArtists(req.query);

        res.status(200).json(artists);
    } catch (error) {  
        res.status(500).json({ error: 'Something bad happened! Unable to get the list of Artists' });
    }
});

router.get('/artist', async (req, res) => {
    try {
        const artist = await Artists.getArtistByName(req.body.name);
        const tracks = await Artists.getTracksForArtist(artist.id);

        if(artist){
            res.status(200).json({ artist, tracks });
        } else {
            res.status(400).json({ error: 'That artists name is not in the database' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Something bad happened! Unable to get the Artists' });
    }
});
module.exports = router;