(function () {
    'use strict';

    angular
	.module('PACTT.layout', [
	    'PACTT.layout.controllers'
	]);

    angular
	.module('PACTT.layout.controllers', ['ngMaterial', 'xeditable']);
})();
