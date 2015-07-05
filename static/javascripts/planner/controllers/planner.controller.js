(function (){
    'use strict';
    
    angular
	.module('PACTT.planner.controllers')
	.controller('PlannerController', PlannerController);

    PlannerController.$inject = ['$scope', '$routeParams','Authentication',
				 'Snackbar', 'ngDialog', '$rootScope',
				 'Events', 'TestPhases', 'Scopes',
				 'Apps', '$location', '$cookies'];

    
    function PlannerController($scope, $routeParams, Authentication,
			       Snackbar, ngDialog, $rootScope,
			       Events, TestPhases, Scopes,
			       Apps, $location, $cookies) {
	var vm = this;

	// $scope.isAuthenticated = Authentication.isAuthenticated;
	vm.isAuthenticated = Authentication.isAuthenticated;
	$scope.event_id = $routeParams.event_id;
	
	vm.event = undefined;
	vm.test_phases = [];
	vm.apps = [];

	vm.openAddDialog = openAddDialog;
	vm.saveAndBack = saveAndBack;

	activate();

	console.log($cookies.authenticatedAccount);
	

	function openAddDialog() {
	    ngDialog.open({
		template: '/static/templates/planner/new-test-phase.html',
		controller: 'NewTestPhaseController as vm',
		scope: $scope
	    });
	}

	function saveAndBack() {
	    for(var i = 0; i < vm.apps.length; i++) {
	    	if(vm.apps[i].scoped === false) {
	    	    for(var j = 0; j < $scope.scopeArray.length; j++) {
			if($scope.scopeArray[j].app === vm.apps[i].id) {
			    Scopes.destroy($scope.scopeArray[j].id);
			}
	    	    }
	    	} else {
		    var noScope = true;
		    for(var j = 0; j < $scope.scopeArray.length; j++) {
			if($scope.scopeArray[j].app === vm.apps[i].id) {
			    noScope = false;
			}
	    	    }
		    if(noScope) {
			Scopes.create($scope.event_id, vm.apps[i].id);
		    }
		}
	    }
	    $location.url('/');
	}


	function activate() {
	    var event_id = $scope.event_id;
	    console.log("[DEBUG] inside PlannerController:activate(), event_id = " + event_id);

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
		$rootScope.$broadcast('title', vm.event.description + ' - ' + vm.event.date);
	    }

	    function testPhasesSuccessFn(data, status, headers, config) {
		vm.test_phases = data.data;
	    }
	    
	    function appsSuccessFn(data, status, headers, config) {
		vm.apps = data.data;
		
		for(var i = 0; i < vm.apps.length; i++) {
		    vm.apps[i].scoped = false;
		}
		
		Scopes.get(event_id).then(scopesSuccessFn, errorFn);
		
		function scopesSuccessFn(data, status, headers, config) {
		    $scope.scopeArray = data.data;

		    for(var i = 0; i < $scope.scopeArray.length; i++){
			for(var j = 0; j < vm.apps.length; j++) {
			    if (vm.apps[j].id === $scope.scopeArray[i].app) {
				vm.apps[j].scoped = true;
				break;
			    }
			}
		    }
		}
	    }


	    function errorFn(data, status, headers, config) {
		Snackbar.error(data.data.error);
	    }
	}
    }
})();
