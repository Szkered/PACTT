(function (){
    'use strict';
    
    angular
	.module('PACTT.planner.controllers')
	.controller('ScopesController', ScopesController);

    ScopesController.$inject = ['$scope', 'Authentication', 'ngDialog'];


    function ScopesController($scope, Authentication, ngDialog) {
	var vm = this;

	vm.isAuthenticated = Authentication.isAuthenticated();
	vm.scopeToggle = scopeToggle;

	
	function scopeToggle(app) {
	    console.log('[DEBUG] scope: ' + app.scoped);
	    if(!app.scoped) {
		app.descope_reason = "";
	    }
	}
    }
    
})();
