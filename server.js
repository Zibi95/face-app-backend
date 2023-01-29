const express = require('express');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

const users = [
  {
    id: 123,
    name: 'John',
    email: 'john@gmail.com',
    password: 'qwerty',
    entries: 0,
    joined: new Date(),
  },
  {
    id: 124,
    name: 'Jenny',
    email: 'jenny@gmail.com',
    password: 'qwerty1234',
    entries: 0,
    joined: new Date(),
  },
];

app.get('/', (req, res) => {
  res.send(users);
});

app.post('/signin', (req, res) => {
  const { email, password } = req.body;
  if (
    email === users[users.length - 1].email &&
    password === users[users.length - 1].password
  ) {
    res.json(users[0]);
    res.json('succes');
  }

  res.status(400).json('error logging in');
});

app.post('/register', (req, res) => {
  const { email, password, name } = req.body;

  (email &&
    password &&
    name &&
    users.push({
      id: 125,
      name: name,
      email: email,
      password: password,
      entries: 0,
      joined: new Date(),
    })) ||
    res.json('brakuje danych');

  res.json(users);
});

app.get('/profile/:id', (req, res) => {
  const { id } = req.params;

  users.forEach(user => user.id.toString() === id && res.json(user));

  res.status(404).send('No such profile');
});

app.put('/image', (req, res) => {
  const { id } = req.body;

  users.forEach(user => {
    if (user.id.toString() === id) {
      user.entries++;
      return res.json(user.entries);
    }
  });

  res.status(404).send('No such profile');
});

app.listen(3000, () => {
  console.log('Im listening');
});
