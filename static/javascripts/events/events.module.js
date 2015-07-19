(function (){
    'use strict';
    
    angular
	.module('PACTT.events', [
	    'PACTT.events.services',
	    'PACTT.events.controllers',
	    'PACTT.events.directives'
	]);

    angular
	.module('PACTT.events.controllers', ['ngDialog', 'ngMaterial']);

    angular
	.module('PACTT.events.directives', ['ngDialog']);

    angular
	.module('PACTT.events.services', []);
})();
