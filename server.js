const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Todo = require('./todo.model')
const route = express.Router(); 
const cors = require('cors');

route.get("/", async (req,res)=>{
	const todo = await Todo.find();
	res.send(todo);

})

route.get('/:id',async(req,res)=>{
	await Todo.findById(req.params.id, (err,todo)=>{
		if(!todo){
			res.status(404).send("id not found");
		}else{
			res.json(todo);
		}
	})
});
route.post('/update/:id', async (req,res)=>{
	await Todo.findById(req.params.id, (err,todo)=>{
		if(!todo){
			res.status(404).json('data is not found');
			return;
		}else{
			todo.Fonction = req.body.Fonction;
			todo.nom = req.body.nom;
			todo.prenom = req.body.prenom;
			todo.email = req.body.email;
			todo.CNI = req.body.CNI;
			todo.save().then(res.json('todo Updated '))
						.catch(err=>{
				res.json('update impossible');
			})
		}
	},{
  		returnOriginal: false}
  		);
});

route.post('/add', async (req,res)=>{
	
		const post = new Todo(req.body)

		await post.save().then(
			// res.send(post);
			res.setHeader("Content-Type", "text/html")
			)
		.catch(err=> res.json('failed'));
		
	});

route.delete('/:id', async(req,res)=>{
	await Todo.findByIdAndDelete(req.params.id)
				.then(()=> res.json('todo Deleted'))
				.catch(err=> res.status(404).json('Erro : '+ err));
})



/*route.post('/add', async (req,res)=>{
	let todo = new Todo(req.body);
	await todo.save().then(
			todo=>{
				res.status(200).json({'todo': 'todo add successfully'});
			}
		)
					.catch(err=>{
						res.status(404).json(err)
					})

})*/

mongoose
		.connect(`mongodb+srv://User:azerty@cluster0.7punr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,{useNewUrlParser: true, useUnifiedTopology: true})
		.then(()=>{
				const app = express();
				app.use(cors());
				
				app.use( bodyParser.json() );       // to support JSON-encoded bodies
				app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
 					extended: true
					})); 
				app.use(express.json());
				
				app.use('/', route);


				app.listen(5000, ()=>{
				console.log('hello from server.js on port 5000');
					}
					)
			}).catch((err)=>  console.log(err));



