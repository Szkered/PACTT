(function (){
    'use strict';
    
    angular
	.module('PACTT.tracker.controllers')
	.controller('TrackerController', TrackerController);

    TrackerController.$inject = [
	'$scope', '$routeParams', '$rootScope', 'Authentication', 'Events', 'TestPhases',
	'Scopes', 'Apps', '$interval'
    ];

    function TrackerController(
	$scope, $routeParams, $rootScope, Authentication, Events, TestPhases, Scopes, Apps,
	$interval) {
	var vm = this;

	vm.isAuthenticated = Authentication.isAuthenticated();
	$scope.event_id = $routeParams.event_id;

	vm.test_phases = [];
	vm.apps = [];
	vm.editMode = false;

	activate();

	
	function activate() {
	    var event_id = $scope.event_id;
	    
	    Events.get(event_id).then(eventsSuccessFn, errorFn);
	    TestPhases.get(event_id).then(testPhasesSuccessFn, errorFn);
	    Apps.all().then(appsSuccessFn, errorFn);
	    
	    
	    function eventsSuccessFn(data, status, headers, config) {
		vm.event = data.data;
		var header = 'Tracker | ' + vm.event.description + ' - ' + vm.event.date;
		$rootScope.$broadcast('subheader', header);
	    }
	    
	    function testPhasesSuccessFn(data, status, headers, config) {
		vm.test_phases = data.data;
		console.log('test phases loaded')
		$rootScope.$broadcast('test-phases.loaded', data.data);
	    }

	    function appsSuccessFn(data, status, headers, config) {
		vm.apps = data.data;
		Scopes.get(event_id).then(scopesSuccessFn, errorFn);
		
		function scopesSuccessFn(data, status, headers, config) {
		    $scope.scopeArray = data.data;
		    for(var i = 0; i < $scope.scopeArray.length; i++) {
			vm.apps[i].scoped = $scope.scopeArray[i].scoped;
		    }
		}
	    }

	    function errorFn(data, status, headers, config) {
		Snackbar.error(data.data.error);
	    }
	}
    }
})();
