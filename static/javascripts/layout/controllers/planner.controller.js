(function (){
    'use strict';
    
    angular
	.module('PACTT.layout.controllers')
	.controller('PlannerController', PlannerController);

    PlannerController.$inject = [
	'$scope', '$routeParams','Authentication', 'Snackbar', '$rootScope',
	'Events', 'TestPhases', 'Scopes', 'Apps', '$location'
    ];

    
    function PlannerController(
	$scope, $routeParams, Authentication, Snackbar, $rootScope,
	Events, TestPhases, Scopes, Apps, $location) {
	var vm = this;
	
	vm.isAuthenticated = Authentication.isAdmin();
	
	$scope.event_id = $routeParams.event_id;
	
	vm.test_phases = [];
	vm.test_phases_delete = [];
	vm.apps = [];


	vm.saveAndBack = saveAndBack;

	activate();

	
	function saveAndBack() {
	    for(var i = 0; i < vm.apps.length; i++) {
		if(!$scope.scopeArray[i]){
		    Scopes.create($scope.event_id, vm.apps[i].id);
		} else {
		    $scope.scopeArray[i].scoped = vm.apps[i].scoped;
		    $scope.scopeArray[i].descope_reason = vm.apps[i].descope_reason;
		    Scopes.update($scope.scopeArray[i]);
		}
	    }

	    vm.test_phases.map(function(test_phase) {
		TestPhases.update(test_phase);
	    });
	    
	    vm.test_phases_delete.map(function(id) {
		console.log('destroy:' + id);
		TestPhases.destroy(id);
	    });
	    
	    $location.url('/');
	}
	
	$scope.$on('test-phase.created', function (event, test_phase) {
	    vm.test_phases.unshift(test_phase);
	});


	$scope.$on('test-phase.created.error', function (event, test_phase) {
	    vm.test_phases.shift();
	});

	$scope.$on('test-phase.updated', function (event, data) {
	    var i = vm.test_phases.indexOf(data.original);
	    console.log("[DEBUG] updated:" + JSON.stringify(data.original));
	    vm.test_phases[i] = data.current;
	});

	$scope.$on('test-phase.deleted', function (event, test_phase) {
	    var i = vm.test_phases.indexOf(test_phase);
	    vm.test_phases.splice(i, 1);
	    vm.test_phases_delete.push(test_phase.id);
	});

	function activate() {
	    Events.get($scope.event_id).then(eventsSuccessFn, errorFn);
	    TestPhases.get($scope.event_id).then(testPhasesSuccessFn, errorFn);
	    Apps.all().then(appsSuccessFn, errorFn);
	}
	
	// load current event	
	function eventsSuccessFn(data, status, headers, config) {
	    vm.event = data.data;
	    $scope.date = vm.event.date;
	    var header = 'Planner | ' + vm.event.description + ' - ' + vm.event.date;
	    $rootScope.$broadcast('subheader', header);
	}

	// load all test_phases of current event
	function testPhasesSuccessFn(data, status, headers, config) {
	    vm.test_phases = data.data;
	}

	// load all apps
	function appsSuccessFn(data, status, headers, config) {
	    vm.apps = data.data;

	    Scopes.get($scope.event_id).then(scopesSuccessFn, errorFn);
	}

	// attach scope data
	function scopesSuccessFn(data, status, headers, config) {
	    $scope.scopeArray = data.data;
	    for(var i = 0; i < $scope.scopeArray.length; i++) {
		vm.apps[i].scope = $scope.scopeArray[i];
		vm.apps[i].scoped = $scope.scopeArray[i].scoped;
		vm.apps[i].descope_reason = $scope.scopeArray[i].descope_reason;
	    }
	    $rootScope.$broadcast('apps.loaded', vm.apps);
	}

	function errorFn(data, status, headers, config) {
	    Snackbar.error(data.data);
	}

    }
})();
