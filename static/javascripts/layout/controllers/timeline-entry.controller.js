(function (){
    'use strict';
    
    angular
	.module('PACTT.layout.controllers')
	.controller('TimelineEntryController', TimelineEntryController);
    
    TimelineEntryController.$inject = ['$scope', '$interval', '$rootScope', 'TestPhases'];
    
    function TimelineEntryController($scope, $interval, $rootScope, TestPhases) {
	var vm = this;

	vm.isWaiting = isWaiting;
	vm.isCurrent = isCurrent;
	vm.isSuccess = isSuccess;
	vm.destroy = destroy;
	
	vm.lobTypes = [
	    {key:'G', value:'GTRM'},
	    {key:'C', value:'CIB TRM'}
	];

	activate();


	function activate() {

	    // hard-coded data for demo
	    vm.timer = 5;
	    vm.state = 'waiting';

	    if($scope.testPhase.id == 1) {
		vm.state = 'success';
	    }else if($scope.testPhase.id == 10) {
		vm.state = 'current';
	    }

	    $interval(function() {
		vm.timer += 1;
		if (vm.timer > 100) {
		    vm.timer = 1;
		}
		// TODO: real timer
		vm.now = new Date();
	    }, 100, 0, true);
	}


	function isSuccess() {
	    return (vm.state == 'success');
	}

	function isCurrent() {
	    return (vm.state == 'current');
	}
	
	function isWaiting() {
	    return (vm.state == 'waiting');
	}
	
	function destroy(){
	    $rootScope.$broadcast('test-phase.deleted', $scope.testPhase);
	    TestPhases.destroy($scope.testPhase.id);
	}
    }
})();