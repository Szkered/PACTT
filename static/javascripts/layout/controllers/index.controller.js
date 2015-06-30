(function () {
    'use strict';

    angular
	.module('PACTT.layout.controllers')
	.controller('IndexController', IndexController);

    IndexController.$inject = ['$scope', 'Authentication', 'Posts', 'Snackbar', 'Events'];


    function IndexController($scope, Authentication, Posts, Snackbar, Events) {
	var vm = this;

	vm.isAuthenticated = Authentication.isAuthenticated();
	vm.posts = [];
	vm.events = [];

	activate();

	
	function activate() {
	    Posts.all().then(postsSuccessFn, errorFn);
	    Events.all().then(eventsSuccessFn, errorFn);

	    $scope.$on('post.created', function (event, post) {
		vm.posts.unshift(post);
	    });

	    $scope.$on('post.created.error', function () {
		vm.posts.shift();
	    });

	    
	    function postsSuccessFn(data, status, headers, config) {
		vm.posts = data.data;
	    }

	    function eventsSuccessFn(data, status, headers, config) {
		vm.events = data.data;
	    }

	    function errorFn(data, status, headers, config) {
		Snackbar.error(data.error);
	    }
	}
    }
})();
