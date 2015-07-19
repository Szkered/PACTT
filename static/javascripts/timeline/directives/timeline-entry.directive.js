(function (){
    'use strict';
    
    angular
	.module('PACTT.timeline.directives')
	.directive('timelineEntry', timelineEntry);

    
    function timelineEntry() {
	var directive = {
	    controller: 'TimelineEntryController',
	    controllerAs: 'vm',
	    restrict: 'E',
	    scope: {
		testPhase: '=',
		editMode: '='
	    },
	    templateUrl: '/static/templates/timeline/timeline-entry.html'	    
	}

	return directive;
    }
})();
