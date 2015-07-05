(function (){
    'use strict';

    angular
	.module('PACTT.planner.directives')
	.directive('scopes', scopes);


    function scopes() {
	var directive = {
	    restrict: 'E',
	    scope: {
		apps: '='
	    },
	    templateUrl: '/static/templates/planner/scopes.html'
	};

	return directive;
    }
})();
