process.env.NODE_ENV === "test";

const expect = require('chai').expect;
const request = require('supertest');


const app = require('../../../app');
const db = require('../../../models/db');

describe("test post module", () => {
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

    /** create a new post test after login */
    it('create a new post', (done) => {
        const number = Math.ceil(Math.random() * 100000000);
        request(app).post('/user/register')
            .type('form')
            .send("username=startTest" + number + "&password=1234567&email=13023130" + number + "@student.uts.edu.au")
            .then((res) => {
                const body = res.body;
                return new Promise((resolve, reject) => {
                    resolve(body);
                })
            }).then((body) => {
            request(app).post('/user/login')
                .type('form')
                .send('username=startTest' + number + '&password=1234567')
                .then((res) => {
                    const body = res.body;
                    const token = res.body.token;
                    return new Promise((resolve, reject) => {
                        resolve(token);

                    })
                })
                .then((token) => {
                    // console.log(token);
                    request(app)
                        .post('/post')
                        .send({
                            title: "Python",
                            image_url: ["www.asdsadsdas.com", "sadsdasnas.com"],
                            topic: ["5d650becc71fee182087c737", "5d650becc71fee182087c738"],
                            type: "image"
                        })
                        .set("Authorization", token)
                        .set('Accept', 'application/json')
                        .then((res) => {
                            const body = res.body;
                            expect(body).to.contain.property('image_url');
                            done();
                        })
                }).catch((err) => done(err));
        })

    });

    /** get all posts */
    it('get all posts', (done) => {
        request(app).get('/post')
            .then((res) => {
                const body = res.body;
                expect(body).to.contain.property('posts');
                done();
            }).catch((err) => done(err));
    });

    it('get trend posts', (done) => {
        request(app).get("/post/threads/posts")
            .then((res) => {
                const body = res.body;
                expect(body).to.an.instanceof(Array);
                done();
            }).catch((err) => done(err));
    });

});
