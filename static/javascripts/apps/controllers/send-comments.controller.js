(function (){
    'use strict';
    
    angular
	.module('PACTT.apps.controllers')
	.controller('SendCommentsController', SendCommentsController);
    
    SendCommentsController.$inject = ['$scope', 'TestResults', 'Snackbar'];
    
    function SendCommentsController($scope, TestResults, Snackbar) {
	var vm = this;

	vm.submit = submit;

	function submit() {
	    var test_result = $scope.apps_assigned.current;
	    var test_phase = test_result.testPhase;
	    test_result.testPhase = test_phase.id;
	    test_result.comment = vm.comments;
	    TestResults.update(test_result).then(function(data) {
		Snackbar.show('Comment sent!');
		test_result.testPhase = test_phase;
	    }, errorFn);
	    $scope.closeThisDialog();
	}
	
	function errorFn(data, status, headers, config) {
	    Snackbar.error(data.data.error);
	}
    }
})();
