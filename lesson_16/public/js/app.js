define(['backbone', './routes/index', './modules/mediator'],
	function (Backbone, Router, Mediator) {

	return {

		init: function () {

			var Routes = new Router();
			Backbone.history.start();


			console.log('Main init');
		}
	};


});