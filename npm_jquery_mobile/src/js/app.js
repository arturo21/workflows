angular
	.module('sistematdc', [
		'ngRoute',
		'ngSanitize',
		'ngCookies',
		'ngAnimate',
		'ngMaterial',
		'ngMyFunctions',
		'ngMySession',
		'ngFileUpload'
	])
	
	.config(configNg)
	// .component('systemLogin', {
		// templateUrl: 'pages/home.html',
		// controller: homeCtrl,
	    // controllerAs: 'home',
	    // bindToController: true
	// })
	
	.controller('homeCtrl',homeFunction)
	
	function configNg($routeProvider,$mdThemingProvider){
			$routeProvider
			.when('/',{
				templateUrl	: 'index.html',
				controller: 'homeCtrl'
			})
			.otherwise({
				redirectTo : '/'
			});
			$mdThemingProvider.theme('default')
			.primaryPalette('light-blue')
			.accentPalette('blue')
			.warnPalette('red')
	}
	
	function homeFunction($scope,$mdDialog,session,$http){
		//Así evitamos recargar el Scope//
		var self=this;
		self.nombre="Arturo";
		//////////////////////////////////
	}