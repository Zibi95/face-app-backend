const handleSignIn = (db, bcrypt) => (req, res) => {
  const { email, password } = req.body;

  if (email && password) {
    db.select('*')
      .from('login')
      .where('email', '=', email)
      .then(user => {
        const hash = user[0]['hash'];
        const isPasswordValid = bcrypt.compareSync(password, hash);
        console.log(isPasswordValid);
        if (isPasswordValid) {
          return db.select('*').from('users').where('email', '=', email);
        }
      })
      .then(data => res.json(data))
      .catch(err => res.status(400).json('Wrong credentials'));
  } else {
    return res.json('Not enough data');
  }
};

module.exports = {
  handleSignIn,
};
