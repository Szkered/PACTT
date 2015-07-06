(function (){
    'use strict';
    
    angular
	.module('PACTT.planner.controllers')
	.controller('TestPhaseController', TestPhaseController);

    TestPhaseController.$inject = ['$rootScope', '$scope', 'TestPhases', 'Authentication',
				  'ngDialog'];

    
    function TestPhaseController($rootScope, $scope, TestPhases, Authentication, ngDialog) {
	var vm = this;

	vm.isAuthenticated = Authentication.isAuthenticated();
	vm.destroy = destroy;
	vm.openEditDialog = openEditDialog;
	

	function openEditDialog() {
	    ngDialog.open({
		template: '/static/templates/planner/edit-test-phase.html',
		controller: 'EditTestPhaseController as vm',
		scope: $scope
	    });
	}
	
	function destroy(){
	    $rootScope.$broadcast('test-phase.deleted', $scope.testPhase);
	    
	    TestPhases.destroy($scope.testPhase.id);
	}
    }
})();
