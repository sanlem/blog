angular.module('blog', [
  'ui.router',
  'ngResource',
  'blogControllers',
  'blogResources',
  'blogDirectives',
  'ngCookies',
  'ngSanitize',
  'ngRoute',
])
    .config(function ($interpolateProvider, $httpProvider, $resourceProvider, $stateProvider, $urlRouterProvider) {
    // Force angular to use square brackets for template tag
    // The alternative is using {% verbatim %}
    $interpolateProvider.startSymbol('[[').endSymbol(']]');

    // CSRF Support
    $httpProvider.defaults.xsrfCookieName = 'csrftoken';
    $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';

    // This only works in angular 3!
    // It makes dealing with Django slashes at the end of everything easier.
    $resourceProvider.defaults.stripTrailingSlashes = false;

    //routing
    $urlRouterProvider.otherwise('/');
    $stateProvider
      .state('posts-list', {
        url: '/',
        templateUrl: 'static/partials/posts.html',
        controller: 'PostsCtrl',
        resolve: {
          authenticated: ['djangoAuth', function(djangoAuth){
            return djangoAuth.authenticationStatus();
          }],
        }
      })
      .state('posts-new', {
      	url: '/new_post',
      	templateUrl: 'static/partials/new_post.html',
        resolve: {
          authenticated: ['djangoAuth', function(djangoAuth){
            return djangoAuth.authenticationStatus();
          }],
        }
      })
      .state('posts-retrieve', {
        url: '/post/:id',
        templateUrl: 'static/partials/retrieve.html',
        controller: function($scope, $stateParams, Post){
          $scope.post = Post.get({id: $stateParams.id})
        },
        resolve: {
          authenticated: ['djangoAuth', function(djangoAuth){
            return djangoAuth.authenticationStatus();
          }],
        }
      })
});