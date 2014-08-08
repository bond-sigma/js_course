define(['backbone'], function (Backbone) {
	return Backbone.Model.extend({
		urlRoot    : '/todo',
		idAttribute: 'id',
		defaults : {
			done       : false,
			text       : '',
			createDate : null,
			id: null
		}
	});
});