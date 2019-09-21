process.env.NODE_ENV === "test";

const expect = require('chai').expect;
const request = require('supertest');


const app = require('../../../app');
const db = require('../../../models/db');

describe("test user module", () => {
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

    /** register test */
    it('register', (done) => {
        const number = Math.ceil(Math.random() * 100000000);
        request(app).post('/user/register')
            .type('form')
            .send("username=startTest"+number+"&password=1234567&email=13023130"+number+"@student.uts.edu.au")
            .then((res) => {
                const body = res.body;
                console.log(body);
                expect(body).to.contain.property('success');
                expect(body).to.contain.property('message');
                done();
            }).catch((err) => done(err));
    });

    /** login test */
    it('login', (done) => {
        request(app).post('/user/login')
            .type('form')
            .send('username=startTest1&password=1234567')
            .then((res) => {
                const body = res.body;
                expect(body).to.contain.property('token');
                done();
            }).catch((err) => done(err));
    });

    /** find all users */
    it('find all users', (done) => {
        request(app).get('/user/')
            .then((res) => {
                const body = res.body;
                expect(body).to.contain.property('success');
                expect(body).to.contain.property('users');
                done();
            });
    });

});
