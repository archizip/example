app.controller('mainPageCtrl', function($scope, $controller, $uibModal) {
	    
	    "use strict";

	    var filterForm = $('#people-filter');
	    var resultBlock = $('#mini-list');
	    var resultMessage = $('#result-message');
	    var filterURL = '/oapi/user/filter';

     	$controller('filterCtrl', {$scope:$scope});
     	$controller('defaultCtrl', {$scope:$scope});

	    $scope.usersArray = [];
	    $scope.mainFeed = [];

	    angular.element(document).ready(function () {
	    	$scope.filter(countLimit());
    		$scope.mainFeed = tassi.mainFeed.data;
    	    
	    	$scope.$apply();
	    });


	    $scope.redirectFilterURL = function($event){
	    	$event.preventDefault();

	    	delete $scope.searchParams.limit;
	    	var queryStr = $scope.makeQueryURL($scope.searchParams);

	    	$(location).attr('href', 'people?' + queryStr);
	    };

	    $scope.filter = function(limit, page) {
	    	$scope.setAges();

	    	if (limit){
	    		$scope.searchParams.limit = limit;
	    	}

	    	if (page){
	    		$scope.searchParams.page = page;
	    	}

	    	delete $scope.searchParams.gender;

	    	var queryData = $scope.makeQueryURL($scope.searchParams);

    		$.ajax({
			  	url: filterURL,
			  	data: queryData,
			  	success: function(result){
					resultMessage.hide();
					
					$(resultBlock).fadeOut(50);

	        		$scope.usersArray = [];
	        		
	        		for (var k in result.data){
	    				$scope.usersArray.push(result.data[k]);
	        		}
	        		
	        		$(resultBlock).fadeIn();

					$scope.$apply();
				},
			   	error: function(XMLHttpRequest, textStatus, errorThrown){
				    $(resultBlock).fadeIn();

				    $scope.usersArray = [];
			  		
			  		resultMessage.show();

					$scope.$apply();
				}
			});
	    };

	    function countLimit() {
	    	var limit = Math.floor(resultBlock.width() / userItemWidth);

	    	return limit; 	
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
