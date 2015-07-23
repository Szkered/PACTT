(function (){
    'use strict';
    
    angular
	.module('PACTT.layout.controllers')
	.controller('CheckInController', CheckInController);

    CheckInController.$inject = [
	'$scope', '$location', 'TestPhases', 'TestResults', 'Assignments',
	'Authentication', 'Snackbar'
    ];

    
    function CheckInController(
	$scope, $location, TestPhases, TestResults, Assignments, Authentication,
	Snackbar) {
	var vm = this;

	vm.checkIn = checkIn;
	vm.sid = Authentication.getAuthenticatedAccount().sid;
	vm.check_in_results = [];

	activate();


	function checkIn() {
	    vm.check_in_results.map(function(test_result) {
		if(test_result.checked_in) {
		    Snackbar.error('You have checked-in!');
		} else {
		    TestResults.update(test_result).then(function(data) {
	    		Snackbar.show('Check-in Success!');
	    	    }, errorFn);		    		    
		}
	    });
	    $location.url('/' + $scope.url +  '/' + $scope.event.id);
	    $scope.closeThisDialog();
	}
	
	function activate(){
	    TestPhases.get($scope.event.id).then(testPhasesSuccessFn, errorFn);
	}

	// get id of check-in test_phase of current event
	function testPhasesSuccessFn(data, status, headers, config) {
	    vm.check_in_phase = data.data.filter(function(test_phase) {
		return angular.lowercase(test_phase.description) == 'check-in';
	    });

	    vm.check_in_id = vm.check_in_phase[0].id;
	    
	    Assignments.get(vm.sid).then(assignmentsSuccessFn, errorFn);   
	}

	// get assignments of current PM user
	function assignmentsSuccessFn(data, status, headers, config) {
	    vm.assignments = data.data;

	    vm.assignments = vm.assignments.filter(function (assignment) {
		return assignment.scope.event === $scope.event.id;
	    });

	    vm.assigned_apps_id = vm.assignments.map(function (assignment) {
		return assignment.scope.app.id;
	    })

	    TestResults.get_from_test_phase(vm.check_in_id).then(testResultsSuccessFn, errorFn);
	}

	// get test_results of this check-in phase, filter to assigned apps, attach meta data
	// if not yet checked in, update timestamp
	function testResultsSuccessFn(data, status, headers, config) {
	    vm.check_in_results = data.data.filter(function (test_result) {
		console.log(vm.assigned_apps_id.indexOf(test_result.app) > -1);
		return vm.assigned_apps_id.indexOf(test_result.app) > -1;
	    });

	    vm.check_in_results = vm.check_in_results.map(function (test_result) {
		test_result.checked_in = false;
		if (test_result.status != 'N') {
		    test_result.checked_in = true;
		} else {
		    var now = new Date();
	    	    var now_time = now.getHours() + ':' + now.getMinutes();
	    	    test_result.startTime = now_time;
	    	    test_result.endTime = now_time;
		    test_result.status = 'C';
		}
		return test_result;
	    });
	}
	
	function errorFn(data, status, headers, config) {
	    Snackbar.error(status + ' : ' + data.error);
	}
    }
})();
