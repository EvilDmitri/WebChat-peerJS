'use strict';

angular.module('webChatApp')
  .controller('ChatCtrl', function ($scope, $location,  Auth) {
    $scope.isLoggedIn = Auth.isLoggedIn;
    if (!$scope.isLoggedIn()){
      $location.path('/login');
    }

    $scope.getCurrentUser = Auth.getCurrentUser;
    var user = Auth.getCurrentUser();
    $scope.user = user;

    $scope.data = {'message': $scope.user._id};


    console.log($scope.user);

    $scope.data.text = 'empty';
    var peer = new Peer(user._id, {key: 'ewlwq5erdvxwdn29'});

    peer.on('connection', function(conn) {
      conn.on('data', function(data){
        // Will print 'hi!'
        console.log(data);
      });
    });

    $scope.peerconnect = function () {
      var conn = peer.connect('569b8af6a8690c8f18f9024d');
      conn.on('open', function(){
        conn.send('hi!');
      });
    }


  });
