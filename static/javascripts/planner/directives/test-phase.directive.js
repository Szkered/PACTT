(function (){
    'use strict';

    angular
	.module('PACTT.planner.directives')
	.directive('testPhase', testPhase);


    function testPhase() {
	var directive = {
	    controller: 'TestPhaseController',
	    controllerAs: 'vm',
	    restrict: 'E',
	    scope: {
		testPhase: '='
	    },
	    templateUrl: '/static/templates/planner/test-phase.html'
	};

	return directive;
    }
})();
