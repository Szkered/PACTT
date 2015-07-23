(function (){
    'use strict';
    
    angular
	.module('PACTT.apps', [
	    'PACTT.apps.services',
	    'PACTT.apps.controllers',
	    'PACTT.apps.directives'
	]);

    angular
	.module('PACTT.apps.controllers', ['ngMaterial', 'ngDialog']);

    angular
	.module('PACTT.apps.directives', []);

    angular
	.module('PACTT.apps.services', []);
})();
