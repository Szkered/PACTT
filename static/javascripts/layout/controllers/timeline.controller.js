(function (){
    'use strict';
    
    angular
	.module('PACTT.layout.controllers')
	.controller('TimelineController', TimelineController);
    
    TimelineController.$inject = ['$scope', '$interval'];
    
    function TimelineController($scope, $interval) {
	var vm = this;

	// bypass to load data faster
	$scope.$on('test-phases.loaded', function (event, testPhases) {
	    $scope.testPhases = testPhases;
	})

	
    }
})();
