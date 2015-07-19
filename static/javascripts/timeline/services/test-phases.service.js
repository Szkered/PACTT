(function (){
    'use strict';
    
    angular
	.module('PACTT.timeline.services')
	.factory('TestPhases', TestPhases);

    TestPhases.$inject = ['$http'];


    function TestPhases($http) {
	var TestPhases = {
	    all: all,
	    create: create,
	    get: get,
	    update: update,
	    destroy: destroy
	};

	return TestPhases;

	function all() {
	    return $http.get('/api/v1/test_phases/');
	}

	function create(event_id, description, startTime, endTime, lob) {
	    return $http.post('/api/v1/test_phases/', {
		event: event_id,
		description: description,
		startTime: startTime,
		endTime: endTime,
		lob: lob
	    });
	}

	function get(event_id) {
	    return $http.get('/api/v1/events/' + event_id + '/test_phases/');
	}

	function update(test_phase){
	    return $http.put('/api/v1/test_phases/' + test_phase.id + '/', test_phase);
	}

	function destroy(id){
	    return $http.delete('/api/v1/test_phases/' + id + '/');
	}
    }
})();
