(function (){
    'use strict';
    
    angular
	.module('PACTT.timeline.controllers')
	.controller('TimelineController', TimelineController);
    
    TimelineController.$inject = ['$scope', '$interval', 'ngDialog', '$routeParams'];
    
    function TimelineController($scope, $interval, ngDialog, $routeParams) {
	var vm = this;

	vm.openAddDialog = openAddDialog;

	$scope.event_id = $routeParams.event_id;

	function openAddDialog() {
	    ngDialog.open({
		template: '/static/templates/timeline/new-test-phase.html',
		controller: 'NewTestPhaseController as vm',
		scope: $scope
	    });
	}
    }
})();
