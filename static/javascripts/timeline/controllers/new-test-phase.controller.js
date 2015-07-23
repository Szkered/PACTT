(function (){
    'use strict';

    angular
	.module('PACTT.timeline.controllers')
	.controller('NewTestPhaseController', NewTestPhaseController);

    NewTestPhaseController.$inject =[
	'$rootScope', '$scope', 'Authentication', 'Snackbar', 'Events', 'TestPhases',
	'TestResults', 'Apps', 'Scopes'
    ];

    
    function NewTestPhaseController(
	$rootScope, $scope, Authentication, Snackbar, Events, TestPhases, TestResults,
	Apps, Scopes) {
	var vm = this;

	vm.submit = submit;
	
	vm.lobTypes = [
	    {key:'G', value:'GTRM'},
	    {key:'C', value:'CIB TRM'}
	];

	activate();


	function activate() {
	    var event_id = $scope.event_id;
	    
	    console.log("[DEBUG] activate: event id: " + event_id);
	    Events.get(event_id).then(successFn, errorFn);

	    function successFn(data, status, headers, config) {
		vm.event = data.data;
	    }
	    
	    function errorFn(data, status, headers, config) {
		Snackbar.error('Cannot get event!');
	    }
	}
	
	function submit() {
	    $rootScope.$broadcast('test-phase.created', {
	    	description: vm.description,
	    	startTime: vm.startTime,
	    	endTime: vm.endTime,
	    	lob: vm.lob
	    });


	    $scope.closeThisDialog();
	    
	    Scopes.get($scope.event_id).then(function(data, status, headers, config){
		vm.scopes = data.data;
		vm.scoped = vm.scopes.filter( function (scope) {
		    return scope.scoped;
		});
	    }, errorFn);
	    
	    TestPhases.create($scope.event_id, vm.description, vm.startTime,
			      vm.endTime, vm.lob)
		.then(createTestPhaseSuccessFn, errorFn);

	    function createTestPhaseSuccessFn(data, status, headers, config) {
		Snackbar.show('Success! Test phase created.');
		var testPhase = data.data;
		vm.scoped_apps = vm.scoped.map( function(scope) {
		    TestResults.create(
			scope.app, testPhase.id, vm.startTime, vm.endTime
		    ).then(function(data, status, headers, config) {
			console.log("test-result object created: " + JSON.stringify(data.data));
		    }, errorFn);
		});	
	    }

	    function errorFn(data, status, headers, config) {
		$rootScope.$broadcast('test-phase.created.error');
		Snackbar.error(data.error);
	    }
	}
    }
})();
