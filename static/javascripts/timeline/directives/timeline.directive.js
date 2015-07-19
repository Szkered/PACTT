(function (){
    'use strict';
    
    angular
	.module('PACTT.timeline.directives')
	.directive('timeline', timeline);

    
    function timeline() {
	var directive = {
	    controller: 'TimelineController',
	    controllerAs: 'vm',
	    restrict: 'E',
	    scope: {
		testPhases: '=',
		isAuthenticated: '=',
		editMode: '='
	    },
	    templateUrl: '/static/templates/timeline/timeline.html'	    
	}

	return directive;
    }
})();
