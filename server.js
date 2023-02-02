const register = require('./functions/register.js');
const signin = require('./functions/signin.js');
const profile = require('./functions/profile.js');
const image = require('./functions/image.js');

const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const knex = require('knex');

const app = express();
app.use(cors());

const db = knex({
  client: 'pg',
  connection: {
    host: '127.0.0.1',
    user: 'postgres',
    password: 'test',
    database: 'face-app',
  },
});

app.use(express.json());

app.get('/', (req, res) => {
  res.send('It works');
});

app.post('/signin', signin.handleSignIn(db, bcrypt));

app.post('/register', register.handleRegister(db, bcrypt));

app.get('/profile/:id', profile.getFrofile(db));

app.put('/image', image.handleImage(db));

app.post('/imageurl', image.handleApiCall());

app.listen(3000, () => {
  console.log('Im listening');
});
