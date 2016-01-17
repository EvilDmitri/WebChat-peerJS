'use strict';

angular.module('webChatApp')
  .controller('MainCtrl', function ($scope, $http, socket, Modal, $location) {




    $scope.modal=Modal.confirm.askToLogin(function(message) { // callback when modal is confirmed
      console.log(message);

      if(message === 'login') {
        $location.path("/login"); //will redirect to login page
      }
      if(message === 'signup') {
        $location.path("/signup");
      }
      });


  });
