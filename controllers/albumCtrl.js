app.controller('albumCtrl', ['$scope', '$controller', '$timeout', 'Upload', 'APIFactory', '$uibModal', '$log', '$modalStack',

    function($scope, $controller, $timeout, Upload, APIFactory, $uibModal, $log, $modalStack) {

        "use strict";

        // all user albums
        $scope.userAlbums = [];

        $scope.availableOptions = [{
            id: 1,
            name: 'Все пользователи',
            visible: 'unlocked-album'
        }, {
            id: 2,
            name: 'Только друзья',
            visible: 'locked-album'
        }];

        $controller('defaultCtrl', {
            $scope: $scope
        });

        /**
         * Load albums
         */
        $scope.loadAlbums = function() {
            APIFactory.getURL('api/user/album').then(function(response) {
                $scope.userAlbums = response.data;
                console.log($scope.userAlbums);
            });
        };

        /**
         * Show album
         * @param  Integer index
         */
        $scope.showAlbum = function(index) {

            var albumPhotosModal = $uibModal.open({
                size: 'lg',
                templateUrl: '/assets/ui/templates/album.photos.modal.html',
                controller: 'albumPhotosCtrl',
                scope: $scope,
                resolve: {
                    index: function() {
                        return index;
                    }
                }
            });

        };

        //show all album
        $scope.showAll = function() {

            var albumShowAllModal = $uibModal.open({
                size: 'lg',
                templateUrl: '/assets/ui/templates/album.all-album.modal.html',
                controller: 'albumShowAllCtrl',
                scope: $scope,
                resolve: {
                }
            });

        };
        /**
         * Add album
         */
        $scope.addAlbum = function() {
            var album = {
                name: '',
                description: '',
                permissions: 1
            };
            var addModal = $uibModal.open({
                size: 'md',
                templateUrl: '/assets/ui/templates/album.add.modal.html',
                controller: 'albumAddCtrl',
                resolve: {
                    album: function() {
                        return album;
                    }
                }
            });

            addModal.result.then(function(album) {
                console.log(album);
                var data = {
                    name: album.name,
                    permissions: album.permissions,
                    description: album.description
                };
                console.log(data);
                APIFactory.postURL('/api/user/album', data).then(function(response) {
                    $scope.userAlbums.push(response);
                    console.log($scope.userAlbums);
                });

            }, function() {
                $log.info('Modal dismissed at: ' + new Date());
            });
        };
        /**
         * Change album
         */
        $scope.changeAlbum = function(albumIndex, id) {

            console.log(albumIndex);
            console.log(id);
            var changeAlbumModal = $uibModal.open({
                size: 'md',
                templateUrl: '/assets/ui/templates/album.change.modal.html',
                controller: 'albumChangeCtrl',
                scope: $scope,
                resolve: {
                    albumIndex: function() {
                        return albumIndex;
                    },
                    albumId: function() {
                        return id;
                    }
                }
            });

            changeAlbumModal.result.then(function() {

            }, function() {
                $log.info('Modal dismissed at: ' + new Date());
            });
        };
        /**
         * Delete album
         */
        $scope.deleteAlbum = function() {
            var deleteAlbumModal = $uibModal.open({
                size: 'sm',
                templateUrl: 'assets/ui/templates/album.delete.modal.html',
                controller: 'albumDeleteCtrl',
                scope: $scope,
                resolve: {

                }
            });

            deleteAlbumModal.result.then(function(albumId) {}, function() {
                $log.info('Modal dismissed at: ' + new Date());
            });

        };
        /**
         * Open and show selected photo
         * @param  Integer albumIndex
         * @param  Integer photoIndex
         */
        $scope.openPhoto = function(photoIndex) {

            var singlePhotoModal = $uibModal.open({
                size: 'lg',
                templateUrl: '/assets/ui/templates/album.single.photo.modal.html',
                controller: 'singlePhotoCtrl',
                scope: $scope,
                resolve: {
                    photoIndex: function() {
                        return photoIndex;
                    }
                }
            });

        }
    }

]);
/**
 * Add new album
 */
app.controller('albumAddCtrl', ['$scope', '$uibModalInstance', 'album',

    function($scope, $uibModalInstance, album) {

        console.log(album);
        $scope.album = album;

        $scope.save = function() {
            $uibModalInstance.close($scope.album);
        };
    }
]);

//show all album
app.controller('albumShowAllCtrl', ['$scope', '$uibModalInstance',

    function($scope, $uibModalInstance) {

        $scope.close = function() {
          $uibModalInstance.close();
        };
    }
]);

/**
 * Change album
 */
app.controller('albumChangeCtrl', ['$scope', '$uibModalInstance', 'albumIndex', 'albumId', 'APIFactory',

    function($scope, $uibModalInstance, albumIndex, albumId, APIFactory) {

        $scope.albumId = albumId;

        if ($scope.userAlbums[albumIndex].photos) {

            var coverCount = $scope.userAlbums[albumIndex].photos.length;
            console.log(coverCount);

            if (coverCount > 0) {
                $scope.lastCover = $scope.userAlbums[albumIndex].photos[coverCount - 1][1];
                console.log($scope.lastCover);
            };
        };

        $scope.changeName = $scope.userAlbums[albumIndex].name;
        $scope.changeDescription = $scope.userAlbums[albumIndex].description;
        $scope.changePermission = $scope.userAlbums[albumIndex].permissions;

        $scope.save = function(changeName, changeDescription, changePermission) {

            var data = {
                name: changeName,
                description: changeDescription,
                permissions: changePermission
            };

            APIFactory.putURL('/api/user/album/' + albumId, data).then(function(response) {

                console.log(response);

                if (albumIndex > -1) {
                    $scope.userAlbums[albumIndex] = response;
                }

            });
        };

        $scope.delete = function() {

            APIFactory.deleteURL('/api/user/album/' + albumId).then(function(response) {

                console.log(response);

                if (albumIndex > -1) {
                    $scope.userAlbums.splice(albumIndex, 1);
                }

            });

            $uibModalInstance.close();
        };
    }
]);
/**
 * Delete album
 */
app.controller('albumDeleteCtrl', ['$scope', '$uibModalInstance',
    function($scope, $uibModalInstance) {

        $scope.checkDelete = function(id) {
            if (id = $scope.albumId) {
                $scope.delete();
                $uibModalInstance.close();
            };
        };
        $scope.dismiss = function() {
            $uibModalInstance.dismiss();
        };
    }
]);
/**
 * Album view
 * @param  {[type]} $scope
 * @param  {[type]} $uibModalInstance
 * @param  {[type]} item
 * @param  {[type]} index
 * @return {[type]}
 */
app.controller('albumPhotosCtrl', function($scope, $uibModalInstance, index, Upload) {

    $scope.album = $scope.userAlbums[index];
    //close modal
    $scope.close = function() {
        $uibModalInstance.close();
    };

    if ($scope.userAlbums[index].photos) {

            var coverCount = $scope.userAlbums[index].photos.length;
            console.log(coverCount);

            if (coverCount > 0) {
                $scope.lastCover = $scope.userAlbums[index].photos[coverCount - 1][1];
                console.log($scope.lastCover);
            };
        };
    $scope.uploadAlbumPhoto = function(files) {

        if (files) {
            var file = files.shift();
            if (file) {
                Upload.upload({
                    url: '/api/user/album/' + $scope.userAlbums[index].id + "/photos",
                    file: file
                }).progress(function(evt) {}).success(function(response) {
                    console.log(response);
                    if (index > -1 && $scope.userAlbums[index].photos) {
                        $scope.userAlbums[index].photos.push(response);
                    }
                    else{
                        console.log( $scope.userAlbums[index]);
                        
                    }
                });
            }
        }

        return;

    };


    $scope.deletePhoto = function(photoIndex, event) {

        event.preventDefault();
        event.stopPropagation();

        if (photoIndex >= 0) {
            $scope.album.photos.splice(photoIndex, 1);
        };
    };
});

/**
 * Single photo view
 * @param  {[type]} $scope
 * @param  {[type]} $uibModalInstance
 * @param  {[type]} item
 * @param  {[type]} index
 * @return {[type]}
 */
app.controller('singlePhotoCtrl', function($scope, $uibModalInstance, photoIndex,APIFactory) {

    // photo index
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
       
        console.log( $scope.userComment);
        APIFactory.postURL('api/user/album/'+ $scope.album.id + '/photo/' + $scope.fullImg[$scope.photoIndex].uid +'/comments',postData).then(function(response){
        $scope.photoComment.push(response);
        $scope.commLen = $scope.photoComment.length;
        $scope.userComment = null;
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

    //close modal
    $scope.close = function() {
        $uibModalInstance.close();
    };
});

