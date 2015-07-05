(function (){
    'use strict';

    angular
	.module('PACTT.planner.controllers')
	.controller('NewTestPhaseController', NewTestPhaseController);

    NewTestPhaseController.$inject =['$rootScope', '$scope', 'Authentication',
				     'Snackbar', 'Events', 'TestPhases'];

    
    function NewTestPhaseController($rootScope, $scope, Authentication, Snackbar,
				    Events, TestPhases) {
	var vm = this;

	vm.submit = submit;
	
	vm.lobTypes = [
	    {key:'G', value:'GTRM'},
	    {key:'C', value:'CIB TRM'}
	];

	activate();


	function activate() {
	    var event_id = $scope.event_id;
	    
	    console.log("[DEBUG] activate: event id: " + event_id);
	    Events.get(event_id).then(successFn, errorFn);

	    function successFn(data, status, headers, config) {
		vm.event = data.data;
	    }
	    
	    function errorFn(data, status, headers, config) {
		Snackbar.error('Cannot get event!');
	    }
	}
	
	function submit() {

	    $rootScope.$broadcast('test-phase.created', {
	    	description: vm.description,
	    	startTime: vm.startTime,
	    	endTime: vm.endTime,
	    	lob: vm.lob.key
	    });


	    $scope.closeThisDialog();


	    TestPhases.create($scope.event_id, vm.description, vm.startTime,
			      vm.endTime, vm.lob.key)
		.then(createTestPhaseSuccessFn, errorFn);


	    function createTestPhaseSuccessFn(data, status, headers, config) {
		Snackbar.show('Success! Test phase created.');
	    }

	    function errorFn(data, status, headers, config) {
		$rootScope.$broadcast('test-phase.created.error');
		Snackbar.error(data.error);
	    }
	}
    }
})();
