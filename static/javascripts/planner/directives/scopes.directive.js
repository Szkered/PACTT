(function (){
    'use strict';

    angular
	.module('PACTT.planner.directives')
	.directive('scopes', scopes);


    function scopes() {
	var directive = {
	    controller: 'ScopesController',
	    controllerAs: 'vm',
	    restrict: 'E',
	    scope: {
		apps: '=',
		editMode: '='
	    },
	    templateUrl: '/static/templates/planner/scopes.html'
	};

	return directive;
    }
})();
