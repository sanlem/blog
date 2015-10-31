angular.module('blog', [
  'ui.router',
  'ngResource',
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
      .state('posts', {
        url: '/',
        templateUrl: 'static/partials/posts.html',
      })
      .state('hello', {
      	url: '/hello',
      	templateUrl: 'static/partials/hello.html',
      })
});