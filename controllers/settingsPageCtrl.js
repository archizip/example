app.controller('settingsPageCtrl', ['$scope','$http','$controller', 'Upload', 'APIFactory','$uibModal','$filter',
	
	function($scope,$http,$controller,Upload, APIFactory, $uibModal,$filter) {
		"use strict";
		
		$scope.user;
		$scope.pageData = [];
		$scope.loaded = false;
		$scope.settingsDefault = [];
		$scope.settingsDefault.preferences = [];
		$scope.settingsDefault.gender;
		$scope.userInfo = [];
		$scope.userInfo.gender;
		$scope.defaultSettingsURL = '/api/user/settings/default';
		$scope.appearanceSettingsURL = '/api/user/settings/appearance';

		$controller('defaultCtrl', {$scope:$scope});

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
  		

		angular.element(document).ready(function () {

			$scope.pageData = tassi.pageData;
			$scope.pref = $scope.user.fields[$scope.getFieldType($scope.pageData.fields['ui.user:preferences'])];
			$scope.prefId = [];
			for (var i in $scope.pref){
				$scope.prefId.push($scope.pref[i].id);
			}

			$scope.$apply();
		});

		
		/**
		 * File upload
		 */
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

		$scope.updateUserField = function(field, name){
			$scope.user[field] = name; 
		};

		$scope.setParam = function(name, value){
			$scope.settingsDefault[name] = value;
			console.log($scope.settingsDefault);
		}; 

		$scope.saveInfo = function(){
			console.log($scope.user);

			var arr = [];

			for (var i in $scope.pageData.fields['ui.user:preferences']) {
				if ($scope.prefId.indexOf($scope.pageData.fields['ui.user:preferences'][i].id) > -1) {
					arr.push($scope.pageData.fields['ui.user:preferences'][i]);
				};
			};
			
			$scope.user.fields[$scope.getFieldType($scope.pageData.fields['ui.user:preferences'])] = arr;
			$scope.user.birthday = Date.parse($scope.user.birthday);
			
			console.log($scope.user.birthday);
			
			APIFactory.putURL($scope.defaultSettingsURL, $scope.user).then(function(response){
				$scope.openSaveModal();
			},function(reason){
				
			});
		};

		$scope.saveAppearance = function(){
			APIFactory.putURL($scope.appearanceSettingsURL, $scope.user).then(function(response){
				$scope.openSaveModal();
				console.log($scope.user);
			},function(reason){
				console.log(reason);
			});
		};

		$scope.getFieldType = function(fields){
			if(fields){
				return fields[0].type;
			}
		};

		$scope.tagsLoad = function(query){
			return $http.get('/oapi/tag?name=' + query);
    	};
		
		$scope.bodyTagsLoad = function(query){
			return $http.get('/oapi/bodytag?name=' + query);
    	};

    	$scope.cityLoad = function(query){
			return $http.get('/oapi/city?q=' + query);
    	};
    	   	
		$scope.tagAdding = function(tag) {
			if (tag.id == undefined) {		
				$scope.user.tags.push({text: tag.text, id: null});
				$scope.user.tags.splice($scope.user.tags.indexOf(tag), 1); 
			};
		};

		$scope.cityAdding = function(tag) {	
			$scope.user.city_id=tag.id;
			$scope.user.country_id=tag.country_id;
			$scope.user.location=tag.city;
		};

		$scope.cityDelete= function() {	
			$scope.user.city_id="";
			$scope.user.country_id="";
			$scope.user.location="";
		};

		$scope.openSaveModal = function() {

			var modalInstance = $uibModal.open({
				size:'sm',
				controller:'saveModalCtrl',
				templateUrl:'/assets/ui/templates/save.modal.html'
			});
		};
    	
		$scope.location = [$scope.user.geo];

  		$scope.$watch('location', function(newValue,oldValue) {
  			if ($scope.location == 1) {
  					$('.city-set-tags .input').hide();
  				};

  			if ($scope.location.length <= 0) {
  					$('.city-set-tags .input').show();
  				};
  		},true);

		//tabs local storage
        
        $scope.setActiveTab = function(index){
            localStorage.setItem("indexSet", index);
        };
             
        $scope.getIndex = function(){
            return localStorage.getItem("indexSet");
        };
        
        $scope.isActiveTab = function(index){
            var activeIndex = $scope.getIndex();
           return ( activeIndex == index || ( activeIndex === null && index === 0 ));
        };

	}


]).run(function($rootScope) {
	$rootScope.pageData = tassi.pageData;
});

app.controller('saveModalCtrl', ['$scope', '$uibModalInstance','$timeout',

    function($scope, $uibModalInstance, $timeout) {

    	    $timeout(function() {
            $uibModalInstance.dismiss('cancel');
        },1000);
    }
]);