angular.module('blogDirectives', [])
    .directive('post', function(){
    	return {
    		restrict: "E",
    		templateUrl: 'static/partials/_post.html'
    	}
    })
    .directive('postPreview', function(){
    	return {
    		restrict: "E",
    		templateUrl: 'static/partials/_post-preview.html'
    	}
    });