(function (){
    'use strict';
    
    angular
	.module('PACTT.planner.controllers')
	.controller('TestPhasesController', TestPhasesController);

    TestPhasesController.$inject = ['$scope', '$filter'];

    
    function TestPhasesController($scope, $filter) {
	var vm = this;

	vm.test_phases = [];

	activate();

	

	
	function activate() {
	    console.log("[INFO] activate TestPhasesController");
	    $scope.$watchCollection(
		function () { return $scope.testPhases; }, function (current, original) {
		vm.test_phases = $filter('orderBy')(current, 'startTime');
	    });
	}
    }
})();
