requirejs.config({
	baseUrl : '/js',
	paths   : {
		jquery     : 'vendor/jquery',
		backbone   : 'vendor/backbone',
		underscore : 'vendor/underscore',
		text	   : 'vendor/text',
		bootstrap  : 'vendor/bootstrap'
	},
	shim    : {
		backbone : {
			deps    : ['jquery', 'underscore']
		},
		layoutmanager: {
			deps: ['backbone']
		},
		bootstrap: {
			deps : ['jquery']
		}
	}
});

// Start the main app logic.
requirejs(['./app'],
	function (app) {
		app.init();
	});