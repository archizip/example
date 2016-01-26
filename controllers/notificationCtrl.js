app.controller('notificationCtrl', 

	function($scope, socket) {
	    
	    "use strict";

	    var ntf = $('#notification');

	    $scope.imCount = null;

	    angular.element(document).ready(function () {
    		
	    });

	    $scope.notifyIm = function(n) {
	    	$scope.imCount += n;
	    };

	   	// Socket listeners
	   	socket.on('message.new', function (data) {
	   		console.log('new message!!!');
			$scope.imCount++;
		});

	}

);