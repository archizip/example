app.controller('feedPageCtrl', ['$scope', '$controller', 'APIFactory',

	function ($scope, $controller, APIFactory) {
	    
	    "use strict";

     	$controller('defaultCtrl', {$scope:$scope});
     	$controller('filterCtrl', {$scope:$scope});

		var feedURL = 'api/feed';

	    $scope.feedData = [];
	    $scope.feedIDs = [];
	    $scope.commentsData = [];
	    $scope.newComments = [];
	    $scope.commentsCounts = [];
	    $scope.commentUrl = '/api/feed/#id/comment';
	    $scope.chargeUrl = '/api/user/energy/charge';
	    $scope.prefs = [];
	    $scope.noDataText = $('#no_data');

	    angular.element(document).ready(function () {

	    	$scope.filter(20, 1);

	    	$scope.$apply();
	    });

	    /**
	     * Load/filter feed
	     */
	    $scope.filter = function(limit, page) {
	    	$scope.setAges();

	    	if (limit){
	    		$scope.searchParams.limit = limit;
	    	}

    		if (page){
	    		$scope.searchParams.page = page;
	    	}

			var queryData = $scope.makeQueryURL($scope.searchParams);

	    	APIFactory.getURL(feedURL + "?" + queryData).then(function(result){

	    		$('#loader').hide();

        		if(page > 1){
        			for (var i in result.data) {
        				$scope.feedData.push(result.data[i]);
        			}
        		}else{
        			$scope.feedData = result.data;
        		}

	    	}, function(){

	    		$scope.noDataText.show();
	    		$scope.feedData = [];

	    	});
	    
	    };

	    /**
	     * Add feed message
	     * @param String 	title   
	     * @param String 	content 
	     * @param Array 	preferences
	     */
	    $scope.addFeedMessage = function(title, content, preferences){

	    	if (title && content && preferences){
	    		
	    		var key = 'feed:message';
	    		var queryData = 'key=' + key;

    			$.ajax({
				  	url: $scope.chargeUrl,
				  	type: 'POST',
				  	data: queryData,
				  	success: function(result){

			  			var messagePreferences = [];

				    	for (var p in $scope.searchData.preferences){
				  			if (preferences.indexOf($scope.searchData.preferences[p].id) > -1){
				  				messagePreferences.push($scope.searchData.preferences[p]);
				  			}
				  		}

				  		var postData = {
				  			title: title, 
				  			preferences: preferences, 
				  			content: content
				  		};

				  		APIFactory.postURL(feedURL, postData)
			  				.then(function(response){
				  			
						    	var ymd = getRawDate();

					    		var item = {
					    			id: response.id,
									title: title,
									content: content,
									preferences: messagePreferences, 
									user_id: $scope.user.id,
									date: ymd,
									likes: 0,
									views: 0,
									user: $scope.user,
									time: moment().locale('ru').fromNow(),
									date: parseInt(ymd),
									commentsCount: 0
					    		};

				    			$scope.feedData.unshift(item);

				    			angular.element('#writeMessage').modal('hide');	
				    			
				    			$scope.clearFeedAddPopup();
						    }
					    );

					},
				   	error: function(XMLHttpRequest, textStatus, errorThrown){

					    $('#need-energy').show();

					}
				});
	    	}
	    };


	    /**
	     * Add new comment
	     * @param {[type]} text   
	     * @param {[type]} feedID 
	     */
	    $scope.addComment = function (text, feedID) {
	    	
	    	var item = {
	    		user: { 
	    			nickname: $scope.user.nickname, 
	    			id: $scope.user.id, 
    			},
	    		comment: {
	    			content: text,
		    		feed_id: feedID,
		    		published: moment().locale('ru').fromNow()
		    	}
	    	};

	    	if (! $scope.commentsData[feedID]){
	    		$scope.showComments(feedID);
	    	}

    		APIFactory.postURL($scope.commentUrl.replace('#id', feedID), {content:text})
  				.then(function(response){

			    	$scope.commentsData[feedID] = $scope.commentsData[feedID] || [];
			    	$scope.commentsData[feedID].unshift(item);

			    	$scope.commentsCounts[feedID] = $scope.commentsCounts[feedID] || [];
			    	$scope.commentsCounts[feedID]++;

			    	$scope.newComments[feedID] = [];
		    	}
		    );

	    };

        $scope.changeClass = function($event){
        	var elem = $($event.currentTarget);
    		elem.toggleClass('active');

        	$event.preventDefault();
        };

        /**
         * Load comments
         * @param  {[type]} feedID 
         * @return {[type]}        
         */
	    $scope.showComments = function(feedID){

    		if (! $scope.commentsData[feedID]){
				APIFactory.getURL($scope.commentUrl.replace('#id', feedID))
	  				.then(function(response){

	  					for(var k in response.data){

	  						var it = response.data[k];

							$scope.commentsData[feedID] = $scope.commentsData[feedID] || [];
							it.comment.published = moment(it.comment.created_at).locale('ru').fromNow();
					    	$scope.commentsData[feedID].push(response.data[k]);
	  					}

	  					$scope.commentsCounts[feedID] = $scope.commentsCounts[feedID] || [];
			    		$scope.commentsCounts[feedID] += $scope.commentsData[feedID].length;

	  					if ($scope.commentsData[feedID].length == 0)
	  					{
	  						$('#listEmpty' + feedID).show();
	  					}

			    	}, function(){
					    	$('#listEmpty' + feedID).show();
					   	}
				    );		
    		}

    		$('#list' + feedID).toggle();

	    };


	    $scope.likeIt = function($event, dateIndex, dataIndex, feedID){
	    	$event.preventDefault();
			console.log($scope.feedData[dateIndex].data[dataIndex]);
    		if (dateIndex >= 0 && dataIndex >= 0){

    			$.ajax({
			  		url: '/feed/like/' + feedID,
			  		type: 'post',
			  		success: function(response){
			  			$scope.feedData[dateIndex].data[dataIndex].likes++;
			  		},
			  		error: function(){
			  			$scope.feedData[dateIndex].data[dataIndex].likes--;	  
			  		}
			  	});
    			
    		}

	    };

	    $scope.formatDay = function(day){
	    	
	    	return moment(day).locale('ru').format('dddd, D');
	    };


	    /**
	     * Clear textarea
	     */
	    $scope.clearFeedAddPopup = function(){
	    	$scope.feedAddTitle = '';
			$scope.feedAddText = '';
	    };	


	    var getRawDate = function() {
	    	
	    	var date = new Date;

	    	return date.getFullYear() + 
				'-' + ('0' + (date.getMonth()+1)).slice(-2) + 
				'-' + ('0' + date.getDate()).slice(-2)
	    }

	}

]).run(function($rootScope) {
    
    $rootScope.pageData = tassi.pageData;

}).directive('feedWidget', function(){
	return {
		restrict: "E",
    	replace: true,
		templateUrl: '/assets/ui/templates/feedWidget.html'
	};
});
