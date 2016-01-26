app.controller('filterCtrl', 

	function($scope, $rootScope, $http, APIFactory, $controller,$uibModal) {
	    
	    "use strict";

	    var filterForm = $('#people-filter');
	    var resultBlock = $('#mini-list');
	    var resultMessage = $('#result-message');
	    var filterURL = '/user/filter';

	    $controller('defaultCtrl', {$scope:$scope});

	    $scope.searchData;
	    $scope.searchParams = [];
	    $scope.searchParams.ages = [];
	    $scope.searchParams.preferences = [];
	    $scope.searchParams.gender = [2,3];
	    $scope.searchParams.cities = [];
	    $scope.usersArray = [];
	    $scope.userPopup = [];

	    $scope.searchData.gender = [
	        {id: 1,icon:'m',imgsize:'imgw25',text: 'Мужчина'},
	        {id: 2,icon:'f',imgsize:'imgw19',text: 'Женщина'},
	        {id: 3,icon:'mf',imgsize:'imgw40',text: 'Пара'}
	    ];

	    angular.element(document).ready(function () {
	    	$scope.$apply();
	    });

	    /**
	     * Add class to the preferences in the filter
	     * @param  object event
	     */
	    $scope.addClass = function(event) {
	    	
	    	if ($(event.target).is("label")){

		    	var item = $("#" + event.currentTarget.id);

		    	if (item.hasClass('active')){
		    		item.removeClass('active')
		    	}else{
		    		item.addClass('active')
		    	}
	    	}

	    };

	    /**
	     * Set ages data to the scope
	     */
	    $scope.setAges = function() {
	    	$scope.searchParams.ages = [];
	    	$scope.searchParams.ages.push(parseInt($("#tooltip_max .tooltip-inner").text()));
	    	$scope.searchParams.ages.push(parseInt($("#tooltip_min .tooltip-inner").text()));
	    }; 

	    /**
	     * Load popup info
	     */
	    $scope.profilePopup = function(userIndex) {
	    	console.log($scope.usersArray);
	    	console.log(userIndex);
            var profilePopupModal = $uibModal.open({
                size: 'lg',
                templateUrl: '/assets/ui/templates/profilePopup.html',
                controller: 'profilePopupCtrl',
                scope: $scope,
                resolve: {
                	 index: function() {
                        return userIndex;
                    }
                }
            });

        }; 


	    $scope.addPop = function(data){
	    	$scope.userPopup = data;
	    };

	    /**
	     * Set ages data to the scope
	     */
	    $scope.addCities = function() {
    		$scope.searchParams.cities = [];
    		$scope.searchParams.cities.push(parseInt($('#search-city').val()));
	    };

	    function countLimit() {
	    	return Math.floor(resultBlock.width() / userItemWidth); 	
	    }

	}

).run(function($rootScope) {
    $rootScope.searchData = tassi.searchData;
}).directive('searchWidget', function(){
	return {
		restrict: "E",
    	replace: true,
		templateUrl: '/assets/ui/templates/searchWidget.html'
	};
});
app.controller('profilePopupCtrl', ['$scope', '$uibModalInstance','index',

    function($scope, $uibModalInstance,index) {

    	$scope.userPopup = $scope.usersArray[index];
    	console.log($scope.userPopup);
        $scope.close = function() {
            $uibModalInstance.close();
        };
    }
]);
