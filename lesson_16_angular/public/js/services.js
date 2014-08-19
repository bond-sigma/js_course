var todoService = angular.module('todoService', ['ngResource']);

todoService.factory('Todo', ['$resource',
	function($resource){
		return $resource('todos', {}, {
			query: {method:'GET', isArray:true},
			save : {url: '/todo', method: 'POST'},
			delete : { url : '/todo/:_id', method : 'DELETE', params : {_id : '@_id'}},
			get : {url : '/todo/:id', params : {id : '@id'}}
		});
	}]);
