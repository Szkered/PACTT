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

    angular
	.module('PACTT')
	.filter('orderObjectBy', function() {
	    return function(input, attr) {
		if(!angular.isObject(input)) return input;

		var array = [];
		for(var objectKey in input){
		    array.push(input[objectKey]);
		}

		array.sort(function(a, b) {
		    return parseInt(a[attr]) - parseInt(b[attr]);
		});
	    }
	})

    run.$inject = ['$http'];

    
    function run($http) {
	$http.defaults.xsrfHeaderName = 'X-CSRFToken';
	$http.defaults.xsrfCookieName = 'csrftoken';
    }
})();


