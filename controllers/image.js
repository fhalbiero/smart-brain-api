const Clarifai = require('clarifai');

const app = new Clarifai.App({apiKey: '46199284c68047359fd87f0c99067645'});

const handleApiCall = () => (req, res) => {
    app.models
    .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then(data => {
        res.json(data);
    })
    .catch(err => res.status(400).jason('unable to work with this API'));
}


const handleImage = (db) => (req, res) => {
    const { id } = req.body;
    db.from('users').where('id','=',id)
    .increment('entries',1)
    .returning('entries')
    .then(entries => res.json(entries[0]))
    .catch(err => res.status(400).json('unable to get entries')); 
}

module.exports = {
    handleImage,
    handleApiCall
}