const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const url = 'mongodb://vitalii:V1talik0@ds111455.mlab.com:11455/todo-app';
mongoose.connect(url);

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('CONNECTED');
});

module.exports = {
	mongoose
};