// Retaining information variables
var chatMessages = [];
var users = 0;

module.exports = function(io) {
	// Socket.io logic
	io.on('connection', function(socket) {

		socket.on('entered', function(data) {
			users++;
			io.emit('newUserCount', { count: users });
			io.emit('updatedChats', { msgs: chatMessages });
		});

		socket.on('disconnect', function() {
			users--;
			io.emit('newUserCount', { count: users });
		});

		socket.on('newChatMessage', function(data) {
			chatMessages.push(data);
			io.emit('updatedChats', { msgs: chatMessages });
		});

	});

	return;
}
