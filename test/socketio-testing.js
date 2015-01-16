var should    = require('should');
var server_io = require('socket.io').listen(1338);
var socketIO  = require('./../socketIO.js')(server_io);
var client_io = require('socket.io-client');

var socketURL = 'http://localhost:1338';

var options = {
	transports: ['websocket'],
	'force new connection': true
};

describe('socket.IO', function() {

	// before(function(done) {
	// 	done();
	// });
	//
	// after(function(done) {
	// 	done();
	// });

	describe('users entering & leaving rooms', function() {

		it("should notify all users in a room that a new person has joined", function(done) {
			var client1 = client_io.connect(socketURL, options);

			client1.on('connect', function(data){
				client1.emit('entered', { data: null });

				/* Since first client is connected, we connect
				the second client. */
				var client2 = client_io.connect(socketURL, options);

				client2.on('connect', function(data){
					client2.emit('entered', { data: null });
				});

				client2.on('newUserCount', function(data){
					data.count.should.equal(2);
					client2.disconnect();
					client1.disconnect();
					done();
				});

			});

		});

		it("should notify all users in a room that a new person has left", function(done) {
			var client1 = client_io.connect(socketURL, options);

			client1.on('connect', function(data){
				client1.emit('entered', { data: null });

				/* Since first client is connected, we connect
				the second client. */
				var client2 = client_io.connect(socketURL, options);

				client2.on('connect', function(data){
					client2.emit('entered', { data: null });
					client2.disconnect();
				});

				client1.on('newUserCount', function(data){
					data.count.should.equal(1);
					client1.disconnect();
					done();
				});

			});

		});

	});

	describe('users sending chat messages', function() {

		it("should notify all users in a room that a new chat message exists", function(done) {
			var client1 = client_io.connect(socketURL, options);

			client1.on('connect', function(data){

				client1.on('updatedChats', function(data) {
					data.msgs.length.should.equal(1);
					data.msgs[0].user.should.equal('justin');
					data.msgs[0].msg.should.equal('test');
					client2.disconnect();
					client1.disconnect();
					done();
				});

				/* Since first client is connected, we connect
				the second client. */
				var client2 = client_io.connect(socketURL, options);

				client2.on('connect', function(data){
					client2.emit('newChatMessage', { user: 'justin', msg: 'test'});
				});


			});

		});

	});

});