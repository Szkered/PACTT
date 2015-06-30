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
		testPhases: '='
	    },
	    templateUrl: '/static/templates/planner/test_phases.html'
	};

	return directive;
    }
})();
