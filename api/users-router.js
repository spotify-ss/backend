const express = require('express');
const bcrypt = require('bcryptjs');

const Helpers = require('../helpers/helpers.js');
const Users = require('../users/users-model.js');
const tokenService = require('../auth/tokenService.js');
const { authenticate } = require('../auth/authenticate');

const router = express.Router();

router.post('/register', async (req, res) => {
    if(!req.body.username || !req.body.password){
        res.status(400).json({ error: 'Please input a Username and a Password' });
    } else if(req.body.password.length < 8){
        res.status(400).json({ error: 'The Password must be at least 8 characters long'});
    } else {
        try {
            let newUser = req.body;

            const hash = bcrypt.hashSync(newUser.password, 12);

            newUser.password = hash;

            const user = await Users.addUser(newUser);
            const token = tokenService.generateToken(user);

            res.status(201).json({ userID: user.id, username: user.username, token });

        } catch(error) {
            if(error.errno === 19){
                res.status(400).json({ error: 'That username is already taken' });
            } else {
                res.status(500).json({ error: "Something bad happened! The user couldn't be added!" });
            }
        }
    }
});

router.post('/login', async (req, res) => {
    let { username, password } = req.body;

    try {
        const user = await Users.getUserBy({ username });
        
        if(user && bcrypt.compareSync(password, user.password)){
            const token = tokenService.generateToken(user);
            res.status(200).json({ userID: user.id, username: user.username, token });
        } else {
            res.status(401).json({ error: 'Invalid Username or Password' });
        }
    } catch (error){
        res.status(500).json({ error: 'Something bad happened! Unable to login the user' });
    }
});

router.put('/update_password', authenticate, async (req, res) => {
    let { old_password, new_password } = req.body;

    try {
        const user = await Users.getUserBy({ username: req.decoded.username });

        if(user && bcrypt.compareSync(old_password, user.password)){
            const hash = bcrypt.hashSync(new_password, 12);

            new_password = hash;

            const updated = await Users.updateUserPassword(user.id, new_password)
            
            res.status(200).json({ message: 'Password updated!' });
        } else {
            res.status(401).json({ error: 'Invalid Username or Password' });
        }
    } catch(error) {
        console.log(error);
        res.status(500).json({ error: 'Something bad happened!'})
    }
})

router.delete('/delete/user', authenticate, async (req, res) => {
    try {
        const user = await Users.deleteUser(req.decoded.subject);

        res.status(200).json({ message: 'User deleted' });

    } catch(error) {
        console.log(error);
        res.status(500).json({ error: 'Something happened! Unable to delete the user' });
    }
});

router.get('/positive_tracks', authenticate, async (req, res) => {
    try {
        const posTracks = await Users.getUserPosTracks(req.decoded.subject);

        res.status(200).json(posTracks);

    } catch(error) {
        res.status(500).json({ error: 'Something bad happened! Unable to get the list of Positive tracks' });
    }
});

router.post('/add/positive_track', authenticate, async (req, res) => {
    let { user_id, track_id } = req.body;
    let isInList = false;

    try {
        const posTracks = await Users.getUserPosTracks(req.decoded.subject);
    
        for(let i = 0; i < posTracks.length; i++){
            if(track_id === posTracks[i].id){
                isInList = true;
            }
        }

        if(isInList){
            res.status(400).json({ error: 'User already has that song in their Positive Tracks list' });
        } else {
            try {
                const posTrack = await Users.addPositiveTrack(req.decoded.subject, track_id);
        
                res.status(201).json({ message: 'Positive Track added!', posTrack});
            } catch(error) {
                console.log(error)
                res.status(500).json({ error: 'Something bad happened! Unable to add the positive track' });
            }
        }
    } catch(error) {
        res.status(500).json({ error: 'Something bad happened! Unable to check the users Positive Tracks list'})
    }
});

router.delete('/delete/positive_track', authenticate, async (req, res) => {
    try {
        const delTrack = await Users.delPositiveTrack(req.body.track_id);

        if(delTrack) {
            res.status(200).json({ delTrack, message: 'Positive Track deleted!' });
        } else {
            res.status(400).json({ error: 'That Track does not exists' });
        }
    } catch(error) {
        console.log(error);
        res.status(500).json({ error: 'Something bad happened! Unable to delete the positive track'})
    }
});

router.get('/negative_tracks', authenticate, async (req, res) => {
    try {
        const negTracks = await Users.getUserNegTracks(req.decoded.subject);

        res.status(200).json(negTracks);

    } catch(error) {
        res.status(500).json({ error: 'Something bad happened! Unable to get the list of Negative tracks' });
    }
});

router.post('/add/negative_track', authenticate, async (req, res) => {
    let { user_id, track_id } = req.body;
    let isInList = false;

    try {
        const negTracks = await Users.getUserNegTracks(req.decoded.subject);
    
        for(let i = 0; i < negTracks.length; i++){
            if(track_id === negTracks[i].id){
                isInList = true;
            }
        }

        if(isInList){
            res.status(400).json({ error: 'User already has that song in their Negative Tracks list' });
        } else {
            try {
                const posTrack = await Users.addNegativeTrack(req.decoded.subject, track_id);
        
                res.status(201).json({ message: 'Negative Track added!', posTrack });
            } catch(error) {
                console.log(error)
                res.status(500).json({ error: 'Something bad happened! Unable to add the Negative track' });
            }
        }
    } catch(error) {
        res.status(500).json({ error: 'Something bad happened! Unable to check the users Negative tracks list' });
    }
});

router.delete('/delete/negative_track', authenticate, async (req, res) => {
    try {
        const delTrack = await Users.delNegativeTrack(req.body.track_id);

        if(delTrack) {
            res.status(200).json({ message: 'Negative Track deleted!' });
        } else {
            res.status(400).json({ error: 'That Track does not exists' });
        }
    } catch(error) {
        console.log(error);
        res.status(500).json({ error: 'Something bad happened! Unable to delete the positive track'})
    }
});

router.get('/user_predicted_tracks', authenticate, async (req, res) => {
    try {
        let page_number = req.query.page_number || 0;

        const data = await Users.getUserPredictedTracks(req.decoded.subject, page_number);

        const findTracks = await Helpers.mapTracks(data);
        
        const result = { tracks: findTracks};

        res.status(200).json(result);
    } catch(error) {
        console.log(error)
        res.status(500).json(error);
    }
});

module.exports = router;