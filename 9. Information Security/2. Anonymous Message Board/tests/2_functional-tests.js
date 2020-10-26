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

let threadId;
let repliedId;

suite('Functional Tests', () => {
  suite('API ROUTING FOR /api/threads/:board', () => {
    suite('POST', () => {
      test('Create a New Thread', (done) => {
        chai
          .request(server)
          .post('/api/threads/functional-tests')
          .send({
            board: 'functional-tests',
            text: 'test thread',
            delete_password: 'pass',
          })
          .end((err, res) => {
            assert.equal(res.status, 200);
            done();
          });
      });

      test('Check the Newly Created Thread', (done) => {
        chai
          .request(server)
          .get('/api/threads/functional-tests')
          .end((err, res) => {
            threadId = res.body[0]._id;

            const testThread = res.body[0];
            assert.equal(res.status, 200);
            assert.isArray(res.body);
            assert.isAtMost(res.body.length, 10);
            assert.equal(testThread.board, 'functional-tests');
            assert.equal(testThread.text, 'test thread');
            assert.isOk(testThread.created_on);
            assert.isOk(testThread.bumped_on);
            assert.isNotOk(testThread.reported);
            assert.isNotOk(testThread.delete_password);
            assert.isArray(testThread.replies);
            assert.isAtMost(testThread.replies.length, 3);
            assert.isNumber(testThread.replycount);
            assert.equal(testThread.replycount, testThread.replies.length);
            done();
          });
      });
    });

    suite('GET', () => {
      test('GET an array of the most recent 10 bumped threads', (done) => {
        chai
          .request(server)
          .get('/api/threads/functional-tests')
          .end((err, res) => {
            const testThread = res.body[0];
            assert.equal(res.status, 200);
            assert.isArray(res.body);
            assert.isAtMost(res.body.length, 10);
            assert.equal(testThread.board, 'functional-tests');
            assert.equal(testThread.text, 'test thread');
            assert.isOk(testThread.created_on);
            assert.isOk(testThread.bumped_on);
            assert.isNotOk(testThread.reported);
            assert.isNotOk(testThread.delete_password);
            assert.isArray(testThread.replies);
            assert.isAtMost(testThread.replies.length, 3);
            assert.isNumber(testThread.replycount);
            assert.equal(testThread.replycount, testThread.replies.length);
            done();
          });
      });
    });

    suite('PUT', () => {
      test('Report a Thread', (done) => {
        chai
          .request(server)
          .put('/api/threads/functional-tests')
          .send({
            thread_id: threadId,
            board: 'functional-tests',
          })
          .end((err, res) => {
            assert.equal(res.body, 'success');
            done();
          });
      });
    });

    suite('DELETE', () => {
      test('Delete a Thread', (done) => {
        chai
          .request(server)
          .delete('/api/threads/functional-tests')
          .send({
            thread_id: threadId,
            board: 'functional-tests',
            delete_password: 'pass',
          })
          .end((err, res) => {
            assert.equal(res.body, 'success');
            done();
          });
      });
    });
  });

  suite('API ROUTING FOR /api/replies/:board', () => {
    suite('POST', () => {
      test('Create a New Thread', (done) => {
        chai
          .request(server)
          .post('/api/threads/functional-tests')
          .send({
            board: 'functional-tests',
            text: 'test thread',
            delete_password: 'pass',
          })
          .end((err, res) => {
            assert.equal(res.status, 200);
            done();
          });
      });

      test('Check the Newly Created Thread', (done) => {
        chai
          .request(server)
          .get('/api/threads/functional-tests')
          .end((err, res) => {
            threadId = res.body[0]._id;

            const testThread = res.body[0];
            assert.equal(res.status, 200);
            assert.isArray(res.body);
            assert.isAtMost(res.body.length, 10);
            assert.equal(testThread.board, 'functional-tests');
            assert.equal(testThread.text, 'test thread');
            assert.isOk(testThread.created_on);
            assert.isOk(testThread.bumped_on);
            assert.isNotOk(testThread.reported);
            assert.isNotOk(testThread.delete_password);
            assert.isArray(testThread.replies);
            assert.isAtMost(testThread.replies.length, 3);
            assert.isNumber(testThread.replycount);
            assert.equal(testThread.replycount, testThread.replies.length);
            done();
          });
      });

      test('Post a Reply to a Thread', (done) => {
        chai
          .request(server)
          .post('/api/replies/functional-tests')
          .send({
            thread_id: threadId,
            board: 'functional-tests',
            text: 'test reply',
            delete_password: 'pass',
          })
          .end((err, res) => {
            assert.equal(res.status, 200);
            done();
          });
      });

      test('Check the Newly Created Reply', (done) => {
        chai
          .request(server)
          .get('/api/threads/functional-tests')
          .end((err, res) => {
            const reply = res.body[0].replies[0];
            replyId = reply._id;

            assert.equal(res.status, 200);
            assert.isOk(reply._id);
            assert.equal(reply.text, 'test reply');
            assert.isOk(reply.created_on);
            assert.isNotOk(reply.reported);
            assert.isNotOk(reply.delete_password);
            done();
          });
      });
    });

    suite('GET', () => {
      test('GET an Entire Thread With All Its Replies', (done) => {
        chai
          .request(server)
          .get('/api/replies/functional-tests')
          .query({ thread_id: threadId })
          .send()
          .end((err, res) => {
            const testThread = res.body;

            assert.equal(res.status, 200);
            assert.isObject(res.body);
            assert.equal(testThread.board, 'functional-tests');
            assert.equal(testThread.text, 'test thread');
            assert.isOk(testThread.created_on);
            assert.isOk(testThread.bumped_on);
            assert.isNotOk(testThread.reported);
            assert.isNotOk(testThread.delete_password);
            assert.isArray(testThread.replies);

            const reply = res.body.replies[0];

            assert.isOk(reply._id);
            assert.equal(reply.text, 'test reply');
            assert.isOk(reply.created_on);
            assert.isNotOk(reply.reported);
            assert.isNotOk(reply.delete_password);
            done();
          });
      });
    });

    suite('PUT', () => {
      test('Report a Reply on a Thread', (done) => {
        chai
          .request(server)
          .put('/api/replies/functional-tests')
          .send({
            thread_id: threadId,
            board: 'functional-tests',
            reply_id: replyId,
          })
          .end((err, res) => {
            assert.equal(res.body, 'success');
            done();
          });
      });
    });

    suite('DELETE', () => {
      test('Delete a Reply on a Thread', (done) => {
        chai
          .request(server)
          .delete('/api/replies/functional-tests')
          .send({
            thread_id: threadId,
            board: 'functional-tests',
            reply_id: replyId,
            delete_password: 'pass',
          })
          .end((err, res) => {
            assert.equal(res.body, 'success');
            done();
          });
      });

      test('Check Deleted Reply', (done) => {
        chai
          .request(server)
          .get('/api/replies/functional-tests')
          .query({ thread_id: threadId })
          .end((err, res) => {
            const reply = res.body.replies[0];

            assert.equal(res.status, 200);
            assert.isOk(reply._id);
            assert.equal(reply.text, '[deleted]');
            assert.isOk(reply.created_on);
            assert.isNotOk(reply.reported);
            assert.isNotOk(reply.delete_password);
            done();
          });
      });

      test('Delete a Test Thread', (done) => {
        chai
          .request(server)
          .delete('/api/threads/functional-tests')
          .send({
            thread_id: threadId,
            board: 'functional-tests',
            delete_password: 'pass',
          })
          .end((err, res) => {
            assert.equal(res.body, 'success');
            done();
          });
      });
    });
  });
});
