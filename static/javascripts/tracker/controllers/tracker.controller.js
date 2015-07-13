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

	vm.querySearch = querySearch;
	vm.searchTextChange = searchTextChange;
	vm.selectedItemChange = selectedItemChange;

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
		vm.appsAll = data.data;
		vm.appsSearch = vm.apps.map( function (app) {
		    return {
			value: app.name.toLowerCase(),
			display: app.name,
			app: app
		    }
		});
		
		
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

	function querySearch (query) {
	    return query ? vm.appsSearch.filter( createFilterFor(query) ) : vm.appsSearch;
	}
	
	function createFilterFor(query) {
	    var lowercaseQuery = angular.lowercase(query);
	    return function filterFn(app) {
		return (app.value.indexOf(lowercaseQuery) === 0);
	    };
	}

	function searchTextChange(text) {
	    console.log('Text changed to ' + text);
	}
	
	function selectedItemChange(item) {
	    console.log('Item changed to ' + JSON.stringify(item));
	    if(item){
		var i = vm.apps.indexOf(item.app);
		vm.apps = [vm.apps[i]];
	    } else {
		vm.apps = vm.appsAll;
	    }
	}
    }
})();
