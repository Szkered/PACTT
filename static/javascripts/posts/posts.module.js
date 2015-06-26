(function (){
    'use strict';

    angular
	.module('PACTT.posts', [
	    'PACTT.posts.controllers',
	    'PACTT.posts.directives',
	    'PACTT.posts.services'
	]);

    angular
	.module('PACTT.posts.controllers', []);

    angular
	.module('PACTT.posts.directives', ['ngDialog']);

    angular
	.module('PACTT.posts.services', []);
    
})();
