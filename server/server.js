const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

const {mongoose} = require('./db/mongoose');
const {Todo} = require('./models/todo');

const app = express();

const addTodo = (req, res) => {
	const todo = new Todo({
		text: req.body.text
	});

	todo.save()
	.then((doc) => {
		res.send(doc);
	})
	.catch((e) => {res.status(400).send(e);})
}

const removeTodo = (req, res) => {
	const id = req.params.id;
	if(!ObjectID.isValid(id)){
		return res.status(404).send();
	}

	Todo.findByIdAndRemove(id).then((todo) => {
		if(!todo){
			res.stats(404).send();
		}
		res.send(todo);
	}).catch((e) => {
		res.status(400).send();
	})
}

const getTodos = (req, res) => {
	Todo.find().then((todos) => {
	 	res.send({todos});
	 }).catch((e) => {
	 	res.status(400).send(e);
	 })
}

const markDone = (req, res) => {
	const id = req.params.id;

	if(!ObjectID.isValid(id)){
		return res.status(404).send();
	}

	Todo.findByIdAndUpdate(id, {
		$set: {
			completed: true
		}
	}, {new: true}).then((todo) => {
		if(!todo){
			res.status(404).send();
		}
		res.send({todo});

	}).catch((e) =>{
		res.status(400).send()
	});
}

const markUndone = (req, res) => {
	const id = req.params.id;

	if(!ObjectID.isValid(id)){
		return res.status(404).send();
	}

	Todo.findByIdAndUpdate(id, {
		$set: {
			completed: false
		}
	}, {new: true}).then((todo) => {
		if(!todo){
			res.status(404).send();
		}
		res.send({todo});

	}).catch((e) =>{
		res.status(400).send()
	});
}

app.use(bodyParser.json());

app.use((req, res, next) => {
    if (req.headers.authorization === 'Bearer vitalii') {
        console.log('Auth passed!')
        next();
    } else {
        console.log('Auth failed');
        next({
            status: 403,
            error: 'You are not authorized!'
        });
    }
});



app.post('/todos', addTodo);
app.get('/todos', getTodos);
app.delete('/todos/:id', removeTodo);
app.patch('/todos/:id/done', markDone);
app.patch('/todos/:id/undone', markUndone);

app.listen(3000, () => {
	console.log('Started on 3000');
});

module.exports = {app};