define([
	'backbone',
	'underscore',
	'text!../templates/todoRow.html',
	'../modules/mediator'
],
	function (Backbone, _, template, Mediator) {

		return Backbone.View.extend({

			template    : _.template(template),
			events      : {
				'change input[type="checkbox"]' : 'mark',
				'click input[type="button"]' : 'deleteTodo'
			},
			initialize  : function () {

				this.model.on('change', this.render, this);

			},
			mark: function () {
				this.model.set('done', this.$('input[type="checkbox"]').is(':checked'));
				this.model.save();
			},
			deleteTodo: function () {
				Mediator.publish('delete:model', this.model.id);
				//this.model.fetch();
				this.model.destroy();
			},
			render      : function () {
				this.$el.html(this.template(this.model.toJSON()));
				return this;
			}
		});


	});