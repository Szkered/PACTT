(function (){
    'use strict';
    
    angular
	.module('PACTT.layout.directives')
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
	    templateUrl: '/static/templates/layout/timeline-entry.html'	    
	}

	return directive;
    }
})();
