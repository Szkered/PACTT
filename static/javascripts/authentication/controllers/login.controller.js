(function () {
    'use strict';

    angular
	.module('PACTT.authentication.controllers')
	.controller('LoginController', LoginController);

    LoginController.$inject = ['$location', '$scope', 'Authentication'];

    
    function LoginController($location, $scope, Authentication) {
	var vm = this;

	vm.login = login;

	activate();

	// initiation of the controller
	function activate() {
	    console.log("[INFO] activate LoginController");
	    if (Authentication.isAuthenticated()) {
		$location.url('/');
	    }
	}

	function login() {
	    Authentication.login(vm.sid, vm.password);
	}
    }
})();
