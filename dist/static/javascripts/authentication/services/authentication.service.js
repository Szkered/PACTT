!function(){"use strict";function t(t,n){function e(t,e,o,i,c,u){function a(n,o,i,c){f.login(t,e)}function r(t,n,e,o){console.error("Registration failure!")}return n.post("/api/v1/accounts/",{sid:t,password:e,email:o,first_name:i,last_name:c,lob:u}).then(a,r)}function o(t,e){function o(t,n,e,o){f.setAuthenticatedAccount(t.data),window.location="/"}function i(t,n,e,o){console.error("Login failure!")}return n.post("/api/v1/auth/login/",{sid:t,password:e}).then(o,i)}function i(){function t(t,n,e,o){f.unauthenticate(),window.location="/"}function e(t,n,e,o){console.error("Logout failure!")}return n.post("/api/v1/auth/logout/").then(t,e)}function c(){return t.get("authenticatedAccount")?t.getObject("authenticatedAccount"):void 0}function u(){return!!t.getObject("authenticatedAccount")}function a(n){t.putObject("authenticatedAccount",n)}function r(){t.remove("authenticatedAccount")}function s(){if(c()){var t=c().lob;return"C"===t||"G"===t}return!1}var f={getAuthenticatedAccount:c,isAuthenticated:u,login:o,logout:i,register:e,setAuthenticatedAccount:a,unauthenticate:r,isAdmin:s};return f}angular.module("PACTT.authentication.services").factory("Authentication",t),t.$inject=["$cookies","$http"]}();