(function (){
    'use strict';
    
    angular
	.module('PACTT.apps.controllers')
	.controller('AppListController', AppListController);

    AppListController.$inject = [
	'$scope', '$routeParams', '$location', 'ngDialog', 'TestResults', 'Snackbar',
	'$rootScope', '$timeout', 'Excel'
    ];


    function AppListController(
	$scope, $routeParams, $location, ngDialog, TestResults, Snackbar, $rootScope,
	$timeout, Excel) {
	var vm = this;

	vm.url = $location.url();
	vm.scopeToggle = scopeToggle;
	vm.querySearch = querySearch;
	vm.searchTextChange = searchTextChange;
	vm.selectedItemChange = selectedItemChange;
	vm.toggleAssigned = toggleAssigned;
	vm.toggleReport = toggleReport;
	vm.sendComments = sendComments;
	vm.updateStatus = updateStatus;
	vm.exportToExcel = exportToExcel;
	vm.show_all = false;
	vm.show_report = false;
	vm.tableId = '#view_table'

	vm.statusType = {
	    'C':'Completed with No Issue',
	    'I':'Completed with Issue',
            'N':'Not Yet Started',
            'F':'Failed'
	};

	// bypass
	$scope.$on('apps.assigned.loaded', function (event, app) {
	    vm.apps_assigned = [app];
	    $scope.apps_assigned = app;
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

	$scope.$on('test-phases.loaded', function(event, test_phases) {
	    vm.test_phases = test_phases;
	    console.log('test phases loaded');
	});

	function exportToExcel(sheetName){ // ex: '#my-table'	    
            var exportHref=Excel.tableToExcel(vm.tableId, sheetName);
	    $timeout(function() {
		var link = document.createElement('a');
		link.download = sheetName.concat(".xls");
		link.href = exportHref;
		link.click();
	    }, 100);
        };

	function updateStatus(status) {
	    var test_result = $scope.apps_assigned.current;
	    var test_phase = test_result.testPhase;
	    test_result.testPhase = test_phase.id;
	    test_result.status = status;
	    TestResults.update(test_result).then(function(data) {
		Snackbar.show('Status updated!');
		test_result.testPhase = test_phase;
	    }, errorFn);
	    $rootScope.$broadcast('status.updated', status);
	}

	function sendComments() {
	    ngDialog.open({
		template: '/static/templates/apps/send-comments.html',
		controller: 'SendCommentsController as vm',
		scope: $scope
	    });
	}

	function toggleAssigned() {
	    if(vm.show_all) {
		$scope.assigned_btn = 'See my assigned Apps';
		$scope.apps = vm.appsAll;
		$rootScope.$broadcast('subheader.toggle', null);
	    } else {
		$scope.assigned_btn = 'See all Apps';
		$scope.apps = vm.apps_assigned;
		$rootScope.$broadcast('subheader.toggle', 'My assigned app');

	    }
	    vm.show_all = !vm.show_all;
	}

	function toggleReport() {
	    if(vm.show_report) {
		$scope.report_btn = 'Report view';
		vm.tableId = '#view_table'
		$rootScope.$broadcast('subheader.toggle', null);
	    } else {
		$scope.report_btn = 'Current view';
		vm.tableId = '#report_table'
		$rootScope.$broadcast('subheader.toggle', 'Report view');
	    }
	    vm.show_report = !vm.show_report;
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
	
	function errorFn(data, status, headers, config) {
	    Snackbar.error(data.data.error);
	}
    }    
})();
