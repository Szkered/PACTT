(function (){
    'use strict';
    
    angular
	.module('PACTT.planner.controllers')
	.controller('TestPhasesController', TestPhasesController);

    TestPhasesController.$inject = ['$scope'];

    
    function TestPhasesController($scope) {
	var vm = this;

	vm.column = [];

	activate();


	function activate() {
	    console.log("[INFO] activate TestPhasesController");
	    $scope.$watchCollection(function () { return $scope.testPhases; },
				    function (current, original) {
					vm.column = current;
					console.log("[DEBUG] column = " + vm.column);
				    });
	}
    }
})();
