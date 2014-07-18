define(['jquery', './mediator'], function ($, mediator) {

	mediator.subscribe('timer:record', function (recordId, time) {
		console.log('event record catched',recordId,  time);
		localStorage.setItem('record_' + recordId, time);
	});


	mediator.subscribe('timer:reset', function () {
		console.log('timer:reset event catched');
		localStorage.clear();
	});
});