'use strict';

angular.module('webChatApp')
  .controller('ChatCtrl', function ($scope, $location, $http, socket, Auth) {

    $http.get('/api/peers').success(function(Peers) {
      $scope.peers = Peers;
      socket.syncUpdates('peer', $scope.peers);
    });


    $scope.addPeer = function() {
      if($scope.newPeer === '') {
        return;
      }
      $http.post('/api/peers', { name: $scope.newPeer });
      $scope.newPeer = '';
    };

    //$scope.deleteThing = function(thing) {
    //  $http.delete('/api/things/' + thing._id);
    //};

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('peer');
    });



    $scope.isLoggedIn = Auth.isLoggedIn;
    if (!$scope.isLoggedIn()){
      $location.path('/login');
    }

    $scope.getCurrentUser = Auth.getCurrentUser;
    var user = Auth.getCurrentUser();
    $scope.user = user;

    //console.log($scope.user);

    $scope.data = {text: 'empty'};
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
