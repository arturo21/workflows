angular
	.module('ngMySession', [
		'ngSanitize',
		'ngAnimate',
		'ngAria',
		'ngMaterial',
	])
	.factory('sesProv', $essionProv)
	$essionProv.$inject=['$http','$mdDialog','$window','$location','$cookies'];
	function $essionProv($http,$mdDialog,$window,$location,$cookies){
		var i;
		var valores;
		var res;
		var logusr;
		var infoerr;
		var respuesta;
		var respajax;
		var objresp;
		var idperfil;
		var objfunctions;
		i=0;
		respajax=[{}];
		respuestaArr=[];
		objresp={
			idusuario: '',
		    usuario: '',
		    nombre: '',
		    cargo: '',
		    apellido: '',
		    nomperfil: '',
		    permisos: [{}],
		    idperfil: '',
		    facebook: '',
		    twitter: '',
		    instagram: '',
		    linkedin: '',
		    conectado: false,
		    pregunta: '',
		    msjerror: ''
		};
	    objfunctions={
	    	log:log,
	    	info:info,
	    	warn:warn,
	    	error:error,
	    	debug:debug,
	    	savelocal:localSave,
	    	getlocal:localGet,
	    	savesession:sessionSave,
	    	getsession:sessionGet,
	    	savecook:cookSave,
	    	getcook:cookGet,
	    	getinfo:getInfoUser,
	    	getcargo:getCargo,
	    	login:LogIn
	    };
	    return objfunctions;
	    
		function log(cadena) {
	        console.log(cadena);
	        return 0;
		}
		function info(cadena) {
	        console.info(cadena);
	        return 0;
		}
		function debug(cadena) {
	        console.debug(cadena);
	        return 0;
		}
		function warn(cadena) {
	        console.warn(cadena);
	        return 0;
		}
		function error(cadena) {
	        console.error(cadena);
	        return 0;
		}
		function cookSave(nombre,value){
			$cookies.put(nombre,value);
	    	return 0;
	  	}
		function localSave(nombre,value){
			$window.localStorage.setItem(nombre,value);
	    	return 0;
	  	}
	    function localGet(nombre){
	    	return $window.localStorage.getItem(nombre);
	    }
	    function cookGet(nombre){
	    	return $cookies.get(nombre);
	    }
	    function localRm(nombre){
			$window.localStorage.removeItem(nombre);
	    	return 0;
	    }
	    function cookRm(nombre){
			$cookies.remove(nombre);
	    	return 0;
	    }
	    function localRmAll(){
			$window.localStorage.clear();
	    	return 0;
	    };
	    function cookRmAll(){
			angular.forEach($cookies, function (v, k) {
				$cookies.remove(k);
			});
	    	return 0;
	    };
	    function sessionSave(nombre,value){
			$window.sessionStorage.setItem(nombre,value);
	    	return 0;
	    };
	    function sessionGet(nombre){
	    	return $window.localStorage.getItem(nombre);
	    };
	    function sessionRm(nombre){
			$window.sessionStorage.removeItem(nombre);
	    	return 0;
	    };
		function encriptar(value){
			var result;
			result = btoa(value);
	    	return result;
	  };
	    function objfunctions(value){
			var result;
			result = atob(value);
	    	return result;
	    };
	    function getInfoUser(){
	    	RestoreData();
	    	return objresp;
	    };
	    function SignOut(){
	    	localRmAll();
	    	$window.location.reload();
	    };
	    function estaConectado(){
	    	conectadoses=localGet('conectado');
	    	if(conectadoses!=null){
	    		return 0;
	    	}
	    	else{
	    		return null;
	    	}
	    };
	    function getCargo(){
	    	cargo=localGet('cargo');
	    	if(cargo!=null){
	    		return cargo;
	    	}
	    	else{
	    		return null;
	    	}
	    };
	    function LogEstaConectado(){
	    	conectadoses=localGet('conectado');
	    	if(conectadoses!=null){
	    		log("Usuario conectado: " + localGet("usuario"));
	    	}
	    	else{
	    		log("Usuario NO esta conectado!");
	    	}
	    };
		function RestoreData(){
	    	var conectadoses;
	    	LogEstaConectado();
	    	conectadoses=estaConectado();
	    	if(conectadoses!=null || conectadoses!=false){
	    		objresp["usrcref"]=localGet("usrcref");
		    	objresp["idusuario"]=localGet("idusuario");
		    	objresp["idperfil"]=localGet("idperfil");
		    	objresp["nomperfil"]=localGet("nomperfil");
		    	objresp["usuario"]=localGet("usuario");
		    	objresp["nombre"]=localGet("nombre");
		    	objresp["apellido"]=localGet("apellido");
		    	objresp["cargo"]=localGet("cargo");
		    	objresp["email"]=localGet("email");
		    	objresp["activado"]=localGet("activado");
		    	objresp["primeravez"]=localGet("primeravez");
		    	objresp["celular"]=localGet("celular");
		    	objresp["whatsapp"]=localGet("whatsapp");
		    	objresp["skype"]=localGet("skype");
	            objresp["conectado"]=localGet("conectado");
	            objresp["facebook"]=localGet("facebook");
				objresp["twitter"]=localGet("twitter");
				objresp["instagram"]=localGet("instagram");
				objresp["linkedin"]=localGet("linkedin");
				objresp["pregunta"]=localGet("pregunta");
	    	}
	    	return 0;
	    }
		function LogIn(usuario,clave,ev){
			var inf;
			var respuesta;
			var datosr;
			var arrusuario;
			inf={};
			respuesta={};
			datosr={};
			arrusuario={};
			inf=getInfoUser();
			$http.post('socket.php', { metodo:'LoginUsr',usr:usuario,pass:clave}).then(function(objdata, status, headers, config){
				console.log("DATOS USUARIO JSON");
				console.log(objdata.status);
				console.log(objdata.data);
				console.log("*************************");
				console.log("*************************ARRUSUARIO");
				console.log(objdata.data);
				if(objdata=="inactiva"){
					$mdDialog.show(
					      $mdDialog.alert()
					        .parent(angular.element(document.querySelector('body')))
					        .clickOutsideToClose(true)
					        .title('Clave Vencida')
					        .textContent('La clave ingresada esta Vencida. Contacte al administrador.')
					        .ariaLabel('Alert Inactiva Clave')
					        .ok('Aceptar')
					        .targetEvent(ev)
					    );
				}
				else{
					respuesta=objdata.data;
					if(parseInt(respuesta[0].activado)==1){
						localSave("idusuario",respuesta[0].idusu);
						localSave("usrcref",respuesta[0].usrcref);
						localSave("idperfil",respuesta[0].idperfil);
						localSave("nomperfil",respuesta[0].nomperfil);
						localSave("usuario",respuesta[0].usuario);
						localSave("email",respuesta[0].email);
						localSave("nombre",respuesta[0].nombre);
						localSave("cargo",respuesta[0].cargo);
						localSave("celular",respuesta[0].celular);
						localSave("whatsapp",respuesta[0].whatsapp);
						localSave("skype",respuesta[0].skype);
						localSave("facebook",respuesta[0].facebook);
						localSave("twitter",respuesta[0].twitter);
						localSave("instagram",respuesta[0].instagram);
						localSave("linkedin",respuesta[0].linkedin);
						localSave("apellido",respuesta[0].apellido);
						localSave("conectado",respuesta[0].conectado);
						localSave("activado",respuesta[0].activado);
				    	localSave("primeravez",respuesta[0].primeravez);
				    	localSave("pregunta",respuesta[0].pregunta);
		                $location.url("/");
					}
					else{
					    $mdDialog.show(
					      $mdDialog.alert()
					        .parent(angular.element(document.querySelector('body')))
					        .clickOutsideToClose(true)
					        .title('Usuario incorrecto!')
					        .textContent('Si el error persiste, comuniquese con el administrador.')
					        .ariaLabel('Alert Validar Usuario')
					        .ok('Aceptar')
					        .targetEvent(ev)
					    );
					}
				}
	        }).catch(function(data, status){
				console.log("DATA ERROR" + data + status);
				console.log("DATA");
				console.log(data);
				console.log("STATUS");
				console.log(status);
	        });
	  };
		function Refresh(ev){
			var conectadoses;
			var inf;
			conectadoses=localGet('conectado');
			inf=getInfoUser();
			if(conectadoses!=null || conectadoses!=false){
				$http.post('socket.php', { metodo:'LoginUsrRefresh',idusuario:inf.idusuario,idvalidar:inf.usrcref})
					.then(function(data, status, headers, config){
						respuesta=data;
						console.log(data);
						if(data=="inactiva"){
							$mdDialog.show(
							      $mdDialog.alert()
							        .parent(angular.element(document.querySelector('body')))
							        .clickOutsideToClose(true)
							        .title('Clave Vencida')
							        .textContent('La clave ingresada esta Vencida. Contacte al administrador.')
							        .ariaLabel('Alert Inactiva Clave')
							        .ok('Aceptar')
							        .targetEvent(ev)
							    );
						}
						else{
							if(respuesta[0].activado=="1"){
								localSave("idusuario",respuesta[0].idusu);
								localSave("usrcref",respuesta[0].usrcref);
								localSave("idperfil",respuesta[0].idperfil);
								localSave("nomperfil",respuesta[0].nomperfil);
								localSave("usuario",respuesta[0].usuario);
								localSave("email",respuesta[0].email);
								localSave("nombre",respuesta[0].nombre);
								localSave("cargo",respuesta[0].cargo);
								localSave("celular",respuesta[0].celular);
								localSave("whatsapp",respuesta[0].whatsapp);
								localSave("skype",respuesta[0].skype);
								localSave("facebook",respuesta[0].facebook);
								localSave("twitter",respuesta[0].twitter);
								localSave("instagram",respuesta[0].instagram);
								localSave("linkedin",respuesta[0].linkedin);
								localSave("apellido",respuesta[0].apellido);
								localSave("conectado",respuesta[0].conectado);
								localSave("activado",respuesta[0].activado);
						    	localSave("primeravez",respuesta[0].primeravez);
						    	localSave("pregunta",respuesta[0].pregunta);
				                $window.location.reload();
							}
							else{
							    $mdDialog.show(
							      $mdDialog.alert()
							        .parent(angular.element(document.querySelector('body')))
							        .clickOutsideToClose(true)
							        .title('Usuario no validado')
							        .textContent('Revise su bandeja de correo.')
							        .ariaLabel('Alert Validar Usuario')
							        .ok('Aceptar')
							        .targetEvent(ev)
							    );
							}
						}
		        })
		        .catch(function(data, status){
					console.log("DATA ERROR" + data);
		        });
			}
	  };
	};