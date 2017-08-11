'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', function($scope, $http, $log) {
    $http.get('http://localhost:3928/api/person/')
        .then(function(response) {
            $scope.person = response.data;
            },
        function myError(response) {
            console.log(response);
        });
    
    $scope.selected = {};

    // gets the template to ng-include for a table row / item
    $scope.getTemplate = function (item) {
        if (item.LastName === $scope.selected.LastName) return 'edit';
        else return 'display';
    };

    $scope.editPerson = function (item) {
        $scope.selected = angular.copy(item);
    };

    $scope.savePerson = function (item) {
            var data = $.param({
                FirstName: item.FirstName,
                LastName: item.LastName,
                JobTitle: item.JobTitle
            });
        
            $http.put('http://localhost:3928/api/person?'+ data)
            .success(function (data, status, headers, log) {
                $scope.ServerResponse = data;
                console.log("Successfull call to API Update.");
                $scope.reset();

            })
            .error(function (data, status, header, config) {
                $scope.ServerResponse = "Data: " + data +
                    "\n\n\n\nstatus: " + status +
                    "\n\n\n\nheaders: " + header +
                    "\n\n\n\nconfig: " + config;
            });
        
        };

    $scope.reset = function () {
        $scope.selected = {};
    };

});