const express = require('express');

const Helpers = require('../helpers/helpers.js');
const Tracks = require('../tracks/tracks-model.js');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const tracks = await Tracks.getTracks(req.query);

        res.status(200).json(tracks);
    } catch (error){
        res.status(500).json({ error: 'Something bad happened! Unable to get the list of tracks' });
    }
});

router.get('/:track_name', async (req, res) => {
        try {
            const track = await Tracks.getTracksByName(req.params.track_name);
    
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

        if(tracks.length === 0) {
            res.status(400).json({ error: "That Artist isn't in the database or we don't have any Tracks for the Artist" })
        } else{
            res.status(200).json(tracks);
        }
    } catch (error) {
        res.status(500).json({ error: 'Something bad happened! Unable to find the Artists Tracks' });
    }
});

router.get('/get_closest_tracks/:track_name', async (req, res) => {
    try {
        let page_number = req.query.page_number || 0;
        
        const { track_id } = await Tracks.getTrackByName(req.params.track_name) ;
        
        const closestTracks = await Tracks.getClosestTracks(track_id, page_number);

        const findTracks = await Helpers.mapTracks(closestTracks);
        
        const result = { tracks: findTracks};
        
        res.status(200).json(result);
    } catch(error) {
        console.log(error)
        res.status(500).json({ error: 'Unable to get the closest tracks to the current track' });
    }
});

router.post('/change_feature_values', async (req, res) => {
    try {
        let page_number = req.query.page_number || 0;

        const target = req.body;

        const values = await Tracks.getClosestValues(target, page_number);

        const findTracks = await Helpers.mapTracks(values);
        
        const result = { tracks: findTracks};

        res.status(200).json(result)
    } catch (error){
        console.log(error);
        res.status(500).json({error: 'Unable to change the target values'})
    }
})

module.exports = router;