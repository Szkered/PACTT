(function () {
    'use strict';

    angular
	.module('PACTT.layout.controllers')
	.controller('NavbarController', NavbarController);

    NavbarController.$inject = ['$scope', 'Authentication'];


    function NavbarController($scope, Authentication) {
	var vm = this;

	vm.logout = logout;
	vm.subtitle = 'sub';

	console.log('[DEBUG] in nav ctrl: ' + $scope.user);

	activate();
	

	function activate() {
	    // $scope.$on('title', function(event, subtitle) {
	    // 	vm.subtitle = ' | ' + subtitle;
	    // });
	}

	function logout() {
	    Authentication.logout();
	}
    }
})();
