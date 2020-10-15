/*
 *
 *
 *       FILL IN EACH FUNCTIONAL TEST BELOW COMPLETELY
 *       -----[Keep the tests in the same order!]-----
 *       (if additional are added, keep them at the very end!)
 */

const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

let id;

suite('Functional Tests', function () {
  suite('POST /api/issues/{project} => object with issue data', function () {
    test('Every field filled in', (done) => {
      chai
        .request(server)
        .post('/api/issues/test')
        .send({
          issue_title: 'Title',
          issue_text: 'text',
          created_by: 'Functional Test - Every field filled in',
          assigned_to: 'Chai and Mocha',
          status_text: 'In QA',
        })
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.equal(res.body.open, true);
          assert.equal(res.body.issue_title, 'Title');
          assert.equal(res.body.issue_text, 'text');
          assert.equal(
            res.body.created_by,
            'Functional Test - Every field filled in'
          );
          assert.equal(res.body.assigned_to, 'Chai and Mocha');
          assert.equal(res.body.status_text, 'In QA');
          assert.equal(res.body.project, 'test');
          id = res.body._id;

          done();
        });
    });

    test('Required fields filled in', (done) => {
      chai
        .request(server)
        .post('/api/issues/test')
        .send({
          issue_title: 'Title 2',
          issue_text: 'text',
          created_by: 'Functional Test - Required fields filled in',
        })
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.equal(res.body.open, true);
          assert.equal(res.body.issue_title, 'Title 2');
          assert.equal(res.body.issue_text, 'text');
          assert.equal(
            res.body.created_by,
            'Functional Test - Required fields filled in'
          );
          assert.equal(res.body.assigned_to, '');
          assert.equal(res.body.status_text, '');
          assert.equal(res.body.project, 'test');
          id = res.body._id;

          done();
        });
    });

    test('Missing required fields', (done) => {
      chai
        .request(server)
        .post('/api/issues/test')
        .send({
          issue_title: 'Title',
        })
        .end((err, res) => {
          assert.equal(res.body, 'Required fields missing from request');
          done();
        });
    });
  });

  suite('PUT /api/issues/{project} => text', function () {
    test('No body', (done) => {
      chai
        .request(server)
        .put('/api/issues/test')
        .send({})
        .end((err, res) => {
          assert.equal(res.body, 'no updated field sent');
          done();
        });
    });

    test('One field to update', (done) => {
      chai
        .request(server)
        .put('/api/issues/test')
        .send({
          _id: id,
          issue_text: 'new text',
        })
        .end((err, res) => {
          assert.equal(res.body, 'successfully updated');
          done();
        });
    });

    test('Multiple fields to update', (done) => {
      chai
        .request(server)
        .put('/api/issues/test')
        .send({
          _id: id,
          issue_title: 'new title',
          issue_text: 'new text',
        })
        .end((err, res) => {
          assert.equal(res.body, 'successfully updated');
          done();
        });
    });
  });

  suite(
    'GET /api/issues/{project} => Array of objects with issue data',
    function () {
      test('No filter', (done) => {
        chai
          .request(server)
          .get('/api/issues/test')
          .query({})
          .end((err, res) => {
            assert.equal(res.status, 200);
            assert.isArray(res.body);
            assert.property(res.body[0], 'issue_title');
            assert.property(res.body[0], 'issue_text');
            assert.property(res.body[0], 'created_on');
            assert.property(res.body[0], 'updated_on');
            assert.property(res.body[0], 'created_by');
            assert.property(res.body[0], 'assigned_to');
            assert.property(res.body[0], 'open');
            assert.property(res.body[0], 'status_text');
            assert.property(res.body[0], '_id');
            done();
          });
      });

      test('One filter', (done) => {
        chai
          .request(server)
          .get('/api/issues/test')
          .query({ created_by: 'Functional Test - One filter' })
          .end((err, res) => {
            res.body.forEach((issue) => {
              assert.equal(issue.created_by, 'Functional Test - One filter');
            });
            done();
          });
      });

      test('Multiple filters (test for multiple fields you know will be in the db for a return)', (done) => {
        chai
          .request(server)
          .get('/api/issues/test')
          .query({
            open: true,
            created_by: 'Functional Test - Multiple filters ',
          })
          .end((err, res) => {
            res.body.forEach((issue) => {
              assert.equal(issue.open, true);
              assert.equal(
                issue.created_by,
                'Functional Test - Multiple filters '
              );
            });
            done();
          });
      });
    }
  );

  suite('DELETE /api/issues/{project} => text', function () {
    test('No _id', (done) => {
      chai
        .request(server)
        .delete('/api/issues/test')
        .send({})
        .end((err, res) => {
          assert.equal(res.body, 'id error');
          done();
        });
    });

    test('Valid _id', (done) => {
      chai
        .request(server)
        .delete('/api/issues/test')
        .send({
          _id: id,
        })
        .end((err, res) => {
          assert.equal(res.body, 'deleted ' + id);
          done();
        });
    });
  });
});
