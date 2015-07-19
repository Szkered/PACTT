(function () {
    'use strict';

    angular
	.module('PACTT.apps.services')
	.factory('Assignments', Assignments);

    Assignments.$inject = ['$cookies', '$http'];


    function Assignments($cookies, $http) {
	var Assignments = {
	    get: get
	};

	return Assignments;

	function get(account_sid) {
	    return $http.get('/api/v1/accounts/' + account_sid + '/assignments/');
	}
    }
})();
