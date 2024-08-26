import 'mocha';
import supertest from 'supertest';
import app from './App';
import {Receipt} from './schema';

describe('Receipt Processor', () => {
    const receipt: Receipt = {
        retailer: "retailer",
        purchaseDate: "2024-08-26",
        purchaseTime: "12:34",
        items: [{shortDescription: 'item description', price: '20.00'}],
        total: "20.00",
    };

    describe('POST /receipts/process', () => {
        it('successfully processes receipt', (done) => {
            supertest(app)
                .post('/receipts/process')
                .send(receipt)
                .expect(200)
                .expect('Content-Type', /json/, done);
        });

        it('returns status code 400 if sent an invalid receipt', (done) => {
            supertest(app)
                .post('/receipts/process')
                .send({})
                .expect(400, done);
        });
    });

    describe('GET /receipts/:id/points', () => {
        it('successfully gets the points for the receipt', (done) => {
            supertest(app)
                .post('/receipts/process')
                .send(receipt)
                .end((postErr, postRes) => {
                    if (postErr) throw postErr;

                    supertest(app)
                        .get(`/receipts/${postRes.body.id}/points`)
                        .expect(200, {points: 83})
                        .expect('Content-Type', /json/, done);
                })
        });

        it('returns status code 404 if sent an unknown id', (done) => {
            supertest(app)
                .get('/receipts/1/points')
                .expect(404, done);
        });
    });
});