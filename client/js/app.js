angular.module('socketIO', [
	'ui.router',
	'socketIO.controllers'
])
.config(function($stateProvider, $urlRouterProvider) {

	$stateProvider
	.state('main', {
		url: '/main',
		controller: 'mainController',
		templateUrl: 'templates/main.html'
	});

	$urlRouterProvider.otherwise('/main');
});

angular.module('socketIO.controllers', []);
