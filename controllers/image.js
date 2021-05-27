const Clarifai = require ('clarifai');

const app = new Clarifai.App({
    apiKey: '7f80a29443aa4169b28c94e6e2568a88'
   });

const handleApiCall = (req, res) => {
    app.models
   // .predict(Clarifai.FACE_DETECT_MODEL,this.state.input)
   // .predict("d02b4508df58432fbb84e800597b8959","https://samples.clarifai.com/face-det.jpg")
   .predict(Clarifai.FACE_DETECT_MODEL,req.body.input)
   .then(data => {
       res.json(data)
   })
   .catch(err => res.status(400).json('Unable to work with API'))
}

const handleImage = (req, res, db) => {
    const { id } = req.body;
    let found = false;
    db('users').where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
        res.json(entries[0])
    })
    .catch(err => res.status(400).json('Unable to get entries!'))
}

module.exports = {
    handleImage,
    handleApiCall
}