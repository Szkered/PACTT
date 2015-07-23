(function (){
    'use strict';
    
    angular
	.module('PACTT.layout.controllers')
	.controller('TrackerController', TrackerController);

    TrackerController.$inject = [
	'$scope', '$routeParams', '$rootScope', 'Authentication', 'Events', 'TestPhases',
	'Scopes', 'Apps', '$interval', 'TestResults'
    ];

    function TrackerController(
	$scope, $routeParams, $rootScope, Authentication, Events, TestPhases, Scopes, Apps,
	$interval, TestResults) {
	var vm = this;

	vm.isAuthenticated = Authentication.isAuthenticated();
	$scope.event_id = $routeParams.event_id;

	vm.test_phases = [];
	vm.appsAll = [];

	activate();

	
	function activate() {
	    Apps.all().then(appsSuccessFn, errorFn);
	}

	// load all apps
	function appsSuccessFn(data, status, headers, config) {
	    vm.appsAll = data.data;

	    Events.get($scope.event_id).then(eventsSuccessFn, errorFn);
	}
	
	// load current event
	function eventsSuccessFn(data, status, headers, config) {
	    vm.event = data.data;
	    var header = 'Tracker | ' + vm.event.description + ' - ' + vm.event.date;
	    $rootScope.$broadcast('subheader', header);

	    TestPhases.get($scope.event_id).then(testPhasesSuccessFn, errorFn);
	}

	// load test phases of current event
	function testPhasesSuccessFn(data, status, headers, config) {
	    vm.test_phases = data.data;
	    console.log('test phases loaded')
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
	    
	    $rootScope.$broadcast('apps.loaded', vm.appsAll);
	}

	function errorFn(data, status, headers, config) {
	    Snackbar.error(data.data.error);
	}

	function getCurrentTestResult(test_results) {
	    if(!test_results) return;
	    
	    // time based logic
	    test_results = test_results.filter(function(test_result) {
	    	var date = vm.event.date
	    	var st = test_result.testPhase.startTime;
	    	var et = test_result.testPhase.endTime;
	    	st = new Date(date + ' ' + st);
	    	et = new Date(date + ' ' + et );

	    	// harcoded
	    	// var now = new Date();
	    	var now = new Date(date + ' 5:00')

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
