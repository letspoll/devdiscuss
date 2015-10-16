var app = angular.module('pollApp', []);
app.controller('pollCtrl', function($scope, $http) {
    $scope.currentPollChar = '';
    $scope.result = '';
//    $scope.question = '';
    
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
    };
/*
    $scope.doQuestion = function() {
      if($scope.question != '') {
        //서버API 호출
        //$http.post("http://52.89.252.154/question/", {'question' : $scope.question})        
        //$http.get("http://localhost/question/" + $scope.question)
        $http.get("http://52.89.252.154/question/" + $scope.question)
          .success(function(response) {
            $scope.question = '';
          });
      }
    };

    $scope.clearQuestion = function() {
      $scope.question = '';
    };
*/ 
});
