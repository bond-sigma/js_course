define(['jquery', './mediator'], function ($, mediator) {

	var UI = (function () {

		var $mainHolder = $('#timer-value');
		var $listHolder = $('#list-holder');
		var intervalId = null;
		var recordId   = 1;
		//var startTime =

		function start_timer(sec, block, direction) {
			var time = sec;
			direction = direction || false;

			var hour = parseInt(time / 3600);
			if (hour < 1) {
				hour = 0;
			}
			time = parseInt(time - hour * 3600);
			if (hour < 10) {
				hour = '0' + hour;
			}

			var minutes = parseInt(time / 60);
			if (minutes < 1) {
				minutes = 0;
			}
			time = parseInt(time - minutes * 60);
			if (minutes < 10) {
				minutes = '0' + minutes;
			}

			var seconds = time;
			if (seconds < 10) {
				seconds = '0' + seconds;
			}

			block.innerHTML = hour + ':' + minutes + ':' + seconds;

			if (direction) {
				sec++;

				intervalId = setTimeout(function () {
					start_timer(sec, block, direction);
				}, 1000);
			}
		}

		$('#start-btn').on('click', function () {
			mediator.publish('timer:started');
			start_timer(0, $mainHolder[0], 1);
		});

		$('#reset-btn').on('click', function () {
			mediator.publish('timer:reset');
			clearTimeout(intervalId);
			$mainHolder.html('00:00:00');
			$listHolder.html('');
			recordId = 1;
		});

		$('#record-btn').on('click', function () {
			var time = $mainHolder.html();
			var record = prompt('Enter record ID please', (recordId));
			if (!record) {
				record = recordId;
			}
			mediator.publish('timer:record',record, time);
			$listHolder.append('<li>"' + record + '" time was ' + time + '</li>')
			recordId++;
		});

	})();

});