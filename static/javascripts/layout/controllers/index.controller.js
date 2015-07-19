(function () {
    'use strict';

    angular
	.module('PACTT.layout.controllers')
	.controller('IndexController', IndexController);

    IndexController.$inject = [
	'$rootScope', '$scope', 'Authentication', 'Snackbar', 'Events'
    ];


    function IndexController($rootScope, $scope, Authentication, Snackbar, Events) {
	var vm = this;

	vm.isAuthenticated = Authentication.isAuthenticated();
	vm.events = [];

	activate();

	
	function activate() {
	    $rootScope.$broadcast('subheader', 'MEPC');
	    
	    Events.all().then(eventsSuccessFn, errorFn);

	    function eventsSuccessFn(data, status, headers, config) {
		vm.events = data.data;
	    }

	    function errorFn(data, status, headers, config) {
		Snackbar.error(data.error);
	    }
	}
    }
})();
