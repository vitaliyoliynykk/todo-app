const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const todoSchema = new Schema({
	text: {
		type: String,
		minlength: 1,
		trim: true,
		required: true
	},
	completed: {
		type: Boolean,
		default: false
	}
});

const Todo = mongoose.model('todo', todoSchema);

module.exports = {Todo};