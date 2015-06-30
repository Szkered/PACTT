(function (){
    'use strict';
    
    angular
	.module('PACTT.planner.controllers')
	.controller('EventsController', EventsController);

    EventsController.$inject = ['$scope'];

    
    function EventsController($scope) {
	var vm = this;

	vm.column = [];

	activate();


	function activate() {
	    console.log("[INFO] activate EventsController");
	    $scope.$watchCollection(function () { return $scope.events; },
				    function (current, original) {
					vm.column = current;
				    });
	    // $scope.$watchCollection(function () { return $scope.events; },
	    // 			    function (current, original) {
	    // 				vm.columns = Columbus.render(current, original)
	    // 			    });
	    // $scope.$watchCollection(function () { return $scope.events; },
	    // 			    function (current, original) {
	    // 				vm.columns = Columbus.render(current, original)
	    // 			    });
	    // $scope.$watch(function () { return $(window).width(); },
	    // 		  function (current, original) {
	    // 		      vm.columns = Columbus.render(current, original)
	    // 		  });
	}
    }
})();
