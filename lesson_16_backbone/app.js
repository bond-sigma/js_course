var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');
var multer = require('multer');


var MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID
var format = require('util').format;

var MongoCollection = null;

MongoClient.connect('mongodb://192.168.56.101:27017/js_course', function(err, db) {
	if(err) throw err;
	MongoCollection = db.collection('todo');
});


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(multer());
app.use(express.static(path.join(__dirname, 'public')));


app.get('/', function (request, response) {
	response.render('index', function (err, html) {
		response.send(html);
	});
});

app.get('/todo/:id', function (req, res) {

	if (req.params.id) {

		console.log(req.params.id);

		MongoCollection.findOne({_id: new ObjectID(req.params.id)}, function (err, result) {
			if (err) throw err;
			res.status(200).send(result);
		});
	} else {
		res.status(500).send('Wrong params');
	}
});

app.post('/todo', function (req, res) {

	if (req.body.text) {

		var newTodo = {
			text        : req.body.text,
			createdDate : (new Date()),
			done        : req.body.done
		};

		MongoCollection.insert(newTodo, function ( err, results) {
			if (err) {
				throw  err;
			}

			newTodo._id = results[0]._id;
			res.send(newTodo);

		});
	}

});

app.put('/todo/:id', function (req, resp) {

	if (req.params.id) {

		MongoCollection.findOne({_id: new ObjectID(req.params.id)}, function (err, result) {
			if (err) throw err;

			if (result) {

				MongoCollection.update({_id: new ObjectID(req.params.id)}, { $set : {
					text        : req.body.text,
					done        : req.body.done
				}}, {}, function (err) {
					if (!err) {
						resp.send({
							text        : req.body.text,
							done        : req.body.done
						});
					} else {
						resp.status(500).send('Server error');
					}
				});

			} else {
				resp.status(404).send('Not found');
			}

		});

	} else {
		resp.status(500).send('Wrong params');
	}
});

app.delete('/todo/:id', function (req, res) {

	if (req.params.id) {

		console.log(req.params.id);

		MongoCollection.remove({_id: new ObjectID(req.params.id)}, function (err, results) {
			if(err) {
				throw err;
			}

			res.status(200).send('OK');

		});
	} else {
		res.status(500).send('Wrong params');
	}
});

app.get('/todos', function (req, res){

	MongoCollection.find().toArray(function ( err, results) {

		if (err) {
			res.status(500).send('Server error');
			throw err;
		}

		res.send(results);
	});

});


app.listen(3000, function () {
	console.log('Server started at adress http://localhost:3000');
});