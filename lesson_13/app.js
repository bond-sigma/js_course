requirejs.config({
	baseUrl : '/js_course/lesson_13',
	paths   : {
		jquery : 'libs/jquery',
		waypoints: 'libs/waypoints'
	},
	shim: {
		'backbone': {
			deps: ['jquery'],
			exports: 'waypoints'
		}
	}
});

// Start the main app logic.
requirejs(['jquery', './modules/main_module', 'waypoints'],
	function ($, moduleMain) {
		moduleMain.init();

});