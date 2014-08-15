define(['backbone'], function (Backbone) {
	return Backbone.Model.extend({
		urlRoot    : '/todo',
		idAttribute: '_id',
		defaults : {
			done       : false,
			text       : '',
			createDate : null,
			_id: null
		}
	});
});