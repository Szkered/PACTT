(function (){
    'use strict';
    
    angular
	.module('PACTT.planner.services')
	.factory('Apps', Apps);

    Apps.$inject = ['$http'];


    function Apps($http) {
	var Apps = {
	    all: all,
	    // create: create,
	    get: get
	};

	return Apps;

	function all() {
	    return $http.get('/api/v1/apps/');
	}

	function get(app_id) {
	    return $http.get('/api/v1/apps/' + app_id + '/');
	}
    }
})();
