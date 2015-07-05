(function (){
    'use strict';
    
    angular
	.module('PACTT.planner.controllers')
	.controller('EditTestPhaseController', EditTestPhaseController);

    EditTestPhaseController.$inject = ['$scope', 'TestPhases'];


    function EditTestPhaseController($scope, TestPhases) {
	var vm = this;

	vm.update = update;
	vm.destroy = destroy;

	activate();

	
	function activate() {
	    // TestPhases.get($scope.testPhase.id).then()
	    console.log("[DEBUG] in edit:" + $scope.testPhase);
	}

	function update() {
	    // TestPhases.update();
	}

	function destroy(){
	    $rootScope.$broadcast('test-phase.deleted', $scope.testPhase);
	    
	    TestPhases.destroy($scope.testPhase.id);
	}
    }
})();
