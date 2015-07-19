(function (){
    'use strict';
    
    angular
	.module('PACTT.layout.controllers')
	.controller('CheckInController', CheckInController);

    CheckInController.$inject = [
	'$scope', '$location', 'TestPhases', 'TestResults', 'Assignments',
	'Authentication', 'Scopes', 'Snackbar'
    ];

    
    function CheckInController(
	$scope, $location, TestPhases, TestResults, Assignments, Authentication, Scopes,
	Snackbar) {
	var vm = this;

	vm.checkIn = checkIn;
	vm.sid = Authentication.getAuthenticatedAccount().sid;
	vm.scopes = [];
	
	function checkIn(){
	    $scope.closeThisDialog();
	    TestPhases.get($scope.event.id).then(testPhasesSuccessFn, errorFn);
	}

	function testPhasesSuccessFn(data, status, headers, config) {
	    vm.check_in_phase = data.data.filter(function(test_phase) {
		return angular.lowercase(test_phase.description) == 'check-in';
	    });

	    vm.check_in_id = vm.check_in_phase[0].id;
	    
	    Assignments.get(vm.sid).then(assignmentsSuccessFn, errorFn);   
	}

	function assignmentsSuccessFn(data, status, headers, config) {
	    vm.assignments = data.data;

	    vm.assignments = vm.assignments.filter(function (assignment) {
		return assignment.scope.event === $scope.event.id;
	    });

	    vm.app_ids = vm.assignments.map(function (assignment) {
		console.log(assignment.scope.app);
		return assignment.scope.app;
	    })

	    TestResults.get(vm.check_in_id).then(testResultsSuccessFn, errorFn);
	}

	function testResultsSuccessFn(data, status, headers, config) {
	    vm.test_results = data.data.filter(function (test_result) {
		console.log(vm.app_ids.indexOf(test_result.app) > -1);
		return vm.app_ids.indexOf(test_result.app) > -1;
	    });

	    vm.test_results.map(function (test_result) {
	    	var now = new Date();
	    	var now_time = now.getHours() + ':' + now.getMinutes();
	    	test_result.startTime = now_time;
	    	test_result.endTime = now_time;
	    	TestResults.update(test_result).then(function(data) {
	    	    Snackbar.show('Check-in Success!');
	    	    $location.url('/' + $scope.url +  '/' + $scope.event.id);
	    	}, errorFn);
	    });
	}
	
	function errorFn(data, status, headers, config) {
	    Snackbar.error(status + ' : ' + data.error);
	}
    }
})();
