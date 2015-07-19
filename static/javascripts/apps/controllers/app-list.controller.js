(function (){
    'use strict';
    
    angular
	.module('PACTT.apps.controllers')
	.controller('AppListController', AppListController);

    AppListController.$inject = ['$scope'];


    function AppListController($scope) {
	var vm = this;

	vm.scopeToggle = scopeToggle;
	
	vm.querySearch = querySearch;
	vm.searchTextChange = searchTextChange;
	vm.selectedItemChange = selectedItemChange;

	// bypass
	$scope.$on('apps.loaded', function (event, apps) {
	    vm.appsAll = $scope.apps;
	    vm.appsSearch = $scope.apps.map( function (app) {
		return {
		    value: app.name.toLowerCase(),
		    display: app.name,
		    app: app
		}
	    });
	    console.log('apps loaded');
	});

	
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
