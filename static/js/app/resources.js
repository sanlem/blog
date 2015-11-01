angular.module('blogResources', ['ngResource'])
    .factory('Post', function($resource){
    	return $resource("/api/posts/:id");
    });