(function (){
    'use strict';
    
    angular
	.module('PACTT.planner.controllers')
	.controller('PlannerController', PlannerController);

    PlannerController.$inject = ['$routeParams', 'Events', 'TestPhases', 'Snackbar'];

    
    function PlannerController($routeParams, Events, TestPhases, Snackbar) {
	var vm = this;

	vm.event = undefined;
	vm.test_phases = [];


	activate();


	function activate() {
	    var event_id = $routeParams.event_id;
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
