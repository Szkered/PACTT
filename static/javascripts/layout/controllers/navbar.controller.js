(function () {
    'use strict';

    angular
	.module('PACTT.layout.controllers')
	.controller('NavbarController', NavbarController);

    NavbarController.$inject = ['$scope', 'Authentication'];


    function NavbarController($scope, Authentication) {
	var vm = this;
	
	vm.logout = logout;
	vm.subheader = ' ';

	activate();
	

	function activate() {

	    $scope.$on('subheader', function(event, subtitle) {
	    	vm.subheader = ' | ' + subtitle;
	    });
	}

	function logout() {
	    Authentication.logout();
	}
    }
})();
