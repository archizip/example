app.controller('guestProfileCtrl', ['$scope', '$controller','$timeout','Upload', 'APIFactory','$uibModal',

    function($scope, $controller,$timeout,Upload, APIFactory, $uibModal) {
        
        "use strict";

        $scope.profileData = [];

        // newly created comments
        $scope.comments = [];
        
        $scope.profileFeed = [];
        
        // new feed input text
        $scope.feedText = null;

        // Fields to show
        $scope.profileTabFields = [5,6,7];
        
        var feedURL = 'api/user/feed';

        $controller('defaultCtrl', {$scope:$scope});

        angular.element(document).ready(function () {
            console.log($scope.profile);

           $scope.profileFeed = tassi.profileFeed; 
        });
          

        $scope.getGenderSymbol = function(){
            
            switch($scope.user.gender){
                case 1:
                    return 'fe';
                break;

                case 2:
                    return 'm';
                break;
            }

        };

        // Add feed
        $scope.addFeed = function(){
            var data = {id: $scope.profile.id, text: $scope.feedText};
            
            $scope.feedText = '';
            
            APIFactory.postURL(feedURL, data).then(function(arrItems){
               $scope.profileFeed.unshift(arrItems);
            });
        };


        // Remove feed
        $scope.removeFeed = function(feedID, commentID){
            
            APIFactory.deleteURL('/api/user/feed/' + feedID).then(function(response){
                var index = $scope.profileFeed.map(function(e) { return e.id; }).indexOf(parseInt(feedID));

                if (index > -1){
                    $scope.profileFeed.splice(index, 1);
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
                var index = $scope.profileFeed.map(function(e) { return e.id; }).indexOf(parseInt(feedID));

                if (index > -1){
                    $scope.profileFeed[index].comments = $scope.profileFeed[index].comments || [];
                    $scope.profileFeed[index].comments.unshift(arrItems);
                }
            });
        };

        // Remove comment
        $scope.removeComment = function(feedID, commentID){
            
            APIFactory.deleteURL('/api/user/feed/' + feedID + '/comment/' + commentID).then(function(response){
                var index = $scope.profileFeed.map(function(e) { return e.id; }).indexOf(parseInt(feedID));

                if (index > -1){
                    var commentIndex = $scope.profileFeed[index].comments.map(function(e) { return e.id; }).indexOf(parseInt(commentID));
                    
                    if (commentIndex > -1){
                        $scope.profileFeed[index].comments.splice(commentIndex, 1);
                    }
                }
            });
        };


        $scope.update = function(field, value){
            
            console.info(field);
            console.info(value);
            // $scope.user[field] = value;
        };

        $scope.feedOwner = function(id){
            return parseInt(id) == $scope.user.id;
        };

        $scope.getStatusField = function(id, field){
            field = field ? field : 'icon';

            for (var i in $scope.pageData.fields['ui.user:activity']){
                if (id == $scope.pageData.fields['ui.user:activity'][i].id){
                    return $scope.pageData.fields['ui.user:activity'][i][field];
                }
            }
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
                    var d = new Date();
                    $scope.user.photoBig=response.data.photoBig + "?_=" + d.getTime();
                    $scope.user.photoMediumSecond=response.data.photoMediumSecond + "?_=" + d.getTime();
                    $scope.user.photoMediumThird=response.data.photoMediumThird + "?_=" + d.getTime();
                });
            }
        };

        // Album image
        $scope.uploadAlbumPhoto = function (files, albumID) {

            if (files && albumID){
                var file = files.shift();
                
                if (file){
                    Upload.upload({
                        url: '/api/user/album/' + albumID + "/photos",
                        file: file
                    }).progress(function (evt) {
                        
                    }).success(function (response) {
                        console.log(response);
                    });  
                }
            }
            return;
        };
        $scope.showGuestAlbum = function(index) {
            var showGuestAlbumModal = $uibModal.open({
                size: 'lg',
                templateUrl: '/assets/ui/templates/guest.album.photo.html',
                controller: 'guestPhotosCtrl',
                scope: $scope,
                resolve: {
                    index: function() {
                        return index;
                    }
                }
            });
        };

        $scope.guestSinglePhoto = function(photoIndex) {
            console.log(photoIndex);
            var guestSinglePhotoModal = $uibModal.open({
                size: 'lg',
                templateUrl: '/assets/ui/templates/guest.album.full.photo.html',
                controller: 'guestSinglePhoto',
                scope: $scope,
                resolve: {
                    photoIndex: function() {
                        return photoIndex;
                    }
                }
            });
        };

        //tabs local storage
        
        $scope.setActiveTab = function(index){
            localStorage.setItem("indexGuest", index);
        };
             
        $scope.getIndex = function(){
            return localStorage.getItem("indexGuest");
        };
        
        $scope.isActiveTab = function(index){
            var activeIndex = $scope.getIndex();
           return ( activeIndex == index || ( activeIndex === null && index === 0 ));
        };

        $scope.showAll = function() {

            var guestAlbumAllModal = $uibModal.open({
                size: 'lg',
                templateUrl: '/assets/ui/templates/guest.all.album.html',
                controller: 'guestAlbumAllCtrl',
                scope: $scope,
                resolve: {
                }
            });

        };

    }

]).run(function($rootScope, APIFactory) {
    $rootScope.profile = tassi.profile;
    $rootScope.profileData = tassi.profileData;
});

app.controller('guestAlbumAllCtrl', ['$scope', '$uibModalInstance',

    function($scope, $uibModalInstance) {

        $scope.close = function() {
          $uibModalInstance.close();
        };
    }
]);

app.controller('guestPhotosCtrl', ['$scope', '$uibModalInstance','index',
    function($scope, $uibModalInstance,index) {

        $scope.album = $scope.profile.albums[index];

        if ($scope.profile.albums[index].photos) {

            var coverCount = $scope.profile.albums[index].photos.length;
            console.log(coverCount);

            if (coverCount > 0) {
                $scope.lastImg = $scope.profile.albums[index].photos[coverCount - 1];
                angular.forEach($scope.lastImg,function(value,key){
                    
                    if (value.size=="120x120") {

                        $scope.lastCover = value;
                    };
                });
            };
        };

        $scope.dismiss = function() {
            $uibModalInstance.dismiss();
        };

        $scope.close = function(){
            $uibModalInstance.close();
        };
    }
]);

app.controller('guestSinglePhoto', ['$scope', '$uibModalInstance','photoIndex','APIFactory',
    
    function($scope, $uibModalInstance, photoIndex, APIFactory) {

        $scope.photoIndex = photoIndex;
        $scope.fullImg = [];
        $scope.photoComment=[];
        $scope.userComm='';
    
        angular.forEach($scope.album.photos,function(value,key){
            angular.forEach(value,function(fimg){
                if (!fimg.size) {
                    this.push(fimg);
                };
            },$scope.fullImg);
        });

        $scope.addPhotoComment = function(text) {
            var postData = {text:text};
            APIFactory.postURL('api/user/album/'+ $scope.album.id + '/photo/' + $scope.fullImg[$scope.photoIndex].uid +'/comments',postData).then(function(response){
                $scope.photoComment.push(response);
                console.log(response);
                $scope.commLen = $scope.photoComment.length;
            });

        };

        $scope.next = function() {
            $scope.photoIndex = ($scope.photoIndex < $scope.fullImg.length - 1) ? ++$scope.photoIndex : 0;
        };
    
        $scope.prev = function() {
            $scope.photoIndex = ($scope.photoIndex > 0) ? --$scope.photoIndex : $scope.fullImg.length - 1;
        };
    
        $scope.$watch("photoIndex", function() {
            $scope.limit = commLim;
            $scope.getPhotoComment();
        });
    
        $scope.getPhotoComment = function() {
            APIFactory.getURL('api/user/album/'+ $scope.album.id + '/photo/' + $scope.fullImg[$scope.photoIndex].uid +'/comments').then(function(response){
            $scope.photoComment=response.data;
            $scope.commLen = $scope.photoComment.length;
        },function(reason){
            console.log(reason);
            $scope.photoComment=[];
            $scope.commLen = $scope.photoComment.length;
        });
        };

        var commLim = 5;
        $scope.limit = commLim;
    
        $scope.commLimit = function() {
            $scope.limit += commLim;
        };
    
        $scope.dismiss = function() {
            $uibModalInstance.dismiss();
        };
    
        $scope.close = function(){
            $uibModalInstance.close();
        };
        }
]); 