const express = require('express');

const Tracks = require('../tracks/tracks-model.js');

const router = express.Router();


router.get('/', async (req, res) => {
    try {
        const track = await Tracks.getTrackByName(req.query.track_name);

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
        res.status(500).json({ error: 'Something bad happened! Unable to find the Artists Tracks' });
    }
});

router.get('/mean_value', async (req, res) => {
    try {
        const meanvalue = await Tracks.getMeanValue();

        if(meanvalue){
            res.status(200).json(meanvalue);
        } else {
            res.status(400).json({ error: 'didnt get it' })
        }
    } catch (error) {
        res.status(500).json({ error: 'unable to get mean values' });
    }
});

router.get('/get_closest_tracks/:track_name', async (req, res) => {
    try {
        let page_number = req.query.page_number || 0;

        const { track_id } = await Tracks.getTrackByName(req.params.track_name) ;
        
        const closestTracks = await Tracks.getClosestTracks(track_id, page_number);

        const findTracks = await Tracks.mapTracks(closestTracks);
        
        const result = { tracks: findTracks};
        
        res.status(200).json(result);
    } catch(error) {
        res.status(500).json({ error: 'Unable to get the closets tracks to the current track' });
    }
});

module.exports = router;