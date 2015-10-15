var app = angular.module('pollAdminApp', []);
app.controller('pollAdminCtrl', function($scope, $http, $timeout) {
    $scope.pollSum = '0';
    $scope.pollChar = 'W';
    $scope.pollPercent = '0';
    $scope.pollPercentL = '0';
    $scope.pollPercentD = '0';
    $scope.pollL = '0';
    $scope.pollD = '0';
    
    
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
          var percent = 0;
          for (var i in data) {
            var record = data[i];
            if(record._id === $scope.pollChar) {
              percent = record.count;    
              break;
            }
          }

          $scope.pollPercent = percent;     
                  
          $scope.stopView();
          stop = $timeout($scope.getPollCount, 1000);
        });

    };
    
    $scope.getPollCountAll = function() {
      $http.post("http://52.89.252.154/getPollReport")
        .success(function(data, status, headers, config) {
          var denominator = 0;
          $scope.pollL = 0;
          $scope.pollD = 0;

          for (var i in data) {
            var record = data[i];
            if(record._id === "L") {
              $scope.pollL = record.count;
            } else if(record._id === "D") {
              $scope.pollD = record.count;
            }

            denominator += record.count;
          }

          $scope.pollPercentL = parseInt($scope.pollL / denominator * 100) ;
          $scope.pollPercentD = parseInt($scope.pollD / denominator * 100) ;
                  
          $scope.stopView();
          stop = $timeout($scope.getPollCountAll, 1000);
        });

    };

    $scope.initAll = function() {
      $scope.getPollCountAll();
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
