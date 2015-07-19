(function (){
    'use strict';

    angular
	.module('PACTT.events.directives')
	.directive('events', events);


    function events() {
	var directive = {
	    controller: 'EventsController',
	    controllerAs: 'vm',
	    restrict: 'E',
	    scope: {
		events: '='
	    },
	    templateUrl: 'static/templates/events/events.html'
	};

	return directive;
    }
})();
