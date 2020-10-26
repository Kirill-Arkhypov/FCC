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

const now = () => new Date().toUTCString();

const threadValidator = (threadId, err, thread, res, replyId) => {
  if (!mongoose.Types.ObjectId.isValid(threadId)) {
    return res.json('invalid thread id');
  }

  if (replyId) {
    if (!mongoose.Types.ObjectId.isValid(replyId)) {
      return res.json('invalid reply id');
    }
  }

  if (err) {
    throw new Error(err);
  }

  if (!thread) {
    return res.json('thread not found');
  }
};

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
      Thread.find({ board: req.params.board })
        .sort({ bumped_on: 'desc' })
        .limit(10)
        .select('-delete_password -reported')
        .lean()
        .exec((err, threads) => {
          if (err) {
            throw new Error(err);
          }
          const result = threads.map((thread) => ({
            ...thread,
            replies: thread.replies
              .sort((a, b) => b.created_on - a.created_on)
              .slice(0, 3),
            replycount: thread.replies.length,
          }));
          return res.json(result);
        });
    })
    .put((req, res) => {
      Thread.findOneAndUpdate(
        { _id: req.body.thread_id, board: req.body.board || req.params.board },
        { reported: true },
        (err, thread) => {
          if (threadValidator(req.body.thread_id, err, thread, res)) {
            return;
          }

          return res.json('success');
        }
      );
    })
    .delete((req, res) => {
      Thread.findOne(
        { _id: req.body.thread_id, board: req.body.board || req.params.board },
        async (err, thread) => {
          if (threadValidator(req.body.thread_id, err, thread, res)) {
            return;
          }

          if (thread.delete_password === req.body.delete_password) {
            await Thread.findByIdAndRemove(req.body.thread_id);
            return res.json('success');
          }

          return res.json('incorrect password');
        }
      );
    });

  app
    .route('/api/replies/:board')
    .post((req, res) => {
      const newReply = new Reply(req.body);
      newReply.created_on = now();
      Thread.findOneAndUpdate(
        {
          _id: req.body.thread_id || req.query.thread_id,
          board: req.body.board || req.params.board,
        },
        { $push: { replies: newReply }, bumped_on: now() },
        { new: true },
        (err, thread) => {
          if (threadValidator(req.body.thread_id, err, thread, res)) {
            return;
          }
          return res.redirect(`/b/${thread.board}/${thread._id}`);
        }
      );
    })
    .get((req, res) => {
      Thread.findOne({
        _id: req.body.thread_id || req.query.thread_id,
        board: req.body.board || req.params.board,
      })
        .select('-delete_password -reported')
        .lean()
        .exec((err, thread) => {
          if (err) {
            throw new Error(err);
          }
          const result = {
            ...thread,
            replies: thread.replies
              .map((e) => {
                return { created_on: e.created_on, _id: e._id, text: e.text };
              })
              .sort((a, b) => b.created_on - a.created_on),
          };
          return res.json(result);
        });
    })
    .put((req, res) => {
      Thread.findOne(
        { _id: req.body.thread_id, board: req.body.board || req.params.board },
        async (err, thread) => {
          if (
            threadValidator(
              req.body.thread_id,
              err,
              thread,
              res,
              req.body.reply_id
            )
          ) {
            return;
          }

          const reply = thread.replies.find(
            (e) => e._id.toString() === req.body.reply_id
          );

          if (!reply) {
            return res.json('reply not found');
          }

          reply.reported = true;

          await thread.save();
          return res.json('success');
        }
      );
    })
    .delete((req, res) => {
      Thread.findOne(
        { _id: req.body.thread_id, board: req.body.board || req.params.board },
        async (err, thread) => {
          if (
            threadValidator(
              req.body.thread_id,
              err,
              thread,
              res,
              req.body.reply_id
            )
          ) {
            return;
          }

          const reply = thread.replies.find(
            (e) => e._id.toString() === req.body.reply_id
          );

          if (!reply) {
            return res.json('reply not found');
          }

          if (reply.delete_password === req.body.delete_password) {
            thread.bumped_on = now();
            reply.text = '[deleted]';

            await thread.save();
            return res.json('success');
          }

          return res.json('incorrect password');
        }
      );
    });
};
