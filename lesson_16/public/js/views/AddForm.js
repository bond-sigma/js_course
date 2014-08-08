define([
	'backbone',
	'underscore',
	'text!../templates/addForm.html',
	'../models/ToDo',
	'../modules/mediator'
],
	function (Backbone, _, template, ToDoModel, Mediator) {

	return Backbone.View.extend({

		template    : _.template(template),
		events      : {
			'submit form' : 'submitAction'
		},
		initialize  : function () {


		},
		submitAction : function (event) {
			event.preventDefault();

			var model = new ToDoModel();

			model.save(
				{
					done       : this.$('[name="todo-done"]').is(':checked'),
					text       : this.$('[name="todo-text"]').val(),
					createDate : (new Date()).getUTCDate()
				},
				{
					success : function () {
						//console.log('saved');
						Mediator.publish('todo:added', model);
					}
				});

			this.$(':input')
				.not(':button, :submit, :reset, :hidden')
				.val('')
				.removeAttr('checked')
				.removeAttr('selected');

			console.log('Submit');

			return false;
		},
		render      : function () {
			this.$el.html(this.template());
			return this;
		}
	});


});