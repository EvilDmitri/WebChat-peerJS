'use strict';

angular.module('webChatApp')
  .controller('LoginCtrl', function ($scope, Auth, $location) {
    $scope.user = {};
    $scope.errors = {};

    $scope.login = function(form) {
      $scope.submitted = true;

      if(form.$valid) {
        Auth.login({
          email: $scope.user.email,
          password: $scope.user.password
        })
        .then( function() {
          // Logged in, redirect to chatroom
          $location.path('/chat');
        })
        .catch( function(err) {
          $scope.errors.other = err.message;
        });
      }
    };

  });
