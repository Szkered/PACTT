(function (){
    'use strict';
    
    angular
	.module('PACTT.planner.controllers')
	.controller('PlannerController', PlannerController);

    PlannerController.$inject = ['$scope', '$routeParams','Authentication', 'Events',
				 'TestPhases', 'Snackbar', 'ngDialog', '$rootScope'];

    
    function PlannerController($scope, $routeParams, Authentication, Events, TestPhases,
			       Snackbar, ngDialog, $rootScope) {
	var vm = this;

	vm.isAuthenticated = Authentication.isAuthenticated;
	vm.event = undefined;
	vm.test_phases = [];
	$scope.event_id = $routeParams.event_id;

	vm.openAddDialog = openAddDialog;


	activate();

	function openAddDialog() {
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
	    
	    $scope.$on('test-phase.created', function (event, test_phase) {
		vm.test_phases.unshift(test_phase);
	    });

	    $scope.$on('test-phase.created.error', function (event, test_phase) {
		vm.test_phases.shift();
	    });

	    $scope.$on('test-phase.deleted', function (event, test_phase) {
		var i = vm.test_phases.indexOf(test_phase);
		vm.test_phases.splice(i, 1);
	    });

	    
	    function eventsSuccessFn(data, status, headers, config) {
		vm.event = data.data;
		$rootScope.$broadcast('title', vm.event.description + ' - ' + vm.event.date);
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
