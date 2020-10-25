/*
 *
 *
 *       Complete the API routing below
 *
 *
 */

'use strict';

const expect = require('chai').expect;
const e = require('express');
const mongodb = require('mongodb');
const mongoose = require('mongoose');

require('dotenv').config();

const now = () => new Date().toUTCString();

module.exports = function (app) {
  mongoose.connect(process.env.DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  });

  const replySchema = new mongoose.Schema({
    text: { type: String, required: true },
    created_on: {
      type: Date,
      required: true,
      default: now(),
    },
    reported: { type: Boolean, required: true, default: false },
    delete_password: { type: String, required: true },
  });

  const threadSchema = new mongoose.Schema({
    board: { type: String, required: true },
    text: { type: String, required: true },
    created_on: {
      type: Date,
      required: true,
      default: now(),
    },
    bumped_on: { type: Date, required: true, default: now() },
    reported: { type: Boolean, required: true, default: false },
    delete_password: { type: String, required: true },
    replies: [replySchema],
  });

  const Reply = mongoose.model('Reply', replySchema);
  const Thread = mongoose.model('Thread', threadSchema);

  app
    .route('/api/threads/:board')
    .post((req, res) => {
      const newThread = new Thread(req.body);
      if (!req.body.board) {
        newThread.board = req.params.board;
      }
      newThread.save((err, thread) => {
        if (err) {
          throw new Error(err);
        }
        return res.redirect(`/b/${thread.board}`);
      });
    })
    .get((req, res) => {
      Thread.find({ board: req.params.board }, (err, threads) => {
        if (err) {
          throw new Error(err);
        }
        const r = threads.map((thread) => ({
          ...thread._doc,
          replycount: thread._doc.replies.length,
        }));
        return res.json(r);
      });
    })
    .put((req, res) => {
      Thread.findOneAndUpdate(
        { _id: req.body.thread_id, board: req.body.board },
        { bumped_on: now(), reported: true },
        (err, thread) => {
          if (!mongoose.Types.ObjectId.isValid(req.body.thread_id)) {
            return res.json('invalid id');
          }

          if (err) {
            throw new Error(err);
          }

          if (!thread) {
            return res.json('thread not found');
          }

          return res.json('success');
        }
      );
    })
    .delete((req, res) => {
      Thread.findOne(
        { _id: req.body.thread_id, board: req.body.board },
        async (err, thread) => {
          if (!mongoose.Types.ObjectId.isValid(req.body.thread_id)) {
            return res.json('invalid id');
          }

          if (err) {
            throw new Error(err);
          }

          if (!thread) {
            return res.json('thread not found');
          }

          if (thread.delete_password === req.body.delete_password) {
            await Thread.findByIdAndRemove(req.body.thread_id);
            return res.json('success');
          }

          return res.json('incorrect password');
        }
      );
    });

  app.route('/api/replies/:board');
};
