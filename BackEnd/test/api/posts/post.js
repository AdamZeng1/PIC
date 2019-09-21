const expect = require('chai').expect;
const request = require('supertest');


const app = require('../../../app');
const db = require('../../../models/db');

describe("POST /register", () => {
    before((done) => {
        db.connect()
            .then(() => done())
            .catch((err) => done(err));
    });

    after((done) => {
        db.close()
            .then(() => done())
            .catch((err) => done(err));
    });

    it('OK, register a new user', (done) => {
        request(app).post('/user/register')
            .type('form')
            .send('username=startTest&password=1234567&email=13023128@student.uts.edu.au')
            .then((res) => {
                const body = res.body;
                console.log(body);
                expect(body).to.contain.property('success');
                expect(body).to.contain.property('message');
                done();
            })
            .catch((err)=>done(err));
    });
});
