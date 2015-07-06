(function () {
    'use strict';

    angular
	.module('PACTT.authentication.services')
	.factory('Authentication', Authentication);

    Authentication.$inject = ['$cookies', '$http'];


    function Authentication($cookies, $http) {
	var Authentication = {
	    getAuthenticatedAccount : getAuthenticatedAccount,
	    isAuthenticated: isAuthenticated,
	    login: login,
	    logout: logout,
	    register: register,
	    setAuthenticatedAccount: setAuthenticatedAccount,
	    unauthenticate: unauthenticate
	};

	return Authentication;

	function register(sid, password, email, first_name, last_name, lob) {
	    return $http.post('/api/v1/accounts/', {
		sid: sid,
		password: password,
		email: email,
		first_name: first_name,
		last_name: last_name,
		lob: lob
	    }).then(registerSuccessFn, registerErrorFn);

	    function registerSuccessFn(data, status, headers, config) {
		Authentication.login(sid, password);
	    }

	    function registerErrorFn(data, status, headers, config) {
		console.error('Registration failure!')
	    }
	}

	function login(sid, password) {
	    return $http.post('/api/v1/auth/login/', {
		sid: sid, password: password
	    }).then(loginSuccessFn, loginErrorFn);

	    function loginSuccessFn(data, status, headers, config) {
		Authentication.setAuthenticatedAccount(data.data);

		window.location = '/';
	    }

	    function loginErrorFn(data, status, headers, config) {
		console.error('Login failure!');
	    }
	}

	function logout() {
	    return $http.post('/api/v1/auth/logout/')
		.then(logoutSuccessFn, logoutErrorFn);

	    function logoutSuccessFn(data, status, headers, config) {
		Authentication.unauthenticate();

		window.location = '/';
	    }

	    function logoutErrorFn(data, status, headers, config) {
		console.error('Logout failure!');
	    }
	}

	function getAuthenticatedAccount() {
	    if (!$cookies.get('authenticatedAccount')) {
		return;
	    }
	    
	    return $cookies.getObject('authenticatedAccount');
	}

	function isAuthenticated() {
	    console.log('[DEBUG] auth invoked: ' + $cookies.get('authenticatedAccount'));
	    return !!$cookies.getObject('authenticatedAccount');
	}

	function setAuthenticatedAccount(account) {
	    $cookies.putObject('authenticatedAccount', account)
	}

	function unauthenticate() {
	    $cookies.remove('authenticatedAccount');
	}
    }
})();
