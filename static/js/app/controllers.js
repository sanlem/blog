angular.module('blogControllers', ['ui.router'])
    .controller('PostsCtrl', function($scope, $state, Post){
    	$scope.posts = [];
    	Post.query(function(data){
    		$scope.posts = data;
    	});
        $scope.postSaveError = null;
    	$scope.addPost = function(title, text, author){
    		var post = new Post({title: title, text: text, author: author});
    		post.$save(function(){
    			$state.go('posts-list');
    		},
            function(error){
                $scope.postSaveError = error;
            });
    	};
    });