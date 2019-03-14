const request = require('supertest');

const server = require('../api/server.js');

describe('tracks-router.js', () => {
    describe('GET /', () => {
        it('should return a status code of 200', async () => {
            const res = await request(server).get('/api/track');

            expect(res.status).toBe(200);
        });
    });

    describe('GET /:name', () => {
        it('should return a status code of 200', async () => {
            const res = await request(server).get('/api/track/a');

            expect(res.status).toBe(200);
        });
    });

    describe('GET /artist/:id', () => {
        it('should return a status code of 200', async () => {
            const res = await request(server).get('/api/track/artist/500');

            expect(res.status).toBe(200);
        });
    });
});