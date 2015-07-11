(function (){
    'use strict';

    angular
	.module('PACTT.planner.directives')
	.directive('testPhases', testPhases);


    function testPhases() {
	var directive = {
	    controller: 'TestPhasesController',
	    controllerAs: 'vm',
	    restrict: 'E',
	    scope: {
		testPhases: '=',
		openAddDialog: '=',
		isAuthenticated: '='
	    },
	    templateUrl: '/static/templates/planner/test-phases.html'
	};

	return directive;
    }
})();
