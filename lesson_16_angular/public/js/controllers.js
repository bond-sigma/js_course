var mainModule = angular.module('todoApp', []);

mainModule.controller('ListController',  function ($scope, $http) {

	$scope.name = 'Dmitry';

	$scope.todos = [
		{
			text : 'Todo1',
			id: 1
		},
		{
			text : 'Todo2',
			id: 2
		}
	];

	$scope.loadTodo = function () {
		$http.get('/todos').success(function (result) {
			$scope.todos = result;
		});
	}




});


mainModule.controller('FormController', function ($scope) {



});