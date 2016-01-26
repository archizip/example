app.controller('testsCtrl',['$scope', '$controller', 'APIFactory','$uibModal',
	function($scope, $controller, APIFactory, $uibModal){
		"use strict";

     	$controller('defaultCtrl', {$scope:$scope});

     	$scope.tests = [{
     	    id: 1,
     	    icon_path: 'icon-heart',
     	    name: 'Мужик ты или баба?',
     	    desc:'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloribus nemo provident maiores excepturi voluptas sapiente quae cupiditate blanditiis tempora maxime explicabo nihil ex sunt, laboriosam est dicta ullam expedita nobis.',
     	    energy_pass:45,
     	    test_pass:9000,
     	    icon_pref:[{
     	    	path:'assets/ui/img/icons/m.png'
     	    },
     	    {
     	    	path:'assets/ui/img/icons/f.png'
     	    },
     	    {
     	    	path:'assets/ui/img/icons/m-f.png'
     	    }
     	    ],
     	    question: [{
     	        id: 1,
     	        q_name: 'Ты баба или мужик?',
     	        q_answer:[
     	        	{
     	        		id:1,
     	        		text:'Нет',
     	        		img_path:'111',
     	        		video_path:'22222'
     	        	},
     	        	{
     	        		id:2,
						text:'Да',
						img_path:'111',
						video_path:'22222'
     	        	}
     	        ]
     	    },
     	    {
     	    	id: 2,
     	        q_name: 'Пиво любишь?',
     	        q_answer:[
     	        	{
     	        		id:1,
     	        		text:'Нет',
     	        		img_path:'111',
     	        		video_path:'22222'
     	        	},
     	        	{
     	        		id:2,
						text:'Да',
						img_path:'111',
						video_path:'22222'
     	        	}
     	        ]
     	    }
     	    ]
     	},
		{
     	    id: 2,
     	    icon_path: 'icon-lightning',
     	    name: 'Хорош ли ты в чем-то?',
     	    desc:'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi ab saepe incidunt numquam unde iusto distinctio, explicabo repellat delectus perferendis non ullam officiis rerum voluptatum eaque, eum consectetur facere. Aliquid.',
     	    energy_pass:100,
     	    test_pass:9000,
     	    icon_pref:[{
     	    	path:'assets/ui/img/icons/f-m-f.png'
     	    },
     	    {
     	    	path:'assets/ui/img/icons/m-f-m.png'
     	    },
     	    ],
     	    question: [{
     	        id: 1,
     	        q_name: 'Как дела?',
     	        q_answer:[
     	        	{
     	        		id:1,
     	        		text:'хорошо',
     	        		img_path:'111',
     	        		video_path:'22222'
     	        	},
     	        	{
     	        		id:2,
						text:'плохо',
						img_path:'111',
						video_path:'22222'
     	        	},
     	        	{
     	        		id:3,
						text:'плохо',
						img_path:'111',
						video_path:'22222'
     	        	}
     	        ]
     	    },
     	    {
     	    	id: 2,
     	        q_name: 'Пиво любишь?',
     	        q_answer:[
     	        	{
     	        		id:1,
     	        		text:'Нет',
     	        		img_path:'111',
     	        		video_path:'22222'
     	        	},
     	        	{
     	        		id:2,
						text:'Да',
						img_path:'111',
						video_path:'22222'
     	        	}
     	        ]
     	    },
     	    {
     	    	id: 3,
     	        q_name: 'Где носки?',
     	        q_answer:[
     	        	{
     	        		id:1,
     	        		text:'Нет',
     	        		img_path:'111',
     	        		video_path:'22222'
     	        	},
     	        	{
     	        		id:2,
						text:'Да',
						img_path:'111',
						video_path:'22222'
     	        	}
     	        ]
     	    }
     	    ]
     	}
     	];

     	$scope.openTestModal = function (t_index){

     		var modalInstance = $uibModal.open({
     			size:'lg',
     			scope:$scope,
     			templateUrl: '/assets/ui/templates/test.modal.html',
     			controller: 'testModalCtrl',
    			resolve: {
        			index: function () {
          			return t_index;
        			}
      			}
     		});
     	}

	}]);

app.controller('testModalCtrl', ['$scope', '$uibModalInstance','index',
    function( $scope, $uibModalInstance, index) {

    	$scope.startPos = 0;
    	$scope.index = index;
		$scope.qLen = 0;

    	angular.forEach($scope.tests[index].question, function() {
  			$scope.qLen++;
		});
    	$scope.incPos = function(){
    		$scope.startPos++;
    	}
        $scope.close = function() {
            $uibModalInstance.dismiss();
        };
    }
]);