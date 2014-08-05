define(['backbone', 'underscore', 'text!../templates/addForm.html'],
	function (Backbone, _, template) {

	return Backbone.View.extend({

		template    : _.template(template),
		events      : {
			'submit form' : 'submitAction'
		},
		initialize  : function () {


		},
		submitAction : function (event) {
			event.preventDefault();


			console.log('Submit');

			return false;
		},
		render      : function () {
			this.$el.html(this.template());
			return this;
		}
	});


});