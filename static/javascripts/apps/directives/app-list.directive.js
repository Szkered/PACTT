(function (){
    'use strict';

    angular
	.module('PACTT.apps.directives')
	.directive('appList', appList);


    function appList() {
	var directive = {
	    controller: 'AppListController',
	    controllerAs: 'vm',
	    restrict: 'E',
	    scope: {
		apps: '=',
		app: '=',
		isAuthenticated: '=',
		editMode: '=',
		execMode: '='
	    },
	    templateUrl: '/static/templates/apps/app-list.html'
	};

	return directive;
    }
})();
