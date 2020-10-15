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

const today = () => new Date().toUTCString();

const issueSchema = new mongoose.Schema({
  issue_title: { type: String, required: true },
  issue_text: { type: String, required: true },
  created_by: { type: String, required: true },
  assigned_to: String,
  status_text: String,
  project: String,
  open: { type: Boolean, required: true, default: true },
  created_on: { type: Date, required: true, default: today() },
  updated_on: { type: Date, required: true, default: today() },
});
const Issue = mongoose.model('Issue', issueSchema);

module.exports = function (app) {
  app
    .route('/api/issues/:project')

    .get((req, res) => {
      Issue.find(
        { ...req.query, project: req.params.project },
        (err, issues) => {
          if (err) {
            throw new Error(err);
          }
          return res.json(issues);
        }
      );
    })

    .post((req, res) => {
      const newIssue = new Issue({
        issue_title: req.body.issue_title,
        issue_text: req.body.issue_text,
        created_by: req.body.created_by,
        assigned_to: req.body.assigned_to || '',
        status_text: req.body.status_text || '',
        project: req.params.project,
      });

      if (
        !req.body.issue_title ||
        !req.body.issue_text ||
        !req.body.created_by
      ) {
        return res.json('Required fields missing from request');
      }

      newIssue.save((err, issue) => {
        if (err) {
          throw new Error(err);
        }
        res.json(issue);
      });
    })

    .put((req, res) => {
      const id = req.body._id;
      const update = {};

      for (let key in req.body) {
        if (req.body[key] !== '') {
          update[key] = req.body[key];
        }
      }

      if (Object.keys(update).length < 2) {
        return res.json('no updated field sent');
      }

      update.updated_on = today();
      update.open = req.body.open || true;

      Issue.findByIdAndUpdate(id, update, { new: true }, (err, issue) => {
        if (err) {
          throw new Error(err);
        }
        if (!issue) {
          return res.json('could not update ' + id);
        }
        return res.json('successfully updated');
      });
    })

    .delete((req, res) => {
      const id = req.body._id;

      if (!id) {
        return res.json('id error');
      }

      Issue.findByIdAndRemove(id, (err, issue) => {
        if (err) {
          throw new Error(err);
        }
        if (!issue) {
          return res.json('could not delete ' + id);
        }
        return res.json('deleted ' + id);
      });
    });
};
