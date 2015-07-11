(function (){
    'use strict';
    
    angular
	.module('PACTT.planner.controllers')
	.controller('PlannerController', PlannerController);

    PlannerController.$inject = [
	'$scope', '$routeParams','Authentication', 'Snackbar', 'ngDialog', '$rootScope',
	'Events', 'TestPhases', 'Scopes', 'Apps', '$location'
    ];

    
    function PlannerController(
	$scope, $routeParams, Authentication, Snackbar, ngDialog, $rootScope,
	Events, Testhases, Scopes, Apps, $location) {
	var vm = this;

	vm.isAuthenticated = Authentication.isAuthenticated();
	$scope.event_id = $routeParams.event_id;
	
	vm.test_phases = [];
	vm.apps = [];

	vm.openAddDialog = openAddDialog;
	vm.saveAndBack = saveAndBack;

	activate();


	function openAddDialog() {
	    ngDialog.open({
		template: '/static/templates/planner/new-test-phase.html',
		controller: 'NewTestPhaseController as vm',
		scope: $scope
	    });
	}

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
	    for(var i = 0; i < vm.test_phases.length; i++) {
		TestPhases.update(vm.test_phases[i]);
	    }
	    $location.url('/');
	}


	function activate() {
	    var event_id = $scope.event_id;

	    Events.get(event_id).then(eventsSuccessFn, errorFn);
	    TestPhases.get(event_id).then(testPhasesSuccessFn, errorFn);
	    Apps.all().then(appsSuccessFn, errorFn);

	    
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
	    });

	    
	    function eventsSuccessFn(data, status, headers, config) {
		vm.event = data.data;
		var header = 'Planner | ' + vm.event.description + ' - ' + vm.event.date;
		$rootScope.$broadcast('subheader', header);
	    }

	    function testPhasesSuccessFn(data, status, headers, config) {
		vm.test_phases = data.data;
	    }
	    
	    function appsSuccessFn(data, status, headers, config) {
		vm.apps = data.data;
		Scopes.get(event_id).then(scopesSuccessFn, errorFn);
		
		function scopesSuccessFn(data, status, headers, config) {
		    $scope.scopeArray = data.data;
		    for(var i = 0; i < $scope.scopeArray.length; i++) {
			vm.apps[i].scope = $scope.scopeArray[i];
			vm.apps[i].scoped = $scope.scopeArray[i].scoped;
			vm.apps[i].descope_reason = $scope.scopeArray[i].descope_reason;
		    }
		}
	    }


	    function errorFn(data, status, headers, config) {
		Snackbar.error(data.data.error);
	    }
	}
    }
})();
