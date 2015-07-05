(function (){
    'use strict';
    
    angular
	.module('PACTT.planner.controllers')
	.controller('EditTestPhaseController', EditTestPhaseController);

    EditTestPhaseController.$inject = ['$rootScope', '$scope', 'TestPhases'];


    function EditTestPhaseController($rootScope, $scope, TestPhases) {
	var vm = this;

	vm.update = update;
	vm.destroy = destroy;
	vm.test_phase = $.extend( {}, $scope.testPhase );

	vm.lobTypes = [
	    {key:'G', value:'GTRM'},
	    {key:'C', value:'CIB TRM'}
	];

	activate();

	
	function activate() {
	    // TestPhases.get($scope.testPhase.id).then()
	    console.log("[DEBUG] in edit:" + $scope.testPhase);
	}

	function update() {
	    
	    $rootScope.$broadcast('test-phase.updated', {
		original: $scope.testPhase,
		current: vm.test_phase
	    });
	    
	    TestPhases.update(vm.test_phase);

	    $scope.closeThisDialog();
	}

	function destroy(){
	    $rootScope.$broadcast('test-phase.deleted', $scope.testPhase);
	    
	    TestPhases.destroy($scope.testPhase.id);

	    $scope.closeThisDialog();
	}
    }
})();
