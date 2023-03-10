const { ClarifaiStub, grpc } = require('clarifai-nodejs-grpc');
const stub = ClarifaiStub.grpc();

const USER_ID = 'clarifai';
const PAT = '6d212f09453d4109a531648904f6ca06';
const APP_ID = 'main';
const MODEL_ID = 'face-detection';
// This is optional.You can specify a model version or the empty string for the default
const MODEL_VERSION_ID = '45fb9a671625463fa646c3523a3087d5';

const metadata = new grpc.Metadata();
metadata.set('authorization', 'Key ' + PAT);

const handleApiCall = () => (req, res) => {
  const { imageUrl } = req.body;
  stub.PostModelOutputs(
    {
      user_app_id: {
        user_id: USER_ID,
        app_id: APP_ID,
      },
      model_id: MODEL_ID,
      version_id: MODEL_VERSION_ID, // This is optional. Defaults to the latest model version.
      inputs: [{ data: { image: { url: imageUrl, allow_duplicate_url: true } } }],
    },
    metadata,
    (err, response) => {
      if (err) {
        console.log(err);
      }

      if (response.status.code !== 10000) {
        return res.status(400).json('Fetch failed');
      }

      return res.json(response);
    }
  );
};

const handleImage = db => (req, res) => {
  const { id } = req.body;

  if (!id) return res.json('no image Added');

  db('users')
    .where('id', '=', id)
    .returning('*')
    .increment('entries', 1)
    .then(user => res.json(user[0]))
    .catch(err => {
      res.json('Something went wrong');
    });
};

module.exports = {
  handleImage,
  handleApiCall,
};
