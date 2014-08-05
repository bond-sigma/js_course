define(['backbone', '../views/MainView', '../views/AddForm'],
	function (Backbone, MainView, AddForm) {

	var $mainContainer = 	$('#main-container');

	return Backbone.Router.extend({

		routes : {
			""    : "index",
			"add" : "add"
		},
		index  : function () {
			$mainContainer.html('');
			var Main = new MainView();
			$mainContainer.append(Main.render().$el);
		},
		add    : function () {
			$mainContainer.html('');
			var Form = new AddForm();
			$mainContainer.append(Form.render().$el);
		}

	});

});