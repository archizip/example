app.controller('signupAppearanceCtrl', function($scope, $controller, $http, Upload, APIFactory,$uibModal) {
	    
	    "use strict";

     	$controller('defaultCtrl', {$scope:$scope});
     	$scope.user;
	    $scope.pageData = [];

	    angular.element(document).ready(function () {
			$scope.pageData = tassi.pageData;
		});
	    
	    $scope.getFieldType = function(fields){
			if(fields){
				return fields[0].type;
			}
		};

		$scope.bodyTagsLoad = function(query){
			return $http.get('/oapi/bodytag?name=' + query);
    	};
    	
    	$scope.saveAppearance = function(){
			APIFactory.postURL('/signup/appearance',$scope.user).then(function(response){
				console.log($scope.user)

				console.log(response);
				$scope.openSaveModal();
				//window.location.href="/profile";
			},function(reason){
				console.log(reason);
			})
    	};

    	$scope.openSaveModal = function() {
    		
			var modalInstance = $uibModal.open({
				size:'sm',
				controller:'saveModalCtrl',
				templateUrl:'/assets/ui/templates/save.modal.html'
			});
		};

	}

).run(function($rootScope) {
    
});
app.controller('saveModalCtrl', ['$scope', '$uibModalInstance','$timeout',

    function($scope, $uibModalInstance, $timeout) {

    	    $timeout(function() {
            $uibModalInstance.dismiss('cancel');
        },1000);
    }
]);