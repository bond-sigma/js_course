var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');
var multer = require('multer');


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(multer());
app.use(express.static(path.join(__dirname, 'public')));

var todo = {
	'6152435614231' : {
		text        : 'test text',
		createdDate : (new Date()).getUTCDate(),
		done        : false,
		id          : (new Date()).getTime()
	}
};


app.get('/', function (request, response) {
	response.render('index', function (err, html) {
		response.send(html);
	});
});

app.post('/todo', function (req, res) {

	if (req.body.text) {
		var newTodo = {
			text        : req.body.text,
			createdDate : req.body.createdDate,
			done        : req.body.done,
			id          : (new Date()).getTime()
		};

		todo[newTodo.id] = newTodo;
	}

	res.send(newTodo);
});

app.get('/todos', function (req, res){

	var todos = [];

	for (var i in todo) {
		todos.push(todo[i]);
	}

	res.send(todos);
});


app.listen(3000, function () {
	console.log('Server started at adress http://localhost:3000');
});