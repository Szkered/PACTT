(function () {
    'use strict';

    angular
	.module('PACTT.authentication', [
	    'PACTT.authentication.controllers',
	    'PACTT.authentication.services'
	]);

    angular
	.module('PACTT.authentication.controllers', []);
    
    angular
	.module('PACTT.authentication.services', ['ngCookies']);
})();
