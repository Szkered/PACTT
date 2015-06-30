(function (){
    'use strict';
    
    angular
	.module('PACTT.profiles.services')
	.factory('Profile', Profile);

    Profile.$inject = ['$http'];


    function Profile($http) {
	var Profile = {
	    destroy: destroy,
	    get: get,
	    update: update
	};

	return Profile;


	function destroy(profile) {
	    return $http.delete('/api/v1/accounts/' + profile.id + '/');
	}

	function get(sid) {
	    return $http.get('/api/v1/accounts/' + sid + '/');
	}

	function update(profile) {
	    return $http.put('/api/v1/accounts/' + profile.sid + '/', profile);
	}
    }
})();
