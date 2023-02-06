const handleSignIn = (db, bcrypt) => (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) return res.json('Not enough data');

  db.select('*')
    .from('login')
    .where('email', '=', email)
    .then(user => {
      const hash = user[0]['hash'];
      const isPasswordValid = bcrypt.compareSync(password, hash);
      return isPasswordValid ? db.select('*').from('users').where('email', '=', email) : "User and password doesn't match";
    })
    .then(data => res.json(data))
    .catch(err => res.status(400).json('Unable to signin'));
};

module.exports = {
  handleSignIn,
};
