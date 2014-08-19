

var todoControllers = angular.module('todoControllers', []);

todoControllers.controller('ListController',[ '$scope', '$http', 'Todo', "$routeParams", '$location',
	function ($scope, $http, Todo, $routeParams, $location) {

	$scope.todos = [];

	$scope.loadTodo = function () {
		/*$http.get('/todos').success(function (result) {
			$scope.todos = result;
		});*/
		$scope.todos = Todo.query();
	};

	$scope.removeTodo = function (id) {
		Todo.delete({_id : id});

		for (var i = 0; i < $scope.todos.length; i++) {
			if ($scope.todos[i]._id == id) {
				$scope.todos.splice(i, 1);
				break;
			}
		}
	};

	$scope.editTodo = function (id) {
		$location.path('/form/' + id);
	};

}]);


todoControllers.controller('FormController', [ '$scope', '$http', 'Todo', '$routeParams',  function ($scope, $http, Todo, $routeParams) {

	//console.log($routeParams.id);

	if ($routeParams.id) {
		$scope.todo = Todo.get({id : $routeParams.id}, function (todo) {
			//$scope.todo = todo;
		});
	} else {
		$scope.todo = {text: '', done: false};
	}


	$scope.saveTodo = function () {
		/*$http.post('/todo', $scope.todo).success(function(){
			console.log('ToDo created on server');
		});*/

		Todo.save($scope.todo);

	};


}]);