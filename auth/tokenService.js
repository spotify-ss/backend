const webToken = require('jsonwebtoken');

const secret = process.env.JWT_SECRET;

module.exports = {
    generateToken
};

function generateToken(user) {
    const payload = {
        subject: user.id,
        username: user.username
    };

    const options = {
        expiresIn: '1d'
    };

    return webToken.sign(payload, secret, options);
}