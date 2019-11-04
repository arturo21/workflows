angular
	.module('artedition', [])
	.directive('artedition',[ckEditorDirective])
	function ckEditorDirective(){
		return {
	        require:'?ngModel',
	        link: function (scope, elm, attr, ngModel) {
	        	ck=ClassicEditor.create(elm[0]);
	            if (!ngModel) return;
	            ck.on('instanceReady', function () {
	                ck.setData(ngModel.$viewValue);
	            });
	            function updateModel() {
	                scope.$apply(function () {
	                	ngModel.$setViewValue(ck.getData());
	            	});
	        	}
		        ck.on('change', updateModel);
		        ck.on('key', updateModel);
		        ck.on('dataReady', updateModel);
	
		        ngModel.$render = function (value) {
		            ck.setData(ngModel.$viewValue);
		        };
			}
		};
	}