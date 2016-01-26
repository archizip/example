app.controller('defaultCtrl', 

	function($scope, APIFactory) {
			
		"use strict";

		$scope.user;
		$scope.pageData;
		$scope.translations;
		$scope.activities;
		$scope.newTopMessage;
		$scope.imCount = 0;
		$scope.energyURL = '/api/user/energy';
		$scope.userDataURL = '/api/user/me';

		angular.element(document).ready(function () {
			
		});

		//album-permissions
		$scope.availableOptions = [{
            id: 1,
            name: 'Все пользователи',
            visible: 'unlocked-album'
        }, {
            id: 2,
            name: 'Только друзья',
            visible: 'locked-album'
        }];

		$scope.getUserActivityColor = function(id){

			switch(parseInt(id)){

				case 40:
					return 'orange';
				break;

				case 41:
					return 'blue';
				break;

				case 42:
					return 'green';
				break;
			}

		};

		/**
		 * Get a translation
		 * @param  {[type]} name
		 * @param  {[type]} key 
		 * @return {[type]}     
		 */
		$scope.tr = function(name, key){

			if ($scope.translations[name]){
	
				if (key){
					return $scope.translations[name][key];
				}

				if ($scope.translations[name].value){
					return $scope.translations[name].value;
				}

				return $scope.translations[name];
			}

			return name;

		};

		$scope.getProfileUrl = function(user){

			return user.id;

		};

		$scope.goToUrl = function($event, url){
			$event.preventDefault();

			window.location = url;

			return;
		};

		$scope.getFieldData = function(key, fid, fieldName){

			fieldName = fieldName ? fieldName: 'name';

			var index = $scope.pageData.fields[key].map(function(e) 
				{ 
					return e.id; 
				})
				.indexOf(parseInt(fid));

			if (index > -1){
				return $scope.pageData.fields[key][index][fieldName];
			}

			return null;
		};
		$scope.getGenderIconName = function(gender){

			switch(parseInt(gender)){

				case 1:
					return 'fe';
				break;

				case 2:
					return 'm';
				break;

				case 3:
					return 'c';
				break;
			}

		};

		$scope.getGenderIconNameAlike = function(gender){

			switch(parseInt(gender)){

				case 1:
					return 'f';
				break;

				case 2:
					return 'm';
				break;

				case 3:
					return 'c';
				break;
			}

		};
		 
	 	$scope.getInfo = function(){
       
		};

		$scope.getFieldType = function(fields){
			if(fields){
				return fields[0].type;
			}
		};

	    /**
	     * Add Top message
	     * @return 
	     */
	    $scope.addTopMsg = function () {

	    	var permission = {for: 'top:message'};
	    	var url = $scope.energyURL + '?' + $scope.makeQueryURL(permission);

	    	if ($scope.newTopMessage){

	    		// Check energy
		    	APIFactory.getURL(url).then(function(response){
			    	if (response.status == true){
		    			var top = {
				        	message: $scope.newTopMessage,
				        	user_id: $scope.user.id,
				        	user: {
				        		photoMediumSecond: $scope.user.photoMediumSecond,
				        		nickname: $scope.user.nickname,gender_id:$scope.user.gender_id
				        	},
				        };
				        
				        $scope.pageData.topUsers.unshift(top);	
				        $scope.newTopMessage = '';
				        
				        angular.element('#topModal').modal('hide');
			    	}
			    });

	    	}else{
	    		alert('У вас недостаточно энергии или сообщение пустое!');
	    	}
	    	
	    };

  	    $scope.getGenderSymbol = function(id){
    		
    		switch(id){
				case 1:
					return 'm';
				break;

				case 2:
					return 'f';
				break;

                case 3:
                    return 'mf';
                break;

			}

	    };
	    
		$scope.makeQueryURL = function(dataArray){
	    	var queryData = '';
	    	
	    	for (var i in dataArray)
	    	{
	    		var t = {};
	    		t[i] = dataArray[i];
	    		if ($.param(t)){
	    			queryData += $.param(t) + '&';
	    		}
	    	}

	    	return queryData;
	    };

	    $scope.fromNow = function(time){
	    	return moment(time).locale('ru').fromNow();
	    };

	    $scope.timeAgo = function(time){
	    	return moment(time).locale('ru').fromNow();
	    };
	    
	}

).run(function($rootScope, APIFactory) {
	$rootScope.pageData = tassi.pageData;
	$rootScope.translations = tassi.translations;

})
.directive('topusersWidget', function(){
	return {
		restrict: "E",
    	replace: true,
    	scope: true,
		templateUrl: '/assets/ui/templates/topusersWidget.html'
	};
})
.directive('addtopmessageWidget', function(){
	return {
		restrict: "E",
    	replace: true,
    	scope: true,
		templateUrl: '/assets/ui/templates/addtopmessageWidget.html'
	};
})
.directive('friendslistWidget', function(){
	return {
		restrict: "E",
    	replace: true,
    	scope: true,
		templateUrl: '/assets/ui/templates/friendslistWidget.html'
	};
}).directive('ngEnter', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if(event.which === 13) {
                scope.$apply(function (){
                    scope.$eval(attrs.ngEnter);
                });

                event.preventDefault();
            }
        });
    };
});

app.factory('APIFactory', function ($http, $q){
    
    var factory = {};

    factory.getURL = function(url){            
        return $http.get(url).then(function(response) {
        	return response.data;
        });            
    }

    factory.postURL = function(posturl, postdata){            
        return $http.post(posturl, postdata).then(function(response) {
            return response.data;
        });            
    }

    factory.putURL = function(puturl, putdata){            
        return $http.put(puturl, putdata).then(function(response) {
            return response.data;
        });            
    } 

    factory.deleteURL = function(delUrl){            
        return $http.delete(delUrl).then(function(response) {
            return response.data;
        });            
    }

    return factory;
});


//filter for album cover
app.filter('sizeCover', function() {
    return function(img,size) {
        var filtered = [];

        angular.forEach(img,function(value,key){
            angular.forEach(value, function(simg){
                if (simg.size==size) {
                    this.push(simg);
                }
            },filtered);
        });
        return filtered;
    };
});

//img load event
app.directive('imageonload', function() {
    return {
        restrict: 'A',
        link: function($scope, element, attrs) {
            element.bind('load', function() {
                $("#loader").hide();
            });
        }
    };
});
