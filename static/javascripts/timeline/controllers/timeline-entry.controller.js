(function (){
    'use strict';
    
    angular
	.module('PACTT.timeline.controllers')
	.controller('TimelineEntryController', TimelineEntryController);
    
    TimelineEntryController.$inject = [
	'$scope', '$interval', '$rootScope', 'TestResults', 'Authentication'
    ];
    
    function TimelineEntryController($scope, $interval, $rootScope, TestResults, Authentication) {
	var vm = this;

	vm.isAuthenticated = Authentication.isAdmin();
	vm.isWaiting = isWaiting;
	vm.isCurrent = isCurrent;
	vm.isPassed = isPassed;
	vm.destroy = destroy;
	vm.timeDiff = timeDiff;
	vm.test = function() {
	    console.log('test!');
	};
	
	vm.lobTypes = [
	    {key:'G', value:'GTRM'},
	    {key:'C', value:'CIB TRM'}
	];

	var test_phase = $scope.testPhase;

	activate();

	$scope.$on('status.updated', function(event, status) {
	    console.log('hi');
	    activate();
	});

	function activate() {
	    TestResults.get_from_test_phase(test_phase.id).then(testResultsSuccessFn, errorFn);
	}

	// get all test results from this test phases, and compute status
	function testResultsSuccessFn(data, status, headers, config) {
	    test_phase.test_results = data.data;

	    // collate test results
	    test_phase.finished = 0;
	    test_phase.completed = 0;
	    test_phase.issued = 0;
	    test_phase.failed = 0;
	    test_phase.test_results.map(function(test_result) {
		if (test_result.status === 'C') {
		    test_phase.completed += 1;
		} else if (test_result.status === 'I') {
		    test_phase.issued += 1;
		} else if (test_result.status === 'F') {
		    test_phase.failed += 1;
		} else if (test_result.status === 'N') {
		    return;
		}
		test_phase.finished += 1;
	    });
	    
	    // hard-coded data for demo
	    var date = new Date().toDateString();
	    var now = new Date(date + ' 5:01')

	    var st = test_phase.startTime;
	    var et = test_phase.endTime;
	    st = new Date(date + ' ' + st);
	    et = new Date(date + ' ' + et );

	    if (et < now) {
		test_phase.state = 'passed green';
		for(var i = 0; i < test_phase.test_results.length; i++) {
		    if(test_phase.test_results[i].status === 'I') {
			test_phase.state = 'passed amber';
		    } else if (test_phase.test_results[i].status === 'F') {
			test_phase.state = 'passed red';
			break;
		    }
		}
	    } else if (st < now && now <= et) {
		test_phase.state = 'current';
	    } else if (now <= st) {
		test_phase.state = 'waiting';
	    }

	    // hardcoded timer
	    test_phase.timer = 5;
	    $interval(function() {
		test_phase.timer += 1;
		if (test_phase.timer > 100) {
		    test_phase.timer = 1;
		}
		// hardcoded count down
		test_phase.diff = new Date(date + ' 20:00 GMT+0800 (SGT)') - new Date();
	    }, 100, 0, true);
	}

	function timeDiff(difference) {
	    var hours = Math.floor(difference / 36e5),
		minutes = Math.floor(difference % 36e5 / 60000),
		seconds = Math.floor(difference % 60000 / 1000);

	    if (hours >= 0) {
		return "Time left: ".concat(addZero(hours) + ":" +
					    addZero(minutes) + ":" +
					    addZero(seconds));
	    } else {
		return "Overtime: ".concat(addZero(-hours) + ":" +
					    addZero(-minutes) + ":" +
					    addZero(-seconds));
	    }
	    
	    function addZero(part) {
		if(part < 10) {
		    return '0'.concat(part);
		} else {
		    return part;
		}
	    }
	}

	function errorFn(data, status, headers, config) {
	    Snackbar.error(data.data.error);
	}

	function isPassed() {
	    if(!test_phase.state){
		return false;
	    }
	    return (test_phase.state.split(' ')[0] == 'passed');		
	}

	function isCurrent() {
	    return (test_phase.state == 'current');
	}
	
	function isWaiting() {
	    return (test_phase.state == 'waiting');
	}
	
	function destroy(){
	    $rootScope.$broadcast('test-phase.deleted', $scope.testPhase);
	}
    }
})();
