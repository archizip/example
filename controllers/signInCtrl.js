app.controller('signInCtrl',['$scope','$controller','APIFactory','$uibModal','$window', function($scope,$controller,APIFactory,$uibModal,$window) {

		$controller('defaultCtrl', {$scope:$scope});

		$scope.signIn = function(email,pass){
			var signInData = {
				email: email,
				password: pass
			}

			APIFactory.postURL('/signin',signInData).then(function(response){
				console.log(response);
				$scope.userSignIn.$setValidity("check", true);
				$window.location.href = '/profile';
			},function(reason){
				console.log(reason.data.success);
				$scope.userSignIn.$setValidity("check", false);
			});
		};

		$scope.signUp = function(email,pass,c_pass){
			var signUpData = {
				email: email,
				password: pass,
				password_confirm:c_pass,
			}

			APIFactory.postURL('/signup',signUpData).then(function(response){
				console.log(response);
				$scope.confirmModal();
			},function(reason){
				console.log(reason.data.success);
			});
		};

		$scope.confirmModal = function(){

			var modalInstance = $uibModal.open({
				size:'md',
				templateUrl: '/assets/ui/templates/registration.confirm.modal.html',
				controller: 'confirmModalCtrl',
				scope:$scope
			});

			modalInstance.result.then(function () {
				$window.location.href = '/signup/about';
    		}, function () {
      		$log.info('Modal dismissed at: ' + new Date());
    		});
		}
}]);

app.controller('confirmModalCtrl', ['$scope', '$uibModalInstance',
    function($scope, $uibModalInstance) {

        $scope.close = function() {
            $uibModalInstance.close();
        };
    }
]);

app.directive('recordAvailabilityValidator',
  ['APIFactory', function( APIFactory ) {

  return {
    require : 'ngModel',
    link : function(scope, element, attrs, ngModel) {

      function setAsLoading(bool) {
        ngModel.$setValidity('recordLoading', !bool); 
      }

      function setAsAvailable(bool) {
        ngModel.$setValidity('recordAvailable', bool); 
      }

      ngModel.$parsers.push(function(value) {
        if(!value || value.length == 0) return;
        setAsLoading(true);
        setAsAvailable(false);
        var field = attrs.name;
        console.log(scope);
        APIFactory.getURL('/oapi/user/unique/' + field + '/' + value).then(function(response){
        	setAsLoading(false);
            setAsAvailable(true);
        },function(reason){
        	setAsLoading(false);
            setAsAvailable(false);
        });

        return value;
      })
    }
  }

}]);