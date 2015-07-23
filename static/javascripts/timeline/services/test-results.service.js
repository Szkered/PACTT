(function () {
    'use strict';

    angular
	.module('PACTT.timeline.services')
	.factory('TestResults', TestResults);

    TestResults.$inject = ['$http'];


    function TestResults($http) {
	var TestResults = {
	    create: create,
	    get: get,
	    get_it: get_it,
	    get_from_test_phase: get_from_test_phase,
	    update: update
	};

	return TestResults;

	function create(app_id, testPhase_id, startTime, endTime){
	    return $http.post('/api/v1/test_results/', {
		app: app_id,
		testPhase: testPhase_id,
		startTime: startTime,
		endTime: endTime
	    });
	}

	function get_from_test_phase(test_phase_id) {
	    return $http.get('/api/v1/test_phases/' + test_phase_id + '/test_results/');
	}

	function get_it(id) {
	    return $http.get('/api/v1/test_results/' + id + '/');
	}

	function get(event_id) {
	    return $http.get('/api/v1/events/' + event_id + '/test_results/');
	}

	function update(test_result) {
	    return $http.put('/api/v1/test_results/' + test_result.id + '/', test_result);
	}
    }
})();
