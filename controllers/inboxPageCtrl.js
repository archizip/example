app.controller('inboxPageCtrl', 

	function($scope, $controller, APIFactory) {
	    
	    "use strict";

	    $scope.inboxUsers = $scope.inboxUsers || [];
	    $scope.listDiv = $('.pm-lists-inner');
	    $scope.notFound = $('#nothing-found');

	    $controller('defaultCtrl', {$scope:$scope});

	    angular.element(document).ready(function () {
        	$scope.load();
	    });


	    $scope.go = function(e, to) {
	    	e.preventDefault();
	    	
	    	window.location = 'im#!?to=' + to;	

	    	return;
	    };
	    

	    /**
	     * Load im list
	     */
	    $scope.load = function(){
	    	
	    	$scope.inboxUsers = [];

	    	var url = '/api/user/im?list=true';

	    	APIFactory.getURL(url).then(function(arrItems){
		       $scope.inboxUsers = arrItems;
		    });
	    	
			$scope.hideLoader();
			$scope.showList();
	    };


	    /**
	     * Search im by the user
	     */
	    $scope.searchIm = function(e, val){

	    	$scope.notFound.hide();

	    	if (val && val.length > 1){

		    	$scope.hideList();
		    	$scope.notFound.hide();
	    		$scope.showLoader();
				
				$scope.inboxUsers = [];

				var url = '/api/user/im?list=true&nickname=' + val;

				APIFactory.getURL(url).then(function(arrItems){
			    
			       	$scope.inboxUsers = arrItems;
			       	
					$scope.showList();
			    
			    }, function(response) {
			    	$scope.notFound.show();
			  	});

			  	$scope.hideLoader();

	    	}

	    	if(val.length < 1){
	    		$scope.load();
	    	}
	    };


	    $scope.showLoader = function(){
	    	$('#loader').show();
	    };


	    $scope.hideLoader = function(){
	    	$('#loader').hide();
	    }; 

	    $scope.hideList = function(){
	    	$scope.listDiv.hide();
	    };

	     $scope.showList = function(){
	    	$scope.listDiv.fadeIn();
	    };

	}

).directive('listimWidget', function(){
	return {
		restrict: "E",
    	replace: true,
		templateUrl: '/assets/ui/templates/listimWidget.html'
	};
});