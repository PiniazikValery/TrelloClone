const mongoose = require('mongoose');
const express = require('express');
const passport = require('passport');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const config = require('./config');
const app = express();
const port = process.env.PORT || config.get('port');
const authRoutes = require('./api/routes/auth');
const boardRoutes = require('./api/routes/board');
const listRoutes = require('./api/routes/list');
const cardRoutes = require('./api/routes/card');
const userRoutes = require('./api/routes/user');

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  })
);
app.use(passport.initialize());
app.use(passport.session());

mongoose.connect(config.get('connectionString'), {
  useNewUrlParser: true,
  useCreateIndex: true,
});

const db = mongoose.connection;

db.on('error', (error) => {
  console.log(`Error with db: ${error}`);
});

db.once('open', () => {
  console.log('Server is connected to data base');
});

app.use('/api/user', authRoutes);
app.use('/api/board', boardRoutes);
app.use('/api/list', listRoutes);
app.use('/api/card', cardRoutes);
app.use('/api/userInfo', userRoutes);
app.listen(port, () => console.log(`Listening on port ${port}`));