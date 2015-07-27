(function () {
    'use strict';

    angular
	.module('PACTT.layout.controllers')
	.controller('NavbarController', NavbarController);

    NavbarController.$inject = ['$scope', 'Authentication'];


    function NavbarController($scope, Authentication) {
	var vm = this;
	
	vm.logout = logout;


	$scope.$on('subheader', function(event, subtitle) {
	    vm.subheader = ' | ' + subtitle;
	});

	$scope.$on('subheader.toggle', function(event, content) {
	    if(content) {
		vm.subheader = vm.subheader + ' | ' + content;
	    } else {
		vm.subheader = vm.subheader.slice(0, vm.subheader.lastIndexOf('|') - 1);
	    }
	});


	function logout() {
	    Authentication.logout();
	}
    }
})();
