(function (){
    'use strict';
    
    angular
	.module('PACTT.timeline', [
	    'PACTT.timeline.services',
	    'PACTT.timeline.controllers',
	    'PACTT.timeline.directives'
	]);

    angular
	.module('PACTT.timeline.controllers', ['ngDialog', 'ngMaterial']);

    angular
	.module('PACTT.timeline.directives', ['ngDialog']);

    angular
	.module('PACTT.timeline.services', []);
})();
