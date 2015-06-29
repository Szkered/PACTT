(function (){
    'use strict';
    
    angular
	.module('PACTT.profiles.controllers')
	.controller('ProfileSettingsController', ProfileSettingsController);

    ProfileSettingsController.$inject = [
	'$location', '$routeParams', 'Authentication', 'Profile', 'Snackbar'
    ];


    function ProfileSettingsController($location, $routeParams, Authentication, Profile, Snackbar) {
	var vm = this;
	
	vm.destory = destory;
	vm.update = update;

	activate();


	function activate() {
	    var authenticatedAccount = Authentication.getAuthenticatedAccount();
	    var sid = $routeParams.sid.substr(1);

	    if (!authenticatedAccount) {
		$location.url('/');
		Snackbar.error('You are not logged in!');
	    } else {
		console.log(authenticatedAccount.sid);
		console.log($routeParams.sid);
		console.log($routeParams.sid.substr(1));
		if (authenticatedAccount.sid !== sid) {
		    $location.url('/');
		    Snackbar.error('You are not authorized to view this page!');
		}
	    }

	    Profile.get(sid).then(profileSucessFn, profileErrorFn);

	    
	    function profileSucessFn(data, status, headers, config) {
		vm.profile = data.data;
	    }
	    
	    function profileErrorFn(data, status, headers, config) {
		$location.url('/');
		Snackbar.error('That user does not exist.');
	    }
	}

	function destory() {
	    Profile.destory(vm.profile.sid).then(profileSucessFn, profileErrorFn);
	    
	    function profileSucessFn(data, status, headers, config) {
		Authentication.unauthenticate();
		window.location = '/';

		Snackbar.show('Your account has been deleted.');
	    }
	    
	    function profileErrorFn(data, status, headers, config) {
		$location.url('/');
		Snackbar.error('That user does not exist.');
	    }
	}

	function update() {
	    Profile.update(vm.profile).then(profileSucessFn, profileErrorFn);
	    
	    function profileSucessFn(data, status, headers, config) {
		Snackbar.show('Your account has been updated.');
	    }
	    
	    function profileErrorFn(data, status, headers, config) {
		Snackbar.error(data.error);
	    }
	}

    }
})();
