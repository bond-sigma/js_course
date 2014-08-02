socket.onopen = function() {
};

socket.onclose = function(event) {
	if (event.wasClean) {
	} else {

	}
};

socket.onmessage = function(event) {
	alert( event.data);
};

socket.onerror = function(error) {
	alert(error.message);
};
