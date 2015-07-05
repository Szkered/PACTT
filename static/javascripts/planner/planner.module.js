(function (){
    'use strict';
    
    angular
	.module('PACTT.planner', [
	    'PACTT.planner.services',
	    'PACTT.planner.controllers',
	    'PACTT.planner.directives'
	]);

    angular
	.module('PACTT.planner.controllers', ['ui.bootstrap', 'mdDateTime', 'ngMaterial']);

    angular
	.module('PACTT.planner.directives', ['ngDialog']);

    angular
	.module('PACTT.planner.services', []);
})();
