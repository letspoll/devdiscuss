var app = angular.module('pollApp', []);
app.controller('pollCtrl', function($scope, $http) {
    $scope.currentPollNo = '';
    $scope.result = '';
    
    $scope.doPoll = function(pollNo) {
      if($scope.currentPollNo != pollNo) {
        $scope.currentPollNo = pollNo;

        //서버API 호출
        $http.get("http://localhost:3000/poll/" + pollNo)
          .success(function(response) {
            $scope.result = response;
          });
      }
    };
    
});
