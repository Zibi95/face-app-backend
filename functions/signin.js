const handleSignIn = (db, bcrypt) => (req, res) => {
  const { email, password } = req.body;
  if (email && password) {
    db.select('*')
      .from('login')
      .where('email', '=', email)
      .then(user => {
        const hash = user[0]['hash'];
        const isPasswordValid = bcrypt.compareSync(password, hash);
        if (!isPasswordValid) {
          return 'Wrong credentials';
        }
        return db.select('*').from('users').where('email', '=', email);
      })
      .then(data => res.json(data))
      .catch(err => res.json('Something went wrong'));
  } else {
    return res.json('Not enough data');
  }
};

module.exports = {
  handleSignIn,
};
