(function (){
    'use strict';
    
    angular
	.module('PACTT.apps', [
	    'PACTT.apps.services',
	    'PACTT.apps.controllers',
	    'PACTT.apps.directives'
	]);

    angular
	.module('PACTT.apps.controllers', ['ngMaterial']);

    angular
	.module('PACTT.apps.directives', []);

    angular
	.module('PACTT.apps.services', []);
})();
