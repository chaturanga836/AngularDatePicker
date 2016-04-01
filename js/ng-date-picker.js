(function(window){
    var calander = angular.module('calander', []);
    
    calander.directive('datePicker',function($compile){
       return{
           scope: {
                format:"@dateFormat"
            },
           
           compile:function(elem, attr){        
               return{
                   pre:function(scope,elements,attrs){
                            scope.d=new Date(); 
                           /* scope.curDate={
                                           year:d.getFullYear(),
                                           month:d.getMonth(),
                                           day:d.getDay(),
                                           date:d.getDate(),
                                           hour:d.getHours(),
                                           min:d.getMinutes(),
                                           sec:d.getSeconds(),
                                           milsec:d.getMilliseconds(),
                                       };*/
                              scope.months=[
                                       "January",
                                       "February",
                                       "March",
                                       "April",
                                       "May",
                                       "June",
                                       "July",
                                       "Aughest",
                                       "September",
                                       "October",
                                       "November",
                                       "December",
                                      ];
                           
                       scope.getDatesofMonths=function(year,month){
                           
                           var d=new Date(year,month,1);
                           var days=[];
                       
                               
                               days.splice(d.getDay(),1,d.getDate())
                               
                               d.setDate(d.getDate() + 1);
                           
                           while (d.getMonth() === month) {
                               
                              days.push(d.getDate());
                              d.setDate(d.getDate() + 1);
                          }
                           
                           return days;
                       }
                       
                       scope.yearNow=scope.d.getFullYear();    
                       scope.calanderDate=true;
                       scope.calanderMonth=false;
                       scope.calanderYear=false;
                       
                       scope.yearFrom=scope.yearNow;
                       scope.yearTo=scope.yearFrom+11;
                       
                       scope.weeks=[];
                       
                       scope.cd=scope.getDatesofMonths(scope.d.getFullYear(),scope.d.getMonth());
                       
                       scope.weeks[0]=scope.cd.slice(0,7);
                       scope.weeks[1]=scope.cd.slice(7,14);
                       scope.weeks[2]=scope.cd.slice(14,21);
                       scope.weeks[3]=scope.cd.slice(21,28);
                       scope.weeks[4]=scope.cd.slice(28,35);
                       
            
                       
                       var cal_date_pick='<div ng-show="calanderDate" class="calander"><table>\
                        <thead>\
                          <tr><th ng-click="prev()" class="nav">«</th><th colspan="5" ng-click="showMonths()" class="head">'+scope.months[scope.d.getMonth()]+' '+scope.yearNow+'</th><th ng-click="nex()" class="nav">»</th></tr>\
<tr class="head"><th>Su</th><th>Mo</th><th>Tu</th><th>We</th><th>Th</th><th>Fr</th><th>Sa</th></tr>\
                        </thead>\
                        <tbody>\
                          <tr ng-repeat="we in weeks track by $index">\
                              <td class="date" ng-repeat="da in we">{{da}}</td>\
                          </tr>\
                        </tbody>\
                        </table></div>';   
                       
                      var cal_month_pick='<div ng-show="calanderMonth" class="calander"><table>\
                        <thead>\
                          <tr><th ng-click="prev()" class="nav">«</th><th colspan="2" ng-click="showYears()" class="head">'+scope.yearNow+'</th><th ng-click="nex()" class="nav">»</th></tr>\
                        </thead>\
                        <tbody>\
                          <tr><td class="month">JAN</td><td class="month">FEB</td><td class="month">MAR</td><td class="month">APR</td></tr>\
                          <tr><td class="month">MAY</td><td class="month">JUN</td><td class="month">JUL</td><td class="month">AUG</td></tr>\
                          <tr><td class="month">SEP</td><td class="month">OCT</td><td class="month">NOV</td><td class="month">DEC</td></tr>\
                        </tbody>\
                        </table></div>';
                       
                      var cal_year_pick='<div ng-show="calanderYear" class="calander"><table>\
                        <thead>\
                          <tr><th ng-click="prevYeas()" class="nav">«</th><th colspan="2" class="head">'+scope.yearFrom+'-'+scope.yearTo+'</th><th ng-click="nexYeas()" class="nav">»</th></tr>\
                         </thead>\
                        <tbody>\
                          <tr><td class="year">'+scope.yearFrom+'</td><td class="year">'+(scope.yearFrom+1)+'</td><td class="year">'+(scope.yearFrom+2)+'</td><td class="year">'+(scope.yearFrom+3)+'</td></tr>\
                          <tr><td class="year">'+(scope.yearFrom+4)+'</td><td class="year">'+(scope.yearFrom+5)+'</td><td class="year">'+(scope.yearFrom+6)+'</td><td class="year">'+(scope.yearFrom+7)+'</td></tr>\
                          <tr><td class="year">'+(scope.yearFrom+8)+'</td><td class="year">'+(scope.yearFrom+9)+'</td><td class="year">'+(scope.yearFrom+10)+'</td><td class="year">'+(scope.yearFrom+11)+'</td></tr>\
                        </tbody>\
                        </table></div>';
                       
                    
                    var el='<div class="input-group date-picker">\
                      <input type="text" class="ng-calander form-control" ng-focus="showCalender()" ng-blur="hideCaldender()">\
                          <div class="input-group-addon">\
                          </div>\
                          '+cal_date_pick+''+cal_month_pick+''+cal_year_pick+'\
                          </div>';
                       el=$compile(el)(scope);
                       elements.append(el);
              
                   },
                   post:function(scope,elements,attrs){
                  
                   }
               }
           },
           
           
           controller:function($scope,$element){

               
             $scope.showMonths=function(){
                 $scope.calanderDate=false;
                 $scope.calanderMonth=true;
                 $scope.calanderYear=false;
             }
             
             $scope.showYears=function(){
                 $scope.calanderDate=false;
                 $scope.calanderMonth=false;
                 $scope.calanderYear=true;
             }
            
              $scope.showCalender=function(){
                  console.log($scope.format.match(/^[y|m|d|h|i|s|t]+/gim))
              } 
            
            $scope.prev=function(){
                $scope.d.setMonth($scope.d.getMonth()-1); 
            } 
            
            $scope.nex=function(){
                 $scope.d.setMonth($scope.d.getMonth()+1);
              } 
           },
       } 
    });

})(window)