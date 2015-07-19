(function (){
    'use strict';

    angular
	.module('PACTT.events.directives')
	.directive('event', event);


    function event() {
	var directive = {
	    controller: 'EventController',
	    controllerAs: 'vm',
	    restrict: 'E',
	    scope: {
		event: '='
	    },
	    templateUrl: '/static/templates/events/event.html'
	};

	return directive;
    }
})();
