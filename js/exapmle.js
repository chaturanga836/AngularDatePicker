(function(window){
    
    var msg=angular.module('datetimeExample', ['lscalander']);
    
    msg.controller('birthDate',['$scope',function($scope){
         $scope.birthday="My Day";
         $scope.publishdate="Publish Day"
    }]);
})(window)