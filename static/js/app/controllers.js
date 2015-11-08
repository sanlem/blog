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
    })
    .controller('RegisterCtrl', function ($scope, djangoAuth, Validate) {
    $scope.model = {'username':'','password':'','email':''};
    $scope.complete = false;
    $scope.register = function(formData){
      $scope.errors = [];
      Validate.form_validation(formData,$scope.errors);
      if(!formData.$invalid){
        djangoAuth.register($scope.model.username,$scope.model.password1,$scope.model.password2,$scope.model.email)
        .then(function(data){
            alert('Registered successfull!')
            $scope.complete = true;
        },function(data){
            // error case
            $scope.errors = data;
            alert(data)
        });
      }
    }
  })
    .controller('LoginCtrl', function ($scope, $location, djangoAuth, Validate) {
    $scope.model = {'username':'','password':''};
    $scope.complete = false;
    $scope.login = function(formData){
      $scope.errors = [];
      Validate.form_validation(formData,$scope.errors);
      if(!formData.$invalid){
        djangoAuth.login($scope.model.username, $scope.model.password)
        .then(function(data){
            // success case
            alert('success!');
            $location.path("/");
        },function(data){
            // error case
            $scope.errors = data;
        });
      }
    }
  });