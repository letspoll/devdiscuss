var app = angular.module('pollAdminApp', []);
app.controller('pollAdminCtrl', function($scope, $http, $timeout) {
    $scope.pollSum = '0';
    $scope.pollChar = 'W';
    $scope.pollPercent = '0';
    
    var stop;
    
    $scope.getPollCount = function() {
      
      // $http.get("http://localhost/view/" + $scope.pollChar)
      // //$http.get("http://52.89.252.154/view/" + $scope.pollChar)
      //   .success(function(data, status, headers, config) {
      //     $scope.pollPercent = data;

      //     $scope.stopView();
      //     stop = $timeout($scope.getPollCount, 1000);
      //   });

      $http.post("http://52.89.252.154/getPollReport")
        .success(function(data, status, headers, config) {
          for (var i in data) {
            var record = data[i];
            if(record._id === $scope.pollChar) {
              $scope.pollPercent = record.count;    
              break;
            }
          }          
                  
          $scope.stopView();
          stop = $timeout($scope.getPollCount, 1000);
        });

    };
    
    $scope.init = function(pollChar) {
      $scope.pollChar = pollChar;
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