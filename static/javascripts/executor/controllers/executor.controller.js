(function (){
    'use strict';
    
    angular
	.module('PACTT.executor.controllers')
	.controller('ExecutorController', ExecutorController);

    ExecutorController.$inject = [
	'$scope', '$routeParams', '$rootScope', 'Authentication', 'Events', 'TestPhases',
	'Apps', 'Scopes', 'Assignments' ,'$interval', 'Snackbar'
    ];

    function ExecutorController(
	$scope, $routeParams, $rootScope, Authentication, Events, TestPhases, Apps, Scopes,
	Assignments, $interval, Snackbar) {
	var vm = this;

	vm.isAuthenticated = Authentication.isAuthenticated();
	$scope.event_id = $routeParams.event_id;

	vm.test_phases = [];
	vm.apps = [];
	vm.editMode = false;
	vm.assignments = [];

	activate();

	
	function activate() {
	    var event_id = $scope.event_id;
	    
	    Events.get(event_id).then(eventsSuccessFn, errorFn);
	    TestPhases.get(event_id).then(testPhasesSuccessFn, errorFn);
	    Assignments.get(Authentication.getAuthenticatedAccount().sid)
	    	.then(assignmentsSuccessFn, errorFn);
	    
	    
	    function eventsSuccessFn(data, status, headers, config) {
	    	vm.event = data.data;
	    	var header = 'Executor | ' + vm.event.description + ' - ' + vm.event.date;
	    	$rootScope.$broadcast('subheader', header);
	    }
	    
	    function testPhasesSuccessFn(data, status, headers, config) {
	    	vm.test_phases = data.data;
	    	console.log('test phases loaded');
	    	$rootScope.$broadcast('test-phases.loaded', data.data);
	    }

	    function assignmentsSuccessFn(data, status, header, config) {
	    	vm.assignments = data.data;
	    	for(var i = 0; i < vm.assignments.length; i++) {
		    var scope_id = vm.assignments[i].scope;
		    Scopes.get_it(scope_id).then(
			function(data, status, header, config) {
			    var scope = data.data;
			    if(scope.scoped && scope.event == $scope.event_id){
				Apps.get(scope.app).then(
				    function(data, status, headers, config) {
					vm.apps.unshift(data.data);
				    }, errorFn);
			    }
			}, errorFn);
	    	}
	    }
	    
	    function errorFn(data, status, headers, config) {
	    	Snackbar.error(data.data.error);
	    }
	}
    }
})();
