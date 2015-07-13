(function (){
    'use strict';
    
    angular
	.module('PACTT.planner.controllers')
	.controller('EventController', EventController);

    EventController.$inject = ['$scope', '$location', 'Authentication'];

    
    function EventController($scope, $location, Authentication) {
	var vm = this;

	vm.redirect = redirect;
	vm.isAuthenticated = Authentication.isAuthenticated();
	vm.lob = null;
	if(vm.isAuthenticated) {
	    vm.lob = Authentication.getAuthenticatedAccount().lob;
	}


	if(new Date() < new Date($scope.event.date)) {
	    vm.url = 'planner';
	    vm.button = 'Plan';
	    vm.btn = 'btn-primary';
	} else {
	    if(vm.lob === 'P') {
		vm.url = 'executor';
		vm.button = 'execute';
		vm.btn = 'btn-success'	
	    } else {
		vm.url = 'tracker'
		vm.button = 'Track';
		vm.btn = 'btn-success';
	    }
	}
	
	function redirect() {
	    $location.url('/' + vm.url +  '/' + $scope.event.id);
	}
    }
})();
