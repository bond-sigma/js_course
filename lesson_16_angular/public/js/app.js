var todoApp = angular.module('todoApp', [
	'ngRoute',
	'todoControllers',
	'todoService'
]);

todoApp.config(
	function($routeProvider) {
		$routeProvider.
			when('/', {
				templateUrl: 'js/views/list.tpl.html',
				controller: 'ListController'
			}).
			when('/form', {
				templateUrl: 'js/views/form.tpl.html',
				controller: 'FormController'
			})
			.when('/form/:id', {
				templateUrl: 'js/views/form.tpl.html',
				controller: 'FormController'
			}).
			otherwise({
				redirectTo: '/'
			});
	});
