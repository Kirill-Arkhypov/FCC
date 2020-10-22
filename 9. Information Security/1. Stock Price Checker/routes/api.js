/*
 *
 *
 *       Complete the API routing below
 *
 *
 */

'use strict';

const expect = require('chai').expect;
const MongoClient = require('mongodb');

require('dotenv').config();

const CONNECTION_STRING = process.env.DB; //MongoClient.connect(CONNECTION_STRING, function(err, db) {});

module.exports = (app) => {
  app.route('/api/stock-prices').get((req, res) => {});
};
