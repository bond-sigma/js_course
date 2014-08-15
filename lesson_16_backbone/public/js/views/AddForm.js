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
		initialize  : function (options) {
			console.log(options.model);
			if (!options.model) {
				this.model = new ToDoModel();
			}
		},
		submitAction : function (event) {
			event.preventDefault();

			var self = this;

			//var model = new ToDoModel();

			var isNew = this.model.isNew();

			this.model.save(
				{
					done       : this.$('[name="todo-done"]').is(':checked'),
					text       : this.$('[name="todo-text"]').val(),
					createDate : (new Date()).getUTCDate()
				},
				{
					success : function () {
						//console.log('saved');
						if (isNew) {
							Mediator.publish('todo:added', self.model);
						} else {
							Backbone.history.navigate('', {trigger: true});
						}

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

			console.log(this.model.toJSON());

			this.$el.html(this.template(this.model.toJSON()));
			return this;
		}
	});


});