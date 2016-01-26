app.controller('searchCtrl', 

	function($scope) {
	    
	    "use strict";

	    var filterForm = $('#people-filter');
	    var resultBlock = $('#mini-list');
	    var filterURL = '/user/filter';

	    $scope.usersArray = [];

	    angular.element(document).ready(function () {
	    	
	    });

	    /**
	     * Filter people on the main page
	     * @param  int limit 
	     * @param  int page  
	     */
	    $scope.filter = function(limit, page) {

    		var data = $(filterForm).serializeArray();
    		page = page ? page : 0;

    		for (var i in data){
    			switch(data[i].name){
    				case "ages[]":

		    				data.push({name: "ages[]", value: $("#tooltip_min .tooltip-inner").text()});
		    				data.push({name: "ages[]", value: $("#tooltip_max .tooltip-inner").text()});
		    				
		    				delete data[i];

    				break;

    				case "cities":
    					data.push({name: "cities[]", value: $('#search-city').val()});
    				break;	
    			}
    			
    		}

    		data.push({name: "limit", value: limit});
    		data.push({name: "page", value: page});

	    	$.get(filterURL, data, function(result){
        		
        		$(resultBlock).fadeOut(50);

        		$scope.usersArray = [];
        		
        		for (var k in result.data){
    				$scope.usersArray.push(result.data[k]);
        		}
        		
        		$(resultBlock).fadeIn();

				$scope.$apply();
			});	

	    };

	    function countLimit() {
	    	return Math.floor(resultBlock.width() / userItemWidth); 	
	    }

	}

).directive('searchWidget', function(){
	return {
		restrict: "E",
    	replace: true,
		templateUrl: '/assets/ui/templates/searchWidget.html'
	};
});