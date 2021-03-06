
const Clarifai = require('clarifai');


const app = new Clarifai.App({
 apiKey: 'dd98acb4c9f845808a7f586886cddaa9'
});

const handleApiCall = (req, res) => {
	console.log(req.body.input);
	app.models
      .predict( Clarifai.FACE_DETECT_MODEL, req.body.input)
      .then(data => {
      	res.json(data);
      })
      .catch(err=> res.status(400).json('unable to receive from clarifai'))
}

const imageHandler = (req,res,db) => {
	const { id } = req.body;
	db('users')
		.where('id', '=', id)
		.increment('entries',1)
		.returning('entries')
		.then(entries => {
			res.json(entries[0]);
		})
		.catch(err => res.status(400).json('UNABLE TO GET ENTRIES' ))
}

module.exports = {
	handleApiCall: handleApiCall,
	imageHandler:imageHandler
};

