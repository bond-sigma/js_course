define(['backbone', '../views/MainView', '../views/AddForm'],
	function (Backbone, MainView, AddForm) {

	var $mainContainer = 	$('#main-container');

	return Backbone.Router.extend({

		routes : {
			""    : "index",
			"add" : "add"
		},
		initialize: function () {
			this.cached = {

			};
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
		add    : function () {
			this.hideOther();
			if (!this.cached.form) {
				this.cached.form = new AddForm();
				this.cached.form.render();
				//this.cached.form.$el.appendTo('#main-container');
				$mainContainer.append(this.cached.form.render().$el);
			} else {
				this.cached.form.$el.show();
			}
		}

	});

});