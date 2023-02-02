const handleImage = db => (req, res) => {
  const { id } = req.body;

  db('users')
    .where('id', '=', id)
    .returning('*')
    .increment('entries', 1)
    .then(user => res.json(user[0]))
    .catch(err => {
      console.log('Something went wrong');
    });
};

module.exports = {
  handleImage,
};
