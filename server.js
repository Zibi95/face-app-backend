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

const { PORT, PG_CONNECTION_STRING } = process.env;
const db = knex({
  client: 'pg',
  connection: PG_CONNECTION_STRING,
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

app.listen(PORT || 3000, () => {
  console.log('OK');
});
