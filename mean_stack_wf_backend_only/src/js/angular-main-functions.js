angular
	.module('ngMyFunctions', ['ngMySession'])
	.factory('sys', functionsmain)
	functionsmain.$inject=['session','$http','$mdDialog','$window','$location','$route','$cookies'];
	function functionsmain(session,$http,$mdDialog,$window,$location,$route,$cookies,$mdToast){
		self=this;
		var i;
		var res;
		var infoerr;
		var respuesta;
		var objfunctions;
		var usuarios;
		var perfiles;
		var modulos;
		var info=session.getinfo();
		i=0;
	    objfunctions={
	    	call:callWrapper
	    };
	    return objfunctions;
	    
	    function callWrapper(funcion,callback){
	    	switch(funcion){
	    		case 'modulos':
	    			callbackm=callback;
	    			getModulos(callbackm);
	    			break;
	    		case 'usuarios':
	    			callbacku=callback;
	    			getUsuarios(callbacku);
	    			break;
	    		case 'perfiles':
	    			callbackp=callback;
	    			getPerfiles(callbackp);
	    			break;
	    	}
		}

		function getUsuarios(callbku){
			$http.post('socket.php',{ metodo:'getusuariosSys', idusuario:info.usuario })
			.then(function(data){
				callbku(data.data);
			})
			.catch(function(data){
			    session.log(data.data);
			});
		}
		function getPerfiles(callbkp){
			$http.post('socket.php',{ metodo:'getPerfiles', idusuario:info.usuario })
			.then(function(data){
			    callbkp(data.data);
			})
			.catch(function(data){
				session.log(data.data);
			});
		}
		function getModulos(callbkm){
			$http.post('socket.php',{ metodo:'getModulos', idusuario:info.usuario })
			.then(function(data){
			    callbkm(data.data);
			})
			.catch(function(data){
			    session.log(data.data);
			});
		}
	};
