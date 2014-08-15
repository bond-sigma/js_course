define(['backbone', '../views/MainView', '../views/AddForm', '../modules/mediator'],
	function (Backbone, MainView, AddForm, Mediator) {

	var $mainContainer = 	$('#main-container');

	return Backbone.Router.extend({

		routes : {
			""    : "index",
			"add" : "add"
		},
		initialize: function () {
			this.cached = {

			};

			var self = this;

			Mediator.subscribe('edit:model', function (model) {
				self.add(model);
			});

		},
		hideOther: function () {
			for (var view in this.cached) {
				this.cached[view].$el.hide();
			}
		},
		index  : function () {
			this.hideOther();
			if (!this.cached.main) {
				this.cached.main = new MainView();
				$mainContainer.append(this.cached.main.render().$el);
			} else {
				this.cached.main.$el.show();
			}
		},
		add    : function ( model ) {

			this.hideOther();

			if (!this.cached.form) {
				var options = {};
				if (model) {
					options.model = model;
				}
				this.cached.form = new AddForm(options);
				this.cached.form.render();
				$mainContainer.append(this.cached.form.render().$el);
			} else {
				if (model) {
					this.cached.form.model = model;
					this.cached.form.render();
				}
				this.cached.form.$el.show();
			}
		}

	});

});