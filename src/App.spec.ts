import 'mocha';
import supertest from 'supertest';
import app from './App';

describe('GET /', () => {
    it('gets the Home message', (done) => {
        supertest(app)
            .get('/')
            .expect('Content-Type', /json/)
            .expect(200, JSON.stringify({message: 'Home'}))
            .end(done);
    });
});