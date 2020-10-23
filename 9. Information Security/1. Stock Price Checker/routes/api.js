/*
 *
 *
 *       Complete the API routing below
 *
 *
 */

'use strict';

const expect = require('chai').expect;
const mongodb = require('mongodb');
const mongoose = require('mongoose');
const fetch = require('node-fetch');

require('dotenv').config();

const fetchStock = async (stock) =>
  await fetch(
    `https://stock-price-checker-proxy--freecodecamp.repl.co/v1/stock/${stock}/quote`
  ).then((res) => res.json());

module.exports = (app) => {
  mongoose.connect(process.env.DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  });

  const stockSchema = new mongoose.Schema({
    stock: { type: String, required: true },
    price: String,
    likes: { type: Number, default: 0 },
    ips: [String],
  });
  const Stock = mongoose.model('Stock', stockSchema);

  const checkLikes = async (fetchResult, like, req) => {
    const result = await Stock.findOne({ stock: fetchResult.symbol });

    if (like && result.likes !== 0 && result.ips.includes(req.ip)) {
      return { Error: 'Only 1 like per ip accepted!' };
    }
  };

  const getStock = (fetchResult, like, req) => {
    return Stock.findOneAndUpdate(
      { stock: fetchResult.symbol },
      {
        stock: fetchResult.symbol,
        price: fetchResult.latestPrice.toString(),
        $inc: { likes: like ? 1 : 0 },
        $addToSet: { ips: req.ip },
      },
      { new: true, upsert: true }
    );
  };

  app.route('/api/stock-prices').get(async (req, res) => {
    const { stock, like } = req.query;

    if (typeof stock === 'string') {
      const fetchResult = await fetchStock(stock);

      const checkLike = await checkLikes(fetchResult, like, req);
      if (checkLike) {
        return res.json(checkLike);
      }

      const result = await getStock(fetchResult, like, req);
      return res.json({
        stockData: {
          stock: result.stock,
          price: result.price,
          likes: result.likes,
        },
      });
    } else {
      Promise.all([
        await fetchStock(stock[0]),
        await fetchStock(stock[1]),
      ]).then(async (result) => {
        const checkLike1 = await checkLikes(result[0], like, req);
        if (checkLike1) {
          return res.json(checkLike1);
        }
        const checkLike2 = await checkLikes(result[1], like, req);
        if (checkLike2) {
          return res.json(checkLike2);
        }

        const stock1 = await getStock(result[0], like, req);
        const stock2 = await getStock(result[1], like, req);

        res.json({
          stockData: [
            {
              stock: stock1.stock,
              price: stock1.price,
              rel_likes: stock1.likes - stock2.likes,
            },
            {
              stock: stock2.stock,
              price: stock2.price,
              rel_likes: stock2.likes - stock1.likes,
            },
          ],
        });
      });
    }
  });
};
