const handleSignIn = (db, bcrypt) => (req, res) => {
  const { email, password } = req.body;

  db.select('*')
    .from('login')
    .where('email', '=', email)
    .then(user => {
      const hash = user[0]['hash'];
      const isPasswordValid = bcrypt.compareSync(password, hash);

      return isPasswordValid
        ? db.select('*').from('users').where('email', '=', email)
        : res.status(400).json("User and password doesn't match");
    })
    .then(user => res.json(user))
    .catch(err => res.json(err.detail));
};

module.exports = {
  handleSignIn,
};
