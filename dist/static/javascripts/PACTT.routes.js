!function(){"use strict";function t(t){t.when("/",{controller:"IndexController",controllerAs:"vm",templateUrl:"/static/templates/layout/index.html"}).when("/register",{controller:"RegisterController",controllerAs:"vm",templateUrl:"/static/templates/authentication/register.html"}).when("/login",{controller:"LoginController",controllerAs:"vm",templateUrl:"/static/templates/authentication/login.html"}).when("/:sid",{controller:"ProfileController",controllerAs:"vm",templateUrl:"/static/templates/profiles/profile.html"}).when("/:sid/settings",{controller:"ProfileSettingsController",controllerAs:"vm",templateUrl:"/static/templates/profiles/settings.html"}).when("/planner/:event_id",{controller:"PlannerController",controllerAs:"vm",templateUrl:"/static/templates/planner/planner.html"}).when("/tracker/:event_id",{controller:"TrackerController",controllerAs:"vm",templateUrl:"/static/templates/tracker/tracker.html"}).when("/executor/:event_id",{controller:"ExecutorController",controllerAs:"vm",templateUrl:"/static/templates/executor/executor.html"}).otherwise("/")}angular.module("PACTT.routes").config(t),t.$inject=["$routeProvider"]}();