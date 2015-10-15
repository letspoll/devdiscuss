var app = angular.module('questionAdminApp', []);
app.controller('questionAdminCtrl', function($scope, $http) {
    $scope.questions = '';
    $scope.lastQuestionId = '0';
        
    $scope.getQuestionAll = function() {
      $http.get("http://52.89.252.154/getQuestionAll/" + $scope.lastQuestionId)
        .success(function(data, status, headers, config) {
          alert(data);
          $scope.questions = data;
        });
    };
    
});
