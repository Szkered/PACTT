(function () {
    'use strict';
    
    angular
	.module('PACTT', [
	    'PACTT.profiles',
	    'PACTT.config',
	    'PACTT.routes',
	    'PACTT.utils',
	    'PACTT.authentication',
	    'PACTT.layout',
	    'PACTT.timeline',
	    'PACTT.events',
	    'PACTT.apps'
	]);

    angular
	.module('PACTT.config', []);

    angular
	.module('PACTT.routes', ['ngRoute']);
    
    angular
	.module('PACTT')
	.run(run);

    run.$inject = ['$http'];

    
    function run($http) {
	$http.defaults.xsrfHeaderName = 'X-CSRFToken';
	$http.defaults.xsrfCookieName = 'csrftoken';
    }
})();


