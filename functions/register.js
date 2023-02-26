const handleRegister = (db, bcrypt) => (req, res) => {
  const { email, password, name } = req.body;
  if (email && password && name) {
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
      .catch(err => res.json(err));
  } else {
    res.json('Not enough data');
  }
};

module.exports = {
  handleRegister,
};
