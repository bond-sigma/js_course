define([
	'backbone',
	'underscore',
	'text!../templates/index.html',
	'../collection/ToDoCollection',
	'../modules/mediator',
	'./ToDoRow'
],
	function (Backbone, _, template, ToDoCollection, Mediator, ToDoRow) {

	return Backbone.View.extend({

		//tagName: 'ul',
		template    : _.template(template),
		className   : "",
		events      : {
			'click .someselector' : 'someHandler',
			'submit form' : 'submitAction'
		},
		initialize  : function () {
			var self = this;

			this.rows = {};

			this.collection = new ToDoCollection([]);
			this.collection.on('add', this.renderTodo, this);

			this.collection.fetch();

			Mediator.subscribe('todo:added', function (Model) {
				self.collection.add(Model);
			});

			Mediator.subscribe('delete:model', function (id) {

				if (self.rows[id]) {
					self.rows[id].remove();
				}
			});

		},
		someHandler : function () {

		},
		renderTodo: function (model) {

			var todoRow = new ToDoRow({ model: model});
			this.rows[model.id] = todoRow;
			this.$('ul').append(todoRow.render().$el);

		},
		submitAction: function () {
			event.preventDefault();
			//console.log('Submit');
			return false;
		},
		render      : function () {

			console.log('render main view', this.collection.length);

			this.$el.html(this.template({todos: this.collection.toJSON()}));

			return this;
		}
	});


});