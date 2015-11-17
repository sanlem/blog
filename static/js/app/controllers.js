angular.module('blogControllers', ['ui.router'])
    .controller('PostsCtrl', function($scope, $state, Post){
    	$scope.posts = [];
    	Post.query(function(data){
    		$scope.posts = data;
    	});
        $scope.postSaveError = null;
    	$scope.addPost = function(title, text){
    		var post = new Post({title: title, text: text});
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
                },function(data){
                    // error case
                    $scope.errors = data;
                });
            }
        }
    })
    .controller('LoginCtrl', function ($scope, $location, djangoAuth, Validate) {
        $scope.model = {'username':'','password':''};
        $scope.complete = false;
        $scope.login = function(formData){
            $scope.errors = [];
            $scope.isAuthenticated = [];
            Validate.form_validation(formData,$scope.errors);
            if(!formData.$invalid){
                djangoAuth.login($scope.model.username, $scope.model.password)
                    .then(function(data){
                    // success case
                    $location.path("/");
                    },function(data){
                    // error case
                    $scope.errors = data;
                    });
            }
        }
    })
    
    .controller('LogoutCtrl', function ($scope, $location, djangoAuth) {
        djangoAuth.logout();
        //$state.go('posts-list');
        $location.path("/");
    })

    .controller('AuthStatusCtrl', function ($rootScope, djangoAuth) {
        $rootScope.authenticared = false;
        $rootScope.user = null;
        
        $rootScope.$on("djangoAuth.logged_in", function(event, args){
            $rootScope.user = args.username;
            $rootScope.authenticated = true;
        });
        
        $rootScope.$on("djangoAuth.logged_out", function(data){
            $rootScope.user = null;
            $rootScope.authenticated = false;
        });
    });