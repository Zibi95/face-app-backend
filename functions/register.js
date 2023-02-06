const handleRegister = (db, bcrypt) => (req, res) => {
  const { email, password, name } = req.body;

  if (!email || !password || !name) return res.json('Not enough data');

  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);
  db.transaction(trx => {
    return trx('login')
      .insert({ email: email, hash: hash })
      .catch(err => res.json(err))
      .then(() => {
        return trx('users').returning('*').insert({
          name: name,
          email: email,
          joined: new Date(),
        });
      });
  })
    .catch(err => res.json('Email already used'))
    .then(user => res.json(user))
    .catch(err => res.json('Something went wrong'));
};

module.exports = {
  handleRegister,
};
