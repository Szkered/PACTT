!function(){"use strict";function e(e,t,o,r){function n(){console.log("[INFO] activate registerController"),o.isAuthenticated()&&e.url("/")}function a(){s.password==s.confirm_password?o.register(s.sid,s.password,s.email,s.first_name,s.last_name,s.lob.key):r.error("Passwords have to agree!")}var s=this;s.register=a,s.lobTypes=[{key:"G",value:"GTRM"},{key:"C",value:"CIB TRM"}],n()}angular.module("PACTT.authentication.controllers").controller("RegisterController",e),e.$inject=["$location","$scope","Authentication","Snackbar"]}();