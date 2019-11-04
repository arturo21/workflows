angular
	.module('ngLoginParaUsuarios', [
		'ngMySession',
		'ngRoute',
		'ngCookies',
		'ngMyFunctions'
	])
	.component('systemLogin', {
		templateUrl: 'pages/home.html',
		controller: LoginCtrl,
	    controllerAs: 'husr',
	    bindToController: true
	});
	function LoginCtrl(session,sys,$timeout,$mdDialog,$log,$http){
		var self=this;
		var usuario;
		var clave;
		self.usuarios={};
		self.perfiles={};
		self.modulos={};
        self.JSONperfiles;
        self.JSONmodulos;
        self.BuscarElemento=0;
		var originatorEv;
        self.errors=[];
        self.msgs=[];
        self.info=[{}];
        self.IDusuarios=[{}];
        self.usuarios=[{}];
        self.infoUsr=session.getinfo();
        self.siconectado=self.infoUsr.conectado;
        self.loginusr=function(){
			usuario=self.Newusername;
			clave=self.Newpassword;
        	session.login(usuario,clave);
    		self.info=session.getinfo();
    		console.log("Espere...");
    		session.refresh();
        }
        self.olvidoclave = function(ev){
		    $mdDialog.show({
		      controller: 'home',
		      templateUrl: 'pages/ventanadialogclave.html',
		      parent: angular.element(document.body),
		      targetEvent: ev,
		      clickOutsideToClose:true,
		      fullscreen: self.customFullscreen // Only for -xs, -sm breakpoints.
		    })
		    .then(function(answer) {
		      self.status = 'You said the information was "' + answer + '".';
		    }, function() {
		      self.status = 'You cancelled the dialog.';
		    });
		}
	    self.BuscarForm=function(){
			if(self.BuscarElemento==1){
				self.BuscarElemento--;
			}
			else{
				self.BuscarElemento++;
			}
	    };
        sys.call('usuarios',function(datausuarios){
        	self.usuarios=datausuarios;
        });
        sys.call('perfiles',function(datosperfiles){
        	self.JSONperfiles=datosperfiles;
        });
        sys.call('modulos',function(datamodulos){
        	self.JSONmodulos=datamodulos;
        });
	};