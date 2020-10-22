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
  suite('GET /api/stock-prices => stockData object', () => {
    test('1 stock', (done) => {
      chai
        .request(server)
        .get('/api/stock-prices')
        .query({ stock: 'goog' })
        .end((err, res) => {
          //complete this one too

          done();
        });
    });

    test('1 stock with like', (done) => {});

    test('1 stock with like again (ensure likes arent double counted)', (done) => {});

    test('2 stocks', (done) => {});

    test('2 stocks with like', (done) => {});
  });
});
