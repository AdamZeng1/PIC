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

    /** create a second comment test after login */
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
            }).then(() => {
            request(app).post('/user/login')
                .type('form')
                .send('username=startTest'+number+'&password=1234567')
                .then((res) => {
                    const body = res.body;
                    const token = res.body.token;
                    return new Promise((resolve, reject) => {
                        resolve(token);
                    })
                })
                .then((token) => {
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
                            const postId = res.body._id;
                            return new Promise((resolve, reject) => {
                                resolve(postId);
                            })
                        })
                        .then((postId) => {
                            request(app)
                                .post('/posts/' + postId + '/comments/')
                                .set("Authorization", token)
                                .set('Accept', 'application/json')
                                .send({
                                    image_url: ["www.123sd.com", "www.greatdfd.com"],
                                    type: "image"
                                }).then((res) => {
                                const body = res.body;
                                const commentId = res.body._id;
                                return new Promise((resolve, reject) => {
                                    resolve(commentId);
                                })
                            }).then((commentId) => {
                                request(app)
                                    .post('/posts/' + postId + '/comments/' + commentId + '/comments')
                                    .set("Authorization", token)
                                    .set('Accept', 'application/json')
                                    .send({
                                        image_url: ["www.123sd.com", "www.greatdfd.com"],
                                        type: "image"
                                    }).then((res) => {
                                    const body = res.body;
                                    console.log(body);
                                    expect(body).to.contain.property('_id');
                                    done();
                                })
                            })
                        })
                }).catch((err) => done(err));
        });
    });
});






