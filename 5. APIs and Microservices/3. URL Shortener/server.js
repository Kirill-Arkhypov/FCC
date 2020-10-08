'use strict';

const express = require('express');
const mongo = require('mongodb');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

mongoose.connect(process.env.DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/public', express.static(process.cwd() + '/public'));

const urlSchema = new mongoose.Schema({
  original_url: { type: String, required: true },
  short_url: {
    type: String,
    default: () => Math.random().toString(36).slice(2, 7),
  },
});

const URL = mongoose.model('URL', urlSchema);

app.get('/', (req, res) => {
  res.sendFile(process.cwd() + '/views/index.html');
});

// your first API endpoint...

app.get('/api', (req, res) => {
  res.json({ greeting: 'hello API' });
});

app.post('/api/shorturl/new', (req, res) => {
  const input = req.body.url;

  const regex = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;

  if (!input.match(regex)) {
    res.json({ error: 'Invalid URL' });
    return;
  }

  const shortURL = new URL({ original_url: input });
  shortURL.save();

  res.json(shortURL);
});

app.get('/api/shorturl/:query', (req, res) => {
  URL.findOne({ short_url: req.params.query }, (err, result) => {
    if (err) {
      throw new Error(err);
    }
    if (!result) {
      return res.json({ error: 'URL not found' });
    }
    res.redirect(result.original_url);
  });
});

app.listen(port, () => {
  console.log('server listening...');
});
