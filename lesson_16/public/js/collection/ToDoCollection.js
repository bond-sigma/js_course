define(['backbone', '../models/ToDo'], function (Backbone, ToDoModel) {

	return Backbone.Collection.extend({
		model : ToDoModel,
		url   : '/todos'
	});

});