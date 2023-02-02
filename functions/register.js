const handleRegister = (db, bcrypt) => (req, res) => {
  const { email, password, name } = req.body;

  if (!email || !password || !name)
    return res.status(400).res.json('Not enough data');

  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);

  db.transaction(trx => {
    return trx('login')
      .insert({ email: email, hash: hash })
      .then(() => {
        return trx('users').returning('*').insert({
          name: name,
          email: email,
          joined: new Date(),
        });
      });
  })
    .then(user => res.json(user))
    .catch(err => res.status(400).json('Email already used'));
};

module.exports = {
  handleRegister,
};
