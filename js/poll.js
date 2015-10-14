var app = angular.module('pollApp', []);
app.controller('pollCtrl', function($scope, $http) {
    $scope.currentPollChar = '';
    $scope.result = '';
    
    $scope.doPoll = function(pollChar) {
      if($scope.currentPollChar != pollChar) {
        $scope.currentPollChar = pollChar;

        //서버API 호출
        //$http.get("http://localhost/poll/" + pollChar)
        $http.get("http://52.89.252.154/poll/" + pollChar)
          .success(function(response) {
            $scope.result = response;
          });
      }
    };

    $scope.getSelectedClass = function(pollChar) {
      if($scope.currentPollChar === pollChar) {
        return "item-selected";
      } else {
        return "";
      }
    }
    
});
