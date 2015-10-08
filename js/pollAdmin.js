var app = angular.module('pollAdminApp', []);
app.controller('pollAdminCtrl', function($scope, $http, $timeout) {
    $scope.pollSum = '0';
    $scope.pollNo = 'W';
    
    var stop;
    
    $scope.getPollCount = function() {
      
      $http.get("http://localhost:3000/view/" + $scope.pollNo)
        .success(function(data, status, headers, config) {
          $scope.pollSum = data;
          
          $scope.stopView();
          stop = $timeout($scope.getPollCount, 2000);
        });
    };
    
    $scope.init = function(pollNo) {
      $scope.pollNo = pollNo;
      $scope.getPollCount();
    };
    
    $scope.stopView = function() {
      if (angular.isDefined(stop)) {
        $timeout.cancel(stop);
        stop = undefined;
      }
    };
    
    $scope.$on('$destroy', function() {
      $scope.stopView();
    });
});