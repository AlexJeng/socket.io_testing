angular.module('socketIO.controllers')
	.controller('mainController', ['$scope', '$location', function($scope, $location) {

		$scope.current = 0;

		var socket = io.connect();

		socket.on('newUserCount', function(data) {
			$scope.$apply(function() {
				$scope.current = data.count;
			});
		});

		socket.emit('entered', { data: null });

	}]);
