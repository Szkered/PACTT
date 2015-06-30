(function () {
    'use strict';

    angular
	.module('PACTT.authentication.controllers')
	.controller('RegisterController', RegisterController);

    RegisterController.$inject = ['$location', '$scope', 'Authentication', 'Snackbar'];


    function RegisterController($location, $scope, Authentication, Snackbar) {
	var vm = this;

	vm.register = register;

	vm.lobTypes = [
	    {key:'G', value:'GTRM'},
	    {key:'C', value:'CIB TRM'}
	];

	activate();


	function activate() {
	    console.log("[INFO] activate registerController");
	    if (Authentication.isAuthenticated()) {
		$location.url('/');
	    }
	}

	function register() {
	    if (vm.password == vm.confirm_password) {
		Authentication.register(vm.sid, vm.password, vm.email, vm.first_name,
					vm.last_name, vm.lob.key);
	    } else {
		Snackbar.error('Passwords have to agree!');
	    }
	}
    }
})();
