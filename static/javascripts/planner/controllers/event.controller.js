(function (){
    'use strict';
    
    angular
	.module('PACTT.planner.controllers')
	.controller('EventController', EventController);

    EventController.$inject = ['$scope', '$location', 'Authentication'];

    
    function EventController($scope, $location, Authentication) {
	var vm = this;

	// vm.isAuthenticated = Authentication.isAuthenticated();
	vm.isAuthenticated = true;
	vm.redirect = redirect;

	if(new Date() > new Date($scope.event.date)) {
	    vm.url = 'tracker'
	    vm.button = 'Track';
	    vm.btn = 'btn-success';
	} else {
	    vm.url = 'planner';
	    vm.button = 'Plan';
	    vm.btn = 'btn-primary';
	}
	
	function redirect() {
	    $location.url('/' + vm.url +  '/' + $scope.event.id);
	}
    }
})();
