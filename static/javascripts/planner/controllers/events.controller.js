(function (){
    'use strict';
    
    angular
	.module('PACTT.planner.controllers')
	.controller('EventsController', EventsController);

    EventsController.$inject = ['$scope', 'Authentication'];

    
    function EventsController($scope, Authentication) {
	var vm = this;

	vm.events = [];
	// vm.isAuthenticated = Authentication.isAuthenticated();
	vm.isAuthenticated = true;

	activate();


	function activate() {
	    console.log("[INFO] activate EventsController");
	    $scope.$watchCollection(function () { return $scope.events; },
				    function (current, original) {
					vm.events = current;
				    });
	}
    }
})();
