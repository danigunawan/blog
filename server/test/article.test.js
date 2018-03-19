const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
const app = require('../app.js'); 

chai.use(chaiHttp); 

var idArticle;
describe('Crud Article', () => { 
  describe('Read Article',() => {
    it('Should Display All Article', function(done) {
      expect('hello').to.be.a('string');
      chai.request(app)
        .get('/api/articles')
        .end(function(err, res) {
           expect(res).to.have.status(200);
           expect(res).to.be.json;
           expect(res.body).to.have.property('message');
           expect(res.body.message).to.equal('Success Read Articles');
           expect(res.body).to.have.property('data');
           expect(res.body.data).to.be.a('array');
           done();
        })
    })
  })
  describe('Create Article',() => {
    it("Can't Create New Article if has no token", function(done) {
      chai.request(app)
        .post('/api/articles')
        .send({ title: 'Judul', text: 'hahaha' })
        .end(function(err, res) {
           expect(res).to.have.status(403);
           expect(res).to.be.json;
           expect(res.body).to.have.property('message');
           expect(res.body.message).to.equal('Invalid Token');
           done();
        })
    })
    it('Should Create New Article', function(done) {
      chai.request(app)
        .post('/api/articles')
        .set('token','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YWFmODNjMWVmYmYxNzBlZWI0MGZjYjQiLCJpYXQiOjE1MjE0NTI2MjV9.p-kqrhelx_C2XErJUXWTEcdxES1HCFUN6oSgV21bLdc')
        .send({ title: 'Judul', text: 'hahaha' })
        .end(function(err, res) {
           expect(res).to.have.status(200);
           expect(res).to.be.json;
           expect(res.body).to.have.property('message');
           expect(res.body.message).to.equal('Success Create New Article');
           expect(res.body.data.title).to.equal('Judul');
           expect(res.body.data.text).to.equal('hahaha');
           expect(res.body).to.have.property('data');
           idArticle = res.body.data._id;
           done();
        })
    })
  })

  describe('Get Specifif Article',() => {
    it('Should get specific Article', function(done) {
      chai.request(app)
        .get(`/api/articles/${idArticle}`)
        .end(function(err, res) {
           expect(res).to.have.status(200);
           expect(res).to.be.json;
           expect(res.body).to.have.property('message');
           expect(res.body.message).to.equal('Success Read an Article');
           expect(res.body.data.title).to.equal('Judul');
           expect(res.body.data.text).to.equal('hahaha');
           expect(res.body).to.have.property('data');
           done();
        })
    })
  })
  describe('Update Article',function() {
    it("Shouldn't Update an Article if has no token", function(done) {
      chai.request(app)
        .put(`/api/articles/${idArticle}`)
        .send({ title: 'Judul Baru', text: 'hehehe' })
        .end(function(err, res) {
           expect(res).to.have.status(403);
           expect(res).to.be.json;
           expect(res.body).to.have.property('message');
           expect(res.body.message).to.equal('Invalid Token');
           done();
        })
    })
    it('Should Update an Article', function(done) {
      chai.request(app)
        .put(`/api/articles/${idArticle}`)
        .set('token','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YWFmODNjMWVmYmYxNzBlZWI0MGZjYjQiLCJpYXQiOjE1MjE0NTI2MjV9.p-kqrhelx_C2XErJUXWTEcdxES1HCFUN6oSgV21bLdc')
        .send({ title: 'Judul Baru', text: 'hehehe' })
        .end(function(err, res) {
           expect(res).to.have.status(200);
           expect(res).to.be.json;
           expect(res.body).to.have.property('message');
           expect(res.body.message).to.equal('Success Update Articles');
           expect(res.body).to.have.property('data');
           expect(res.body.data.title).to.equal('Judul Baru');
           expect(res.body.data.text).to.equal('hehehe');
           done();
        })
    })
  })
  describe('Delete Article',function() {
    it("Shouldn't Delete an Article if has no token", function(done) {
      chai.request(app)
        .del(`/api/articles/${idArticle}`)
        .end(function(err, res) {
           expect(res).to.have.status(403);
           expect(res).to.be.json;
           expect(res.body).to.have.property('message');
           expect(res.body.message).to.equal('Invalid Token');
           done();
        })
    })
    it('Should Delete an Article', function(done) {
      chai.request(app)
        .del(`/api/articles/${idArticle}`)
        .set('token','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YWFmODNjMWVmYmYxNzBlZWI0MGZjYjQiLCJpYXQiOjE1MjE0NTI2MjV9.p-kqrhelx_C2XErJUXWTEcdxES1HCFUN6oSgV21bLdc')
        .end(function(err, res) {
           expect(res).to.have.status(200);
           expect(res).to.be.json;
           expect(res.body).to.have.property('message');
           expect(res.body.message).to.equal('Success Delete Articles');
           expect(res.body).to.have.property('data');
           expect(res.body.data.title).to.equal('Judul Baru');
           expect(res.body.data.text).to.equal('hehehe');
           done();
        })
    })
  })
})

