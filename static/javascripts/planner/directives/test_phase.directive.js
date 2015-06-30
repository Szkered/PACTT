(function (){
    'use strict';

    angular
	.module('PACTT.planner.directives')
	.directive('testPhase', testPhase);


    function testPhase() {
	var directive = {
	    restrict: 'E',
	    scope: {
		testPhase: '='
	    },
	    templateUrl: '/static/templates/planner/test_phase.html'
	};

	return directive;
    }
})();
