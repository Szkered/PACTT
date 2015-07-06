(function (){
    'use strict';
    
    angular
	.module('PACTT.planner.controllers')
	.controller('ScopesController', ScopesController);

    ScopesController.$inject = ['$scope', 'Authentication'];


    function ScopesController($scope, Authentication) {
	var vm = this;

	vm.apps = [];
	vm.isAuthenticated = Authentication.isAuthenticated();
    }
    
})();
