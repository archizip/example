app.controller('profileEditCtrl', ['$scope', '$controller','$timeout','Upload', 'APIFactory',

	function($scope, $controller,$timeout,Upload, APIFactory) {
	    
	    "use strict";


        $scope.profileData = [];

        // newly created comments
        $scope.comments = [];
        
        // active album
        $scope.active = [];
        
        $scope.userFeed = [];
        
        // new feed input text
        $scope.feedText = null;

        // Fields to show
        $scope.profileTabFields = [5,6,7];
        
        var feedURL = 'api/user/feed';

        $controller('defaultCtrl', {$scope:$scope});

        angular.element(document).ready(function () {
           $scope.loadFeed(); 

           // console.log($scope.user);

        });


        // Load user feed
        $scope.loadFeed = function(limit, page){
            APIFactory.getURL(feedURL).then(function(arrItems){
               $scope.userFeed = arrItems;
            });
        };

        // Add feed
        $scope.addFeed = function(){
            var data = {id: $scope.profile.id, text: $scope.feedText};
            
            $scope.feedText = '';
            
            APIFactory.postURL(feedURL, data).then(function(arrItems){
               $scope.userFeed.unshift(arrItems);
            });
        };

        // Remove feed
        $scope.removeFeed = function(feedID, commentID){
            
            APIFactory.deleteURL('/api/user/feed/' + feedID).then(function(response){
                var index = $scope.userFeed.map(function(e) { return e.id; }).indexOf(parseInt(feedID));

                if (index > -1){
                    $scope.userFeed.splice(index, 1);
                }
            });
        };

        // Comment feed
        $scope.addComment = function($event, feedID){
            if ($event){
                $event.preventDefault();
            }

            var data = {comment: $scope.comments[feedID]};
            $scope.comments[feedID] = null;

            APIFactory.postURL(feedURL + '/' + feedID + '/comment', data).then(function(arrItems){
                console.log(arrItems);
                var index = $scope.userFeed.map(function(e) { return e.id; }).indexOf(parseInt(feedID));

                if (index > -1){
                    $scope.userFeed[index].comments = $scope.userFeed[index].comments || [];
                    $scope.userFeed[index].comments.unshift(arrItems);
                }
            });
        };

        // Remove comment
        $scope.removeComment = function(feedID, commentID){
            
            APIFactory.deleteURL('/api/user/feed/' + feedID + '/comment/' + commentID).then(function(response){
                var index = $scope.userFeed.map(function(e) { return e.id; }).indexOf(parseInt(feedID));

                if (index > -1){
                    var commentIndex = $scope.userFeed[index].comments.map(function(e) { return e.id; }).indexOf(parseInt(commentID));
                    
                    if (commentIndex > -1){
                        $scope.userFeed[index].comments.splice(commentIndex, 1);
                    }
                }
            });
        };


	    $scope.update = function(field, value){
	    	
            console.info(field);
            console.info(value);
	    	// $scope.user[field] = value;
	    };

        $scope.updatePhoto = function(photo){
            $scope.user.photoBig = photo;
        };

	    /**
         * File upload
         */
        
        // Avatar
    $scope.upload = function (files) {
        if(files){
        Upload.upload({
            url: '/user/image',
            file: files
        }).then(function (response) {
            console.log(response);
            var d = new Date();
            $scope.user.photoBig=response.data.photoBig+"?_=" + d.getTime();
            $scope.user.photoMediumSecond=response.data.photoMediumSecond+"?_=" + d.getTime();
            $scope.user.photoMediumThird=response.data.photoMediumThird+"?_=" + d.getTime();
        });
    }
    };

        // Album image
        $scope.uploadAlbumPhoto = function (files, activeAlbumID) {

            if (files && activeAlbumID){
                var file = files.shift();
                
                if (file){
                    Upload.upload({
                        url: '/api/user/album/' + activeAlbumID + "/photos",
                        file: file
                    }).progress(function (evt) {
                        
                    }).success(function (response) {
                        console.log(response);
                       // $scope.loadAlbum();
                    });  
                }
            }
            return;
        };

        $scope.deleteFriend = function(findex){
            $scope.user.friends.splice(findex,1);
        };
        
        //tabs local storage
        
        $scope.setActiveTab = function(index){
            console.log(index);
            localStorage.setItem("index", index);
        };
             
        $scope.getIndex = function(){
            return localStorage.getItem("index");
        };
        
        $scope.isActiveTab = function(index){
            var activeIndex = $scope.getIndex();
            console.log(activeIndex);
            console.log(index);
           return ( activeIndex == index );
        };
	}

]).run(function($rootScope, APIFactory) {
    $rootScope.user = tassi.user;
    $rootScope.profile = tassi.profile;
    $rootScope.profileData = tassi.profileData;
});
