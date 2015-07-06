(function (){
    'use strict';
    
    angular
	.module('PACTT.tracker', [
	    'PACTT.tracker.services',
	    'PACTT.tracker.controllers',
	    'PACTT.tracker.directives'
	]);

    angular
	.module('PACTT.tracker.controllers', ['ui.bootstrap', 'mdDateTime', 'ngMaterial']);

    angular
	.module('PACTT.tracker.directives', ['ngDialog']);

    angular
	.module('PACTT.tracker.services', []);
})();
