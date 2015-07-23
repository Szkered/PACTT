(function () {
    'use strict';

    angular
	.module('PACTT.layout.controllers')
	.controller('NavbarController', NavbarController);

    NavbarController.$inject = ['$scope', 'Authentication'];


    function NavbarController($scope, Authentication) {
	var vm = this;
	
	vm.logout = logout;
	vm.subheader_base = ' ';


	$scope.$on('subheader', function(event, subtitle) {
	    vm.subheader = ' | ' + subtitle;
	    vm.subheader_base = vm.subheader;
	});

	$scope.$on('subheader.toggle', function(event, show_all) {
	    if(show_all) {
		vm.subheader = vm.subheader_base;
	    } else {
		vm.subheader = vm.subheader_base + ' | My assigned app';
	    }
	});


	function logout() {
	    Authentication.logout();
	}
    }
})();
