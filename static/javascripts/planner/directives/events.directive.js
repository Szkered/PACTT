(function (){
    'use strict';

    angular
	.module('PACTT.planner.directives')
	.directive('events', events);


    function events() {
	var directive = {
	    controller: 'EventsController',
	    controllerAs: 'vm',
	    restrict: 'E',
	    scope: {
		events: '='
	    },
	    templateUrl: 'static/templates/planner/events.html'
	};

	return directive;
    }
})();
