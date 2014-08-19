var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');
var multer = require('multer');


var goods = [
	{
		name: 'IPAD',
		price: 500,
		count: 10
	},
	{
		name: 'IPHONE',
		price: 600,
		count: 50
	}
];

var cart = [];

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(multer());
app.use(express.static(path.join(__dirname, 'public')));


app.get('/', function (request, response) {


	response.send('hello world');
});


app.get('/somepage', function (req, res){
	res.send({a:1})
});

app.get('/someroute', function (req, res){
	res.status(401).send('We require login and password');
});

app.get('/headers', function (req, res){

	res.set('Access-Control-Allow-Origin', '*');
	res.set('Access-Control-Allow-Methods', 'POST, GET');
	res.set('Access-Control-Allow-Credentials', 'false');
	res.set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

	res.send('Headers ajax request');

});

app.get('/syncajax', function (req, res) {
	var limit = (new Date()).getTime() + 10000;
	while ((new Date()).getTime() < limit ) {

	}
	res.send('Sync response');
});


app.get('/add_good', function (req, response) {
	var name = req.query.name;
	//search blal
	cart.push(name);
});

app.get('/remove_good', function (req, resp) {
	var name = req.query.name;
	//blalbal if good in cart
});

app.get('/testhtml', function (req, res) {
	var dataToTemplate = {
		name: 'Dmitry',
		job: 'JS coder',
		goods : ["sss", "ssss"]
	};
	res.send(dataToTemplate);
});

app.get('/ajax', function (req, res) {
	res.render('ajax', function(err, html){
		res.send(html);
	});
});

app.get('/testajax', function (req, res) {
	res.set('Content-Type', 'text/plain');
	res.send('some text');
});

app.post('/posthandler', function (req, res) {
	console.log(req.body);
	res.send(req.body);
});


app.listen(3001, function () {
	console.log('Server started at adress http://localhost:3000');
});