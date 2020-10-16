/*
 *
 *
 *       FILL IN EACH FUNCTIONAL TEST BELOW COMPLETELY
 *       -----[Keep the tests in the same order!]-----
 *
 */

const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

let id;

suite('Functional Tests', function () {
  suite('Routing tests', function () {
    suite(
      'POST /api/books with title => create book object/expect book object',
      function () {
        test('Test POST /api/books with title', (done) => {
          chai
            .request(server)
            .post('/api/books')
            .send({
              title: 'Test Book',
            })
            .end((err, res) => {
              assert.equal(res.status, 200);
              assert.equal(res.body.title, 'Test Book');

              id = res.body._id;

              done();
            });
        });

        test('Test POST /api/books with no title given', (done) => {
          chai
            .request(server)
            .post('/api/books')
            .send({})
            .end((err, res) => {
              assert.equal(res.body, 'title required');

              done();
            });
        });
      }
    );

    suite('GET /api/books => array of books', function () {
      test('Test GET /api/books', (done) => {
        chai
          .request(server)
          .get('/api/books')
          .end((err, res) => {
            assert.equal(res.status, 200);
            assert.isArray(res.body, 'response should be an array');
            assert.property(
              res.body[0],
              'commentcount',
              'Books in array should contain commentcount'
            );
            assert.property(
              res.body[0],
              'title',
              'Books in array should contain title'
            );
            assert.property(
              res.body[0],
              '_id',
              'Books in array should contain _id'
            );

            done();
          });
      });
    });

    suite('GET /api/books/[id] => book object with [id]', function () {
      test('Test GET /api/books/[id] with id not in db', function (done) {
        chai
          .request(server)
          .get('/api/books/' + 'someid')
          .end((err, res) => {
            assert.equal(res.body, 'no book exists');
            done();
          });
      });

      test('Test GET /api/books/[id] with valid id in db', function (done) {
        chai
          .request(server)
          .get('/api/books/' + id)
          .end(function (err, res) {
            assert.equal(res.status, 200);
            assert.equal(res.body._id, id);
            assert.equal(res.body.title, 'Test Book');
            done();
          });
      });
    });

    suite(
      'POST /api/books/[id] => add comment/expect book object with id',
      function () {
        test('Test POST /api/books/[id] with comment', (done) => {
          chai
            .request(server)
            .post('/api/books/' + id)
            .send({
              comment: 'test comment',
            })
            .end((err, res) => {
              assert.equal(res.body._id, id);
              assert.isTrue(res.body.comments.includes('test comment'));

              done();
            });
        });
      }
    );
  });
});
