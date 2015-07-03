(function (){
    'use strict';
    
    angular
	.module('PACTT.planner.controllers')
	.controller('PlannerController', PlannerController);

    PlannerController.$inject = ['$scope', '$routeParams','Authentication', 'Events',
				 'TestPhases', 'Snackbar', 'ngDialog'];

    
    function PlannerController($scope, $routeParams, Authentication, Events, TestPhases,
			       Snackbar, ngDialog) {
	var vm = this;

	vm.isAuthenticated = Authentication.isAuthenticated();
	vm.event = undefined;
	vm.test_phases = [];
	$scope.event_id = $routeParams.event_id;

	vm.openDialog = openDialog;

	activate();

	function openDialog() {
	    ngDialog.open({
		template: '/static/templates/planner/new-test-phase.html',
		controller: 'NewTestPhaseController as vm',
		scope: $scope
	    });
	}


	function activate() {
	    var event_id = $scope.event_id;
	    console.log("[DEBUG] inside PlannerController:activate(), event_id = " + event_id);

	    Events.get(event_id).then(eventsSuccessFn, errorFn);
	    TestPhases.get(event_id).then(test_phasesSuccessFn, errorFn);

	    
	    function eventsSuccessFn(data, status, headers, config) {
		vm.event = data.data;
	    }

	    function test_phasesSuccessFn(data, status, headers, config) {
		vm.test_phases = data.data;
	    }

	    function errorFn(data, status, headers, config) {
		Snackbar.error(data.data.error);
	    }
	}
    }
})();
