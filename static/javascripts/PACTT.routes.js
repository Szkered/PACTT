(function () {
    'use strict';

    angular
	.module('PACTT.routes')
	.config(config);

    config.$inject = ['$routeProvider'];


    function config($routeProvider) {
	$routeProvider.when('/', {
	    controller: 'IndexController',
	    controllerAs: 'vm',
	    templateUrl: '/static/templates/layout/index.html'
	}).when('/register', {
	    controller: 'RegisterController',
	    controllerAs: 'vm',
	    templateUrl: '/static/templates/authentication/register.html'
	}).when('/login', {
	    controller: 'LoginController',
	    controllerAs: 'vm',
	    templateUrl: '/static/templates/authentication/login.html'
	}).when('/:sid', {
	    controller: 'ProfileController',
	    controllerAs: 'vm',
	    templateUrl: '/static/templates/profiles/profile.html'
	}).when('/:sid/settings', {
	    controller: 'ProfileSettingsController',
	    controllerAs: 'vm',
	    templateUrl: '/static/templates/profiles/settings.html'
	}).when('/planner/:event_id', {
	    controller: 'PlannerController',
	    controllerAs: 'vm',
	    templateUrl: '/static/templates/planner/planner.html'
	}).when('/tracker/:event_id', {
	    controller: 'TrackerController',
	    controllerAs: 'vm',
	    templateUrl: '/static/templates/tracker/tracker.html'
	}).otherwise('/');
    }
})();
