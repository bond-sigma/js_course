define(['backbone', 'underscore', 'text!../templates/index.html', '../collection/ToDoCollection'],
	function (Backbone, _, template, ToDoCollection) {

	return Backbone.View.extend({

		//tagName: 'ul',
		template    : _.template(template),
		className   : "",
		events      : {
			'click .someselector' : 'someHandler',
			'submit form' : 'submitAction'
		},
		initialize  : function () {

			this.collection = new ToDoCollection([]);
			this.collection.on('add', this.render, this);

			this.collection.fetch();

		},
		someHandler : function () {

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