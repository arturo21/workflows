angular
	.module('metasistema', [
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
	/*SideNav*/
	.controller('AppCtrl', SidenavFunction)
	.controller('LeftCtrl', LeftCtrlFunction)
	.controller('RightCtrl', RightCtrlFunction)
	/*Fin SideNav*/
	function configNg($routeProvider,$mdThemingProvider){
			$routeProvider
			.when('/',{
				templateUrl	: 'public/index.html',
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

  function SidenavFunction($scope, $timeout, $mdSidenav, $log) {
    $scope.toggleLeft = buildDelayedToggler('left');
    $scope.toggleRight = buildToggler('right');
    $scope.isOpenRight = function(){
      return $mdSidenav('right').isOpen();
    };

    /**
     * Supplies a function that will continue to operate until the
     * time is up.
     */
    function debounce(func, wait, context) {
      var timer;

      return function debounced() {
        var context = $scope,
            args = Array.prototype.slice.call(arguments);
        $timeout.cancel(timer);
        timer = $timeout(function() {
          timer = undefined;
          func.apply(context, args);
        }, wait || 10);
      };
    }

    /**
     * Build handler to open/close a SideNav; when animation finishes
     * report completion in console
     */
    function buildDelayedToggler(navID) {
      return debounce(function() {
        // Component lookup should always be available since we are not using `ng-if`
        $mdSidenav(navID)
          .toggle()
          .then(function () {
            $log.debug("toggle " + navID + " is done");
          });
      }, 200);
    }

    function buildToggler(navID) {
      return function() {
        // Component lookup should always be available since we are not using `ng-if`
        $mdSidenav(navID)
          .toggle()
          .then(function () {
            $log.debug("toggle " + navID + " is done");
          });
      };
    }
  }
	function LeftCtrlFunction($scope, $timeout, $mdSidenav, $log) {
    	$scope.close = function () {
      	// Component lookup should always be available since we are not using `ng-if`
      	$mdSidenav('left').close()
        .then(function () {
          $log.debug("close LEFT is done");
        });
    };
  }
  function RightCtrlFunction($scope, $timeout, $mdSidenav, $log) {
    $scope.close = function () {
      // Component lookup should always be available since we are not using `ng-if`
      $mdSidenav('right').close()
        .then(function () {
          $log.debug("close RIGHT is done");
        });
    };
  }