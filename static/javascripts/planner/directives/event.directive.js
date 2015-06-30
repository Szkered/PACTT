(function (){
    'use strict';

    angular
	.module('PACTT.planner.directives')
	.directive('event', event);


    function event() {
	var directive = {
	    restrict: 'E',
	    scope: {
		event: '='
	    },
	    templateUrl: '/static/templates/planner/event.html'
	};

	return directive;
    }
})();