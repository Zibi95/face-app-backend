const getFrofile = db => (req, res) => {
  const { id } = req.params;

  db.select('*')
    .from('users')
    .where('id', '=', id)
    .then(user => {
      (user.length && res.json(user[0])) ||
        res.status(400).json('User not found!');
    })
    .catch(err => res.json(err.detail));
};

module.exports = {
  getFrofile,
};
