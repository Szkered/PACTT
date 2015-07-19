(function (){
    'use strict';
    
    angular
	.module('PACTT.events.services')
	.factory('Events', Events);

    Events.$inject = ['$http'];


    function Events($http) {
	var Events = {
	    all: all,
	    // create: create,
	    get: get
	};

	return Events;

	function all() {
	    return $http.get('/api/v1/events/');
	}

	function get(event_id) {
	    return $http.get('/api/v1/events/' + event_id + '/');
	}
    }
})();
