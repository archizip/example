app.controller('signupAboutCtrl', function($scope, $controller, $http, Upload, APIFactory, $location ,$uibModal ,$filter) {
	    
	    "use strict";

     	$controller('defaultCtrl', {$scope:$scope});

	    $scope.pageData = [];
	    $scope.user.preferences = [];
	    $scope.user.gender_id = 1;
	    $scope.energy=[];
	    $scope.location = [$scope.user.geo];

	    angular.element(document).ready(function () {
			$scope.pageData = tassi.pageData;
			$scope.pref = $scope.user.fields[$scope.getFieldType($scope.pageData.fields['ui.user:preferences'])];
			$scope.prefId = [];

			for (var i in $scope.pref){
				$scope.prefId.push($scope.pref[i].id);
			}

			$scope.$apply();
		});

	   	//popup-input-date
		$scope.open1 = function() {
    		$scope.popup1.opened = true;
  		};
  		
  		$scope.open2 = function() {
    		$scope.popup2.opened = true;
  		};
		
		$scope.popup1 = {
    		opened: false
  		};

  		$scope.popup2 = {
    		opened: false
  		};
  		
	    $scope.getFieldType = function(fields){
			if(fields){
				return fields[0].type;
				console.log(fields[0].type);
			}
		};
		
		$scope.$watch('file', function () {
			$scope.upload([$scope.file]);
		});

		$scope.upload = function (files) {

			var file = files.shift();

			if (file){
				Upload.upload({
					url: '/user/image',
					file: file
				}).progress(function (evt) {

				}).success(function (data, status, headers, config) {
					var d = new Date();
					$scope.user.photoMediumFirst = data.photoMediumFirst + "?_=" + d.getTime();
				   $scope.user.photoMediumThird = data.photoMediumThird + "?_=" + d.getTime();
				   
				});  
			}

			return;
		};

		$scope.tagsLoad = function(query){
			return $http.get('/oapi/tag?name=' + query);
    	};

	    $scope.cityLoad = function(query){
			return $http.get('/oapi/city?q=' + query);
    	};

		$scope.cityAdding = function(tag) {	
			$scope.user.city_id = tag.id;
			$scope.user.country_id = tag.country_id;
			$scope.user.location = tag.city;
		}; 

		$scope.cityDelete = function() {	
			$scope.user.city_id = "";
			$scope.user.country_id = "";
			$scope.user.location = "";
		};

		$scope.tagAdding = function(tag) {
			if (tag.id == undefined) {		
				$scope.user.tags.push({text: tag.text, id: null});
				$scope.user.tags.splice($scope.user.tags.indexOf(tag), 1); 
			};
		};

		$scope.location = [];

		$scope.$watch('location', function(newVal, oldVal){

  			if ($scope.location.length == 1) {
  					$('.city-set-tags .input').hide();
  				};

  			if ($scope.location.length <= 0) {
				$('.city-set-tags .input').show();
			};
  		}, true);

    	$scope.saveAbout = function(){

    		var arr = [];

			for (var i in $scope.pageData.fields['ui.user:preferences']) {
				if ($scope.prefId.indexOf($scope.pageData.fields['ui.user:preferences'][i].id) > -1) {
					arr.push($scope.pageData.fields['ui.user:preferences'][i]);
				};
			};
			
			$scope.user.fields[$scope.getFieldType($scope.pageData.fields['ui.user:preferences'])] = arr;
			
			$scope.user.birthday = Date.parse($scope.user.birthday);
			console.log($scope.user.birthday);

			APIFactory.postURL('/signup/about',$scope.user).then(function(response){
				console.log(response);
				console.log($scope.user);
				$scope.openSaveModal();
				window.location.href = '/signup/appearance';
			},function(reason){
				console.log(reason);
				console.log($scope.user);
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