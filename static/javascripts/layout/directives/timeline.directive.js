(function (){
    'use strict';
    
    angular
	.module('PACTT.layout.directives')
	.directive('timeline', timeline);

    
    function timeline() {
	var directive = {
	    controller: 'TimelineController',
	    controllerAs: 'vm',
	    restrict: 'E',
	    scope: {
		testPhases: '='
	    },
	    templateUrl: '/static/templates/layout/timeline.html'	    
	}

	return directive;
    }
})();
