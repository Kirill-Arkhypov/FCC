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

require('dotenv').config();

mongoose.connect(process.env.DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  comments: [String],
});
const Book = mongoose.model('Book', bookSchema);

module.exports = function (app) {
  app
    .route('/api/books')
    .get((req, res) => {
      Book.find({}, (err, books) => {
        if (err) {
          throw new Error(err);
        }
        return res.json(
          books.map((book) => {
            return {
              _id: book._id,
              title: book.title,
              commentcount: book.comments.length,
            };
          })
        );
      });
    })

    .post((req, res) => {
      const title = req.body.title;
      if (!title) {
        return res.json('title required');
      }
      const newBook = new Book({ title });
      newBook.save((err, book) => {
        if (err) {
          throw new Error(err);
        }
        res.json({ _id: book._id, title: book.title });
      });
    })

    .delete((req, res) => {
      Book.deleteMany({}, (err, issue) => {
        if (err) {
          throw new Error(err);
        }
        return res.json('complete delete successful');
      });
    });

  app
    .route('/api/books/:id')
    .get((req, res) => {
      Book.findById(req.params.id, (err, book) => {
        if (!book) {
          return res.json('no book exists');
        }
        if (err) {
          throw new Error(err);
        }
        return res.json({
          _id: book._id,
          title: book.title,
          comments: book.comments,
        });
      });
    })

    .post((req, res) => {
      const bookid = req.params.id;
      const comment = req.body.comment;
      Book.findByIdAndUpdate(
        bookid,
        { $push: { comments: comment } },
        { new: true },
        (err, book) => {
          if (err) {
            throw new Error(err);
          }
          if (!book) {
            return res.json('no book exists');
          }
          return res.json({
            _id: book._id,
            title: book.title,
            comments: book.comments,
          });
        }
      );
    })

    .delete((req, res) => {
      const bookid = req.params.id;
      Book.findByIdAndRemove(bookid, (err, book) => {
        if (err) {
          throw new Error(err);
        }
        if (!book) {
          return res.json('no book exists');
        }
        return res.json('delete successful');
      });
    });
};
