app.controller('signupSexualCtrl', function($scope, $controller, $http, Upload) {
	    
	    "use strict";

     	$controller('defaultCtrl', {$scope:$scope});

	    $scope.pageData = [];
	    $scope.user.preferences = [];

	    angular.element(document).ready(function () {
			$scope.pageData = tassi.pageData;
		});

	    $scope.getFieldType = function(fields){
			if(fields){
				return fields[0].type;
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

		$scope.location = [];

		$scope.$watch('location', function(newVal, oldVal){

  			if ($scope.location.length == 1) {
  					$('.city-set-tags .input').hide();
  				};

  			if ($scope.location.length <= 0) {
				$('.city-set-tags .input').show();
			};
  		}, true);

    	$scope.saveAbout = function($event){
			$event.preventDefault();

			var arr = [];
			
			for (var i in $scope.pageData.fields['ui.user:preferences']) {
				if ($scope.user.preferences.indexOf($scope.pageData.fields['ui.user:preferences'][i].id) > -1) {
					arr.push($scope.pageData.fields['ui.user:preferences'][i]);
				};
			};

			$scope.user.fields[$scope.getFieldType($scope.pageData.fields['ui.user:preferences'])] = arr;

			$.ajax({
				url: '/signup/about',
				data: $scope.user,
				type: 'post',
				success: function(response){
					window.location = '/signup/appearance';
				},
				error: function(response){
					showErrors(response);
				}
			});
    	};



	}

).run(function($rootScope) {
    
});