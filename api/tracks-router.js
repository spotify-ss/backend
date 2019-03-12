const express = require('express');

const Tracks = require('../tracks/tracks-model.js');

const router = express.Router();


router.get('/', async (req, res) => {
    try {
        const track = await Tracks.getTrackByName(req.body.track_name);

        if(track){
            res.status(200).json(track);
        } else {
            res.status(400).json({ error: 'The Track with that name is not in the database' });
        }
    } catch (error){
        res.status(500).json({ error: 'Something bad happend! Unable to find the track' });
    }
});

router.get('/artist/:id', async (req, res) => {
    try {
        const tracks = await Tracks.getTracksByArtistId(req.params.id);

        if(tracks) {
            res.status(200).json(tracks);
        } else {
            res.status(400).json({ error: "That Artist isn't in the database or we don't have any Tracks" })
        }
    } catch (error) {

    }
});

module.exports = router;