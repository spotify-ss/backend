const express = require('express');
const bcrypt = require('bcryptjs');

const Users = require('../users/users-model.js');
const tokenService = require('../auth/tokenService.js');

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

            res.status(201).json({ user, token });

        } catch(error) {
            if(error.errno === 19){
                res.status(400).json({ error: 'That username is already taken' });
            } else {
                res.status(500).json({ error: "Something bad happened! The user couldn't be added!" });
            }
        }
    }
});

module.exports = router;