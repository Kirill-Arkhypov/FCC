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

suite('Functional Tests', () => {
  suite('Routing Tests', () => {
    suite('GET /api/convert => conversion object', () => {
      test('Convert 10L (valid input)', (done) => {
        chai
          .request(server)
          .get('/api/convert')
          .query({ input: '10L' })
          .end((err, res) => {
            assert.equal(res.status, 200);
            assert.equal(res.body.initNum, 10);
            assert.equal(res.body.initUnit, 'L');
            assert.approximately(res.body.returnNum, 2.64172, 0.1);
            assert.equal(res.body.returnUnit, 'gal');
            done();
          });
      });

      test('Convert 32g (invalid input unit)', function (done) {
        //done();
      });

      test('Convert 3/7.2/4kg (invalid number)', function (done) {
        //done();
      });

      test('Convert 3/7.2/4kilomegagram (invalid number and unit)', function (done) {
        //done();
      });

      test('Convert kg (no number)', function (done) {
        //done();
      });
    });
  });
});
