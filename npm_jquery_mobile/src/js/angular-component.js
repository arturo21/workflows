angular
	.module('ngMainBar', [
		'ngMySession',
		'ngRoute',
		'ngSanitize',
		'ngCookies',
		'ngAnimate',
		'ngMaterial'
	])
	.component('mainToolbar', {
		templateUrl: 'pages/main_bar.html',
		controller: toolbarCtrl,
	    controllerAs: 'toolb',
	    bindToController: true
	});
	function toolbarCtrl(session,$timeout, $mdSidenav, $log){
		var self=this;
		self.titleVersionDev="6.0.0";
		self.titleSys="SysConfig";
		self.titleVersion="6";
		self.titleToolbar=self.titleSys + " " + self.titleVersion;
	    self.toggleLeft = buildDelayedToggler('left');
	    self.toggleRight = buildToggler('right');
	    self.isOpenRight = function(){
	      return $mdSidenav('right').isOpen();
	    };
		self.title='SysConfig 6';
	    self.cerrarsesion=function(){
			session.cerrarSesion();
	    };
	    self.openMenu = function($mdOpenMenu, ev){
	      originatorEv = ev;
	      $mdOpenMenu(ev);
	    };
	    self.announceClick = function(index){
	      $mdDialog.show(
	        $mdDialog.alert()
	          .title('You clicked!')
	          .content('You clicked the menu item at index ' + index)
	          .ok('Nice')
	          .targetEvent(originatorEv)
	      );
	      originatorEv = null;
		}
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
	      	console.log("Se esta abriendo el panel lateral");
	        // Component lookup should always be available since we are not using `ng-if`
	        $mdSidenav(navID)
	          .toggle()
	          .then(function () {
	            $log.debug("toggle " + navID + " is done");
	          });
	      };
	    }
	};