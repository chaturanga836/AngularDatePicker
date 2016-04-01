var notePad = angular.module('textpad', []);

notePad.directive('textEditor',function(){
   return{
 
       link:function(scope, element, attr){
          
           //console.log(scope);
       },
       
       controller:function($scope,$element){
         $scope.getfont=function(){
             
         } 
         
         $scope.getfontSize=function(){
             
         }
         
         $scope.getColor=function(){
             
         }
         
         $scope.getAlignment=function(){
             
         }
         
         $scope.textDecor=function(){
             
         }
         
         $scope.addPicture=function(){
             
         }
         
         $scope.addyoutube=function(){
             
         }
         
         $scope.addLink=function(){
             
         }
         
         $scope.addFile=function(){
             
         }
         
         $('#345textEditor').keyup(function(e){
            
             $scope.$apply(function(){
                $scope.HtmlContent=$(this).html();
             });
         })
         
       }
   }
});

notePad.directive('textPad',function(){
   return{
       link:function(scope, element, attr){
           
       },
       
       controller:function($scope,$element){
           
       }
   }
});

notePad.directive('dateTimePicker', function(){
            return {
            require: '?ngModel',
            restrict: 'AE',
            scope: {
                pick12HourFormat: '@',
                language: '@',
                useCurrent: '@',
                location: '@'
            },
            link: function (scope, elem, attrs) {
                elem.datetimepicker({
                    pick12HourFormat: scope.pick12HourFormat,
                    language: scope.language,
                    useCurrent: scope.useCurrent
                })

                //Local event change
                elem.on('blur', function () {

                    console.info('this', this);
                    console.info('scope', scope);
                    console.info('attrs', attrs);


                    /*// returns moments.js format object
                    scope.dateTime = new Date(elem.data("DateTimePicker").getDate().format());
                    // Global change propagation
                    $rootScope.$broadcast("emit:dateTimePicker", {
                        location: scope.location,
                        action: 'changed',
                        dateTime: scope.dateTime,
                        example: scope.useCurrent
                    });
                    scope.$apply();*/
                })
            }
        }
});


notePad.controller('dateTimeController', 
    ['$scope', '$http','$rootScope',function ($scope,$http ,$rootScope) {
    
            $scope.vm = {
            message: "Bootstrap DateTimePicker Directive",
            dateTime: {}
        };

        $scope.$watch('change', function(){
            console.log($scope.vm.dateTime);
        });
}]);

