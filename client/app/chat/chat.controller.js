'use strict';

angular.module('webChatApp')
  .controller('ChatCtrl', function ($scope, $location, $http, socket, Auth) {


    socket.socket.on('message', function(message) {

      $scope.peers = message.data;
      console.log($scope.peers);
      //var newElement = $('<div></div>').text(message.text);
      //$('#messages').append(newElement);
    });

    $scope.sendId = function(name, id) {
      var message = {
        name: name,
        id: id
      };
      //console.log(message);
      socket.socket.emit('connected', message);
    };


    //$http.get('/api/peers').success(function(Peers) {
    //  $scope.peers = Peers;
    //  socket.syncUpdates('peer', $scope.peers);
    //});


    //$scope.addPeer = function() {
    //  if($scope.newPeer === '') {
    //    return;
    //  }
    //  $http.post('/api/peers', { name: $scope.newPeer });
    //  $scope.newPeer = '';
    //};

    //$scope.deleteThing = function(thing) {
    //  $http.delete('/api/things/' + thing._id);
    //};

    $scope.$on('$destroy', function () {
      $scope.sendId = function(name, id) {
      var message = {
        name: name,
        id: id
      };
      //console.log(message);
      socket.socket.emit('disconnected', message);
    };
      //  Add current user to peers
      //$http.delete('/api/peers', { id: $scope.session.peerId});
      //socket.unsyncUpdates('peer');
    });



    $scope.isLoggedIn = Auth.isLoggedIn;
    if (!$scope.isLoggedIn()){
      $location.path('/login');
    }

    $scope.getCurrentUser = Auth.getCurrentUser;
    var user = Auth.getCurrentUser();
    $scope.user = user;

    $scope.init = function () {
      //  Add current user to peers
      //$http.post('/api/peers', { id: user._id, name: user.name });
      //$http({
      //  method: 'POST',
      //  url: '/api/peers'
      //}).
      //  then(function(response) {
      //    $scope.status = response.status;
      //    $scope.session = {
      //      peerId: response.data._id
      //    };
      //
      //  }, function(response) {
      //    $scope.data = response.data || "Request failed";
      //    $scope.status = response.status;
      //});

    };

    $scope.init();

    //console.log($scope.user);

    $scope.data = {text: 'empty'};
    var peer = new Peer(user._id, {key: 'ewlwq5erdvxwdn29'});   // PeerServer key



    peer.on('connection', function(conn) {
      conn.on('data', function(data){
        // Will print 'hi!'
        console.log(data);
      });
    });

    $scope.peerconnect = function () {
      console.log($scope.a);

      var conn = peer.connect('569b8af6a8690c8f18f9024d');
      conn.on('open', function(){
        conn.send('hi!');
      });
    };



    var getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
    $scope.makeCall = function () {
      getUserMedia({video: true, audio: true}, function(stream) {
        var call = peer.call('569bd6db66bb28bc0f4f91bd', stream);
        call.on('stream', function(remoteStream) {
          // Show stream in some video/canvas element.
        });
      }, function(err) {
        console.log('Failed to get local stream' ,err);
      });
    };

    peer.on('call', function(call) {
      getUserMedia({video: true, audio: true}, function(stream) {
        call.answer(stream); // Answer the call with an A/V stream.
        call.on('stream', function(remoteStream) {
          // Show stream in some video/canvas element.
        });
      }, function(err) {
        console.log('Failed to get local stream' ,err);
      });
    });



  });
