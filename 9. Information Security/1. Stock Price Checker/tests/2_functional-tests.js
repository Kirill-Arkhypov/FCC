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
          assert.equal(res.body.stockData.stock, 'GOOG');
          assert.isNotNull(res.body.stockData.price);
          assert.equal(res.body.stockData.likes, 0);
          done();
        });
    });

    test('1 stock with like', (done) => {
      chai
        .request(server)
        .get('/api/stock-prices')
        .query({ stock: 'goog', like: true })
        .end((err, res) => {
          assert.equal(res.body.stockData.stock, 'GOOG');
          assert.isNotNull(res.body.stockData.price);
          assert.equal(res.body.stockData.likes, 1);
          done();
        });
    });

    test('1 stock with like again (ensure likes arent double counted)', (done) => {
      chai
        .request(server)
        .get('/api/stock-prices')
        .query({ stock: 'goog', like: true })
        .end((err, res) => {
          assert.equal(res.body.Error, 'Only 1 like per ip accepted!');
          done();
        });
    });

    test('2 stocks', (done) => {
      chai
        .request(server)
        .get('/api/stock-prices')
        .query({ stock: ['msft', 'aapl'] })
        .end((err, res) => {
          const stockData = res.body.stockData;
          assert.isArray(stockData);
          assert.equal(stockData[0].stock, 'MSFT');
          assert.isNotNull(stockData[0].price);
          assert.equal(stockData[0].rel_likes, 0);
          assert.equal(stockData[1].stock, 'AAPL');
          assert.isNotNull(stockData[1].price);
          assert.equal(stockData[1].rel_likes, 0);
          done();
        });
    });

    test('2 stocks', (done) => {
      chai
        .request(server)
        .get('/api/stock-prices')
        .query({ stock: ['msft', 'aapl'], like: true })
        .end((err, res) => {
          const stockData = res.body.stockData;
          assert.isArray(stockData);
          assert.equal(stockData[0].stock, 'MSFT');
          assert.isNotNull(stockData[0].price);
          assert.equal(stockData[0].rel_likes, 0);
          assert.equal(stockData[1].stock, 'AAPL');
          assert.isNotNull(stockData[1].price);
          assert.equal(stockData[1].rel_likes, 0);
          done();
        });
    });
  });
});
