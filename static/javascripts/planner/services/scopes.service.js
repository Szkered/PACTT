(function (){
    'use strict';
    
    angular
	.module('PACTT.planner.services')
	.factory('Scopes', Scopes);

    Scopes.$inject = ['$http'];


    function Scopes($http) {
	var Scopes = {
	    all: all,
	    create: create,
	    get: get,
	    update: update,
	    destroy: destroy
	};

	return Scopes;

	function all() {
	    return $http.get('/api/v1/scopes/');
	}

	function create(event_id, app_id) {
	    return $http.post('/api/v1/scopes/', {
		event: event_id,
		app: app_id
	    });
	}

	function get(event_id) {
	    return $http.get('/api/v1/events/' + event_id + '/scopes/');
	}

	function update(scope){
	    return $http.put('/api/v1/scopes/' + scope.id + '/', scope);
	}

	function destroy(id){
	    return $http.delete('/api/v1/scopes/' + id + '/');
	}
    }
})();
