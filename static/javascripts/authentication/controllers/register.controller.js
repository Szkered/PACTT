(function () {
    'use strict';

    angular
	.module('PACTT.authentication.controllers')
	.controller('RegisterController', RegisterController);

    RegisterController.$inject = ['$location', '$scope', 'Authentication'];


    function RegisterController($location, $scope, Authentication) {
	var vm = this;

	vm.register = register;

	activate();


	function activate() {
	    console.log("[INFO] activate registerController");
	    if (Authentication.isAuthenticated()) {
		$location.url('/');
	    }
	}

	function register() {
	    Authentication.register(vm.sid, vm.password, vm.username);
	}
    }
})();
