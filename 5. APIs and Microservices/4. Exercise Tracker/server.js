const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

require('dotenv').config();

const app = express();

mongoose.connect(process.env.DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.set('useFindAndModify', false);

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static('public'));
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  log: [Object],
});
const User = mongoose.model('User', userSchema);

app.post('/api/exercise/new-user', (req, res) => {
  const newUser = new User({ username: req.body.username });
  newUser.save((err, result) => {
    if (err) {
      throw new Error(err);
    }
    res.json({ _id: result._id, username: result.username });
  });
});

app.post('/api/exercise/add', (req, res, next) => {
  const exercise = {
    description: req.body.description,
    duration: +req.body.duration,
    date: (req.body.date === ''
      ? new Date()
      : new Date(Date.parse(req.body.date))
    )
      .toString()
      .slice(0, 15),
  };

  if (!exercise.description) {
    return next(`Path \`description\` is required.`);
  }

  if (!exercise.duration) {
    return next(`Path \`duration\` is required.`);
  }

  User.findByIdAndUpdate(
    req.body.userId,
    { $push: { log: exercise } },
    { new: true },
    (err, user) => {
      if (err) {
        throw new Error(err);
      }
      res.json({
        _id: user._id,
        username: user.username,
        date: exercise.date,
        duration: exercise.duration,
        description: exercise.description,
      });
    }
  );
});

app.get('/api/exercise/users', (req, res) => {
  User.find({}, (err, users) => {
    if (err) {
      throw new Error(err);
    }
    res.json(users);
  });
});

app.get('/api/exercise/log', (req, res) => {
  User.findById(req.query.userId, (err, result) => {
    if (err) {
      throw new Error(err);
    }

    const responseObject = result;

    if (req.query.from || req.query.to) {
      let fromDate = new Date(0);
      let toDate = new Date();

      if (req.query.from) {
        fromDate = new Date(req.query.from);
      }

      if (req.query.to) {
        toDate = new Date(req.query.to);
      }

      fromDate = fromDate.getTime();
      toDate = toDate.getTime();

      responseObject.log = responseObject.log.filter((exercise) => {
        const exerciseDate = new Date(exercise.date).getTime();

        return exerciseDate >= fromDate && exerciseDate <= toDate;
      });
    }

    if (req.query.limit) {
      responseObject.log = responseObject.log.slice(0, req.query.limit);
    }

    responseObject.count = result.log.length;
    res.json(responseObject);
  });
});

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port);
});
