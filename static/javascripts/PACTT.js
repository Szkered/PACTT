(function () {
    'use strict';
    
    angular
	.module('PACTT', [
	    'PACTT.config',
	    'PACTT.routes',
	    'PACTT.authentication'
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


