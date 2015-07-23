(function (){
    'use strict';
    
    angular
	.module('PACTT.apps.controllers')
	.controller('AppListController', AppListController);

    AppListController.$inject = ['$scope', '$routeParams'];


    function AppListController($scope, $routeParams) {
	var vm = this;

	vm.scopeToggle = scopeToggle;
	vm.querySearch = querySearch;
	vm.searchTextChange = searchTextChange;
	vm.selectedItemChange = selectedItemChange;
	vm.toggleAssigned = toggleAssigned;
	vm.show_all = false;

	vm.statusType = {
	    'C':'Completed with No Issue',
	    'I':'Completed with Issue',
            'N':'Not Yet Started',
            'F':'Failed'
	};

	// bypass
	$scope.$on('apps.assigned.loaded', function (event, app) {
	    vm.apps_assigned = [app];
	    // $scope.apps = apps;
	    // $scope.btn = 'See all Apps'
	    console.log('app loaded');
	});
	
	$scope.$on('apps.loaded', function (event, apps) {
	    vm.appsAll = apps;
	    $scope.apps = apps;
	    $scope.btn = 'See my assigned Apps';
	    vm.appsSearch = apps.map( function (app) {
		return {
		    value: app.name.toLowerCase(),
		    display: app.name,
		    app: app
		}
	    });
	    console.log('apps loaded');
	});

	function toggleAssigned() {
	    if(vm.show_all) {
		$scope.btn = 'See my assigned Apps'
		$scope.apps = vm.appsAll;
	    } else {
		$scope.btn = 'See all Apps'
		$scope.apps = vm.apps_assigned;	
	    }
	    vm.show_all = !vm.show_all;
	}
	
	function scopeToggle(app) {
	    console.log('[DEBUG] scope: ' + app.scoped);
	    if(!app.scoped) {
		app.descope_reason = "";
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
		var i = $scope.apps.indexOf(item.app);
		$scope.apps = [$scope.apps[i]];
	    } else {
		$scope.apps = vm.appsAll;
	    }
	}
    }    
})();
