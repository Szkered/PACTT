(function (){
    'use strict';
    
    angular
	.module('PACTT.layout.controllers')
	.controller('ExecutorController', ExecutorController);

    ExecutorController.$inject = [
	'$scope', '$routeParams', '$rootScope', 'Authentication', 'Events', 'TestPhases',
	'Apps', 'Scopes', 'Assignments' ,'$interval', 'Snackbar', 'TestResults'
    ];

    function ExecutorController(
	$scope, $routeParams, $rootScope, Authentication, Events, TestPhases, Apps, Scopes,
	Assignments, $interval, Snackbar, TestResults) {
	var vm = this;

	vm.isAuthenticated = Authentication.isAuthenticated();
	$scope.event_id = $routeParams.event_id;

	vm.test_phases = [];
	vm.apps_assigned = [];
	vm.appsAll = [];
	vm.assignments = [];

	activate();

	
	function activate() {
	    Apps.all().then(appsSuccessFn, errorFn);
	}

	// load all apps
	function appsSuccessFn(data, status, headers, config) {
	    vm.appsAll = data.data;
	    $rootScope.$broadcast('apps.loaded', vm.appsAll);
	    
	    Events.get($scope.event_id).then(eventsSuccessFn, errorFn);
	}

	// load current event
	function eventsSuccessFn(data, status, headers, config) {
	    vm.event = data.data;
	    var header = 'Executor | ' + vm.event.description + ' - ' + vm.event.date;
	    $rootScope.$broadcast('subheader', header);

	    TestPhases.get($scope.event_id).then(testPhasesSuccessFn, errorFn);
	}

	// load all test_phases of current event
	function testPhasesSuccessFn(data, status, headers, config) {
	    vm.test_phases = data.data;
	    console.log('test phases loaded');
	    $rootScope.$broadcast('test-phases.loaded', data.data);

	    TestResults.get($scope.event_id).then(testResultsSuccessFn, errorFn);
	}

	// load test_results of current event
	function testResultsSuccessFn(data, status, headers, config) {
	    vm.test_results = data.data;
	    console.log('test results loaded');

	    Scopes.get($scope.event_id).then(scopesSuccessFn, errorFn);
	}

	// attach scope, test_results and current test_phase/result to apps, filter to scoped
	function scopesSuccessFn(data, status, headers, config) {
	    $scope.scopeArray = data.data;
	    for(var i = 0; i < $scope.scopeArray.length; i++) {
	    	vm.appsAll[i].scoped = $scope.scopeArray[i].scoped;
	    	vm.appsAll[i].test_results = vm.test_results.filter(function(test_result) {
	    	    return test_result.app == vm.appsAll[i].id;
	    	});
		
		vm.appsAll[i].current = getCurrentTestResult(vm.appsAll[i].test_results);
	    }
	    
	    vm.appsAll = vm.appsAll.filter(function(app) {
	    	return app.scoped;
	    });

	    Assignments.get(Authentication.getAuthenticatedAccount().sid)
	    	.then(assignmentsSuccessFn, errorFn);
	}

	// load all assignments of current PM user and filter them to scoped apps in this event
	// then get the marshaled data of assigned app through idx
	function assignmentsSuccessFn(data, status, header, config) {
	    vm.assignments = data.data.filter(function(assignment) {
		var scope = assignment.scope;
		return scope.scoped && scope.event == $scope.event_id;
	    });
	    
	    vm.assigned_app_idx = vm.assignments.map(function(assignment) {
		for(var i = 0; i < vm.appsAll.length; i++) {
		    var app_id = vm.appsAll[i].id;
		    if(assignment.scope.app.id == app_id) {
			return i;
		    }
		}
	    });
	    
	    $rootScope.$broadcast('apps.loaded', vm.appsAll);
	    $rootScope.$broadcast('apps.assigned.loaded', vm.appsAll[vm.assigned_app_idx]);
	}
	
	function errorFn(data, status, headers, config) {
	    Snackbar.error(data.data.error);
	}
	
	function getCurrentTestResult(test_results) {
	    // time based logic
	    test_results = test_results.filter(function(test_result) {
	    	var date = vm.event.date
	    	var st = test_result.testPhase.startTime;
	    	var et = test_result.testPhase.endTime;
	    	st = new Date(date + ' ' + st);
	    	et = new Date(date + ' ' + et );

	    	// harcoded
	    	// var now = new Date();
	    	var now = new Date(date + ' 5:01')

	    	return st <= now && now <= et;
	    });

	    // status based logic
	    // test_results = test_results.filter(function(test_result){
	    // 	return test_result.status == 'N';
	    // });

	    return test_results[0];
	}
    }
})();
