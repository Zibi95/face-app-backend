const handleSignIn = (db, bcrypt) => (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) return res.status(400).res.json('Not enough data');

  db.select('*')
    .from('login')
    .where('email', '=', email)
    .then(user => {
      const hash = user[0]['hash'];
      const isPasswordValid = bcrypt.compareSync(password, hash);

      return isPasswordValid ? db.select('*').from('users').where('email', '=', email) : res.status(400).json("User and password doesn't match");
    })
    .then(user => res.json(user))
    .catch(err => res.status(400).json('Unable to signin'));
};

module.exports = {
  handleSignIn,
};
