const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const cors = require('cors');
const knex = require('knex');



const register = require('./controller/register');
const signin = require('./controller/signin');
const image = require('./controller/image');
const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : 'abhishek',
    database : 'smart-brain'
  }
});

const app = express();
app.use(bodyParser.json());
app.use(cors());


app.get('/',(req,res) => {
	res.send('Its working');
})



app.post('/signin', (req,res) => {signin.signinHandler(req,res,db,bcrypt)})

app.post('/register', (req,res) => {register.registerHandler(req,res,db,bcrypt)})



app.get('/profile/:id',(req,res) => {
	const { id } = req.params;
	db.select('*').from('users').where({id})
		.then(user => {
			if(user.length){
				res.json(user[0])
			} else{
				res.status(400).json('NOT FOUND');
			}
		})
		.catch(err => res.status(400).json('error getting user'))
})


app.put('/image', (req,res) => {image.imageHandler(req,res,db)})

app.post('/imageUrl',(req,res) => {image.handleApiCall(req,res)})


app.listen(process.env.PORT || 3000, ()=>{
	console.log(`app is running at port ${process.env.PORT}`);
})


/*
/--->res = this is working
/signin --> POST = success/failure
/register --> POST = user
/profile/:userId --> GET = user
/image --> PUT --> user
*/