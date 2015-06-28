(function (){
    'use strict';
    
    angular
	.module('PACTT.profiles.controllers')
	.controller('ProfileController', ProfileController);

    ProfileController.$inject = ['$location', '$routeParams', 'Posts', 'Profile', 'Snackbar'];


    function ProfileController($location, $routeParams, Posts, Profile, Snackbar) {
	var vm = this;

	vm.profile = undefined;
	vm.posts = [];

	activate();


	function activate() {
	    var username = $routeParams.username.substr(1);

	    Profile.get(username).then(profileSucessFn, profileErrorFn);
	    Posts.get(username).then(postsSuccessFn, postsSuccessFn);

	    function profileSucessFn(data, status, headers, config) {
		vm.profile = data.data;
	    }
	    
	    function profileErrorFn(data, status, headers, config) {
		$location.url('/');
		Snackbar.error('That user does not exist.');
	    }

	    function postsSuccessFn(data, status, headers, config) {
		vm.posts = data.data;
	    }

	    function postsErrorFn(data, status, headers, config) {
		Snackbar.error(data.data.error);
	    }
	}
    }
})();
