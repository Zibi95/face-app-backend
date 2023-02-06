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

const { PORT, DB_PASSWORD } = process.env;

const db = knex({
  client: 'pg',
  connection: {
    host: 'dpg-cfghl09a6gdma8gf5kc0-a.frankfurt-postgres.render.com',
    user: 'face_app_db_user',
    password: DB_PASSWORD,
    database: 'face_app_db',
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

app.listen(PORT || 3000);
