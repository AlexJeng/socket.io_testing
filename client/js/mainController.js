angular.module('socketIO.controllers')
	.controller('mainController', ['$scope', '$location', function($scope, $location) {

		$scope.current = 0;
		$scope.chats = [];
		$scope.username = '';

		var socket = io.connect();

		socket.on('newUserCount', function(data) {
			$scope.$apply(function() {
				$scope.current = data.count;
			});
		});

		socket.on('updatedChats', function(data) {
			$scope.$apply(function() {
				$scope.chats = data.msgs;
			});
		});

		socket.emit('entered', { data: null });

		$scope.newChatMessage = {};

		$scope.submitMessageDisabled = function() {
			if ($scope.newChatMessage.msg === undefined || $scope.newChatMessage.msg === '') {
				return true;
			}
			return false;
		};

		$scope.submitMessage = function(message) {
			$scope.newChatMessage.msg = '';
			socket.emit('newChatMessage', { user: $scope.username, msg: message });
		};

		$scope.username = prompt('Enter your username');

	}]);
