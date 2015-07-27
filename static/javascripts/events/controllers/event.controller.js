(function (){
    'use strict';
    
    angular
	.module('PACTT.events.controllers')
	.controller('EventController', EventController);

    EventController.$inject = ['$scope', '$location', 'Authentication', 'ngDialog'];

    
    function EventController($scope, $location, Authentication, ngDialog) {
	var vm = this;

	vm.redirect = redirect;
	vm.isAuthenticated = Authentication.isAuthenticated();
	vm.lob = null;
	if(vm.isAuthenticated) {
	    vm.lob = Authentication.getAuthenticatedAccount().lob;
	}

	var event_date = new Date($scope.event.date),
	    now = new Date();
	
	if(now < event_date) {
	    $scope.url = 'planner';
	    vm.button = 'Plan';
	    vm.btn = 'btn-primary';
	} else if(now.toDateString() === event_date.toDateString()) {
	    if(vm.lob === 'P') {
		$scope.url = 'executor';
		vm.button = 'Check-in';
		vm.btn = 'btn-success';
	    } else {
		$scope.url = 'tracker'
		vm.button = 'Track';
		vm.btn = 'btn-success';
	    }
	} else {
	    $scope.url = 'tracker';
	    vm.button = 'Review';
	    vm.btn = 'btn-primary';
	}
	
	function redirect() {
	    if(vm.button === 'Check-in') {
		ngDialog.open({
		    template: '/static/templates/layout/check-in.html',
		    controller: 'CheckInController as vm',
		    scope: $scope
		});
	    } else {
		$location.url('/' + $scope.url +  '/' + $scope.event.id);		
	    }
	}
    }
})();
