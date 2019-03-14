const request = require('supertest');

const server = require('../api/server.js');

describe('artists-router.js', () => {
    describe('GET /', () => {
        it('should return a status code 200 on succesful request', async () => {
            const res = await request(server).get('/api/artists');

            expect(res.status).toBe(200);
        });
    });

    describe('GET /artist/:name', () => {
        it('should return a status code 200 if the artist name is in the database', async () => {
            const res = await request(server).get('/api/artists/artist/yg');

            expect(res.status).toBe(200);
        });
    });
});