// Retaining information variables
var chatMessages = [];
var users = 0;

// Socket.io logic
module.exports = function(io) {

	// Once a client connects to the server
	io.on('connection', function(socket) {

		// Listener for when a client enters the chatroom
		socket.on('entered', function(data) {
			users++;

			// notifies all sockets connected to the server
			io.emit('newUserCount', { count: users });
			io.emit('updatedChats', { msgs: chatMessages });
		});

		// Listener for when a client disconnects the chatroom
		socket.on('disconnect', function() {
			users--;
			io.emit('newUserCount', { count: users });
		});

		// Listener for when a client submits a new chat message
		socket.on('newChatMessage', function(data) {
			chatMessages.push(data);
			io.emit('updatedChats', { msgs: chatMessages });
		});

	});

	return;
}
