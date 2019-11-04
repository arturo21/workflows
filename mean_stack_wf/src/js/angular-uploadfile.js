angular
	.module('ngFileUpload', [])
	//uploader-model
	.directive('uploaderModel', ["$parse", UplModel])
	//sys-uploader
	.directive('sysUploader', ["$parse", UplSysModel])
	.service('upload', ["$http", "$q", UploadService])
	//uploader-model
	function UplModel($parse) {
		return {
			restrict: 'A',
			link: function (scope, iElement, iAttrs)
			{
				iElement.on("change", function(e){
					$parse(iAttrs.uploaderModel).assign(scope, iElement[0].files[0]);
				});
			}
		};
	}
	//sys-uploader
	function UplSysModel($parse) {
		return {
			restrict: 'A',
			link: function (scope, iElement, iAttrs)
			{
				iElement.on("change", function(e){
					$parse(iAttrs.sysUploader).assign(scope, iElement[0].files[0]);
				});
			}
		};
	}
	//upload Service Final
	function UploadService($http, $q){
		this.uploadFile = function(file, name){
			var deferred = $q.defer();
			var formData = new FormData();
			formData.append("name", name);
			formData.append("file", file);
			return $http.post("lib/subida.php", formData, {
				headers: {
					"Content-type": undefined
				},
				transformRequest: angular.identity
			})
			.then(function(res){
				deferred.resolve(res);
			})
			.catch(function(msg, code){
				deferred.reject(msg);
			})
			return deferred.promise;
		}
	}