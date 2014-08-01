var url = require('url');
var fs = require('fs');

var Router  = {

	parseRoute: function (request, response) {
		var parsedUrl = url.parse(request.url);
		parsedUrl.pathname = parsedUrl.pathname.substring(1);

			if (parsedUrl.pathname == '') {
				this.index(request, response);
			} else if (this[parsedUrl.pathname]) {
				this[parsedUrl.pathname](request, response)
			} else {
				this.defaultRoute(request, response);
			}

	},
	index: function (request, response) {

		fs.readFile(__dirname + '/html/first.html', function (err, data) {
			if (err) throw err;

			response.end(data);

		});

	},
	somepage: function (request, response) {

		fs.readFile(__dirname + '/html/second.html', function (err, data) {
			if (err) throw err;

			response.end(data);

		});


	},
	defaultRoute: function (request, response) {
		response.writeHead(404, {
			'Content-Type': 'text/plain' });
		response.end('not found');
	}

};

module.exports.router = Router;


module.exports.someother = function () {

};
