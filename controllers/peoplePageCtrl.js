app.controller('peoplePageCtrl', function($scope, $controller, $uibModal) {
	    
	    "use strict";

	    var filterForm = $('#people-filter');
	    var resultMessage = $('#result-message');
	    var resultBlock = $('#mini-list');
	    var filterURL = '/api/user/search';

	    $controller('filterCtrl', {$scope:$scope});
	    $controller('defaultCtrl', {$scope:$scope});

	    $scope.usersArray = [];
	    $scope.page = 0;

	    angular.element(document).ready(function () {
	    	$scope.filter(countLimit());
	    	$scope.$apply();
	    });

	    /**
	     * Filter people on the main page
	     * @param  int limit 
	     * @param  int page  
	     */
	    
	    $scope.filter = function(limit, page, keepArray) {
	    	$scope.setAges();

	    	if (limit){
	    		$scope.searchParams.limit = limit;
	    	}

    		if (page){
	    		$scope.searchParams.page = page;
	    	}

			var queryData = $scope.makeQueryURL($scope.searchParams);
			console.log(queryData);
    		$.ajax({
			  	url: filterURL,
			  	data: queryData,
			  	success: function(result){
					resultMessage.hide();
					
					$(resultBlock).fadeOut(50);

					if (! keepArray){
	        			$scope.usersArray = [];
					}
	        		
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
				}
			});
	    };

	    function countLimit() {
	    	return 15;//Math.floor(resultBlock.width() / userItemWidth) * Math.floor(resultBlock.height() / userItemWidth); 	
	    }

	    $scope.loadMore = function() {

	    	if ($scope.usersArray>0) {
	    		var last = $scope.usersArray[$scope.usersArray.length - 1];
    			var length = $scope.usersArray.length;
    			console.log($scope.usersArray);
    			for(var i = 1; i <= 8; i++) {
      			$scope.usersArray.push(last + i);
	    	};

    	}
  };

	}

).directive('searchWidget', function(){
	return {
		restrict: "E",
    	replace: true,
		templateUrl: '/assets/ui/templates/searchWidget.html'
	};
});
