angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {
    var onSuccess = function(contacts) {
      $scope.contacts = [];
      for (var i=0; i < contacts.length; i++) {
        var newContact = {
          displayName : contacts[i].displayName,
          email : (contacts[i].emails == undefined) ? "email not found" : contacts[i].emails[0].value,
          image : (contacts[i].photos == undefined) ? "img/img_placeholder.png" : contacts[i].photos[0].value
        }
        $scope.contacts.push(newContact);
      };
      //alert('Found ' + contacts.length + ' contacts.');
    };

    var onError = function(contactError) {
      $scope.contacts = [];
      alert('onError!');
    };

// find all contacts with 'Bob' in any name field

    $scope.findContact = function(searchText) {
      var options = new ContactFindOptions();
      options.filter = searchText;
      options.multiple = true;
      options.desiredFields = [navigator.contacts.fieldType.id, navigator.contacts.fieldType.photos, navigator.contacts.fieldType.displayName, navigator.contacts.fieldType.emails, navigator.contacts.fieldType.name];
      options.hasPhoneNumber = true;
      var fields = [navigator.contacts.fieldType.displayName, navigator.contacts.fieldType.name];
      navigator.contacts.find(fields, onSuccess, onError, options);
    }
  })

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})


.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
