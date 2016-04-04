(function(window){
    var calander = angular.module('calander', []);
    
    calander.config(function($interpolateProvider) {
       $interpolateProvider.startSymbol('<%');
       $interpolateProvider.endSymbol('%>');
     });
    calander.directive('datePicker',function($compile){
       return{
           scope: {
                format:"@dateFormat"
            },
           
           compile:function(elem, attr){        
               return{
                   pre:function(scope,elements,attrs){
                            scope.d=new Date(); 
                        
                           scope.curDate={
                                           year:scope.d.getFullYear(),
                                           month:scope.d.getMonth(),
                                           day:scope.d.getDay(),
                                           date:scope.d.getDate(),
                                           hour:scope.d.getHours(),
                                           min:scope.d.getMinutes(),
                                           sec:scope.d.getSeconds(),
                                           milsec:scope.d.getMilliseconds(),
                                       };
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
                           //var prev=new Date(year,month,1);
                           
                           
                           var days=[];
                           var weeks=[];
                           d.setDate(d.getDate()-1);      
                           while(d.getDay()>0){
                                
                               days.unshift({state:'prev-d',date:d.getDate()});
                               d.setDate(d.getDate()-1);                             
                               
                           }
                           
                           d=new Date(year,month,1);
                           while (d.getMonth() === month) {
                               
                              days.push({state:'cur-d',date:d.getDate()});
                              d.setDate(d.getDate() + 1);
                          }
                           
                           weeks[0]=days.slice(0,7);
                           weeks[1]=days.slice(7,14);
                           weeks[2]=days.slice(14,21);
                           weeks[3]=days.slice(21,28);
                           weeks[4]=days.slice(28,35);
                           weeks[5]=days.slice(35,42);
                  
                          while(weeks[4].length <7){
                              
                              
                              weeks[4].push({state:'next-d',date:d.getDate()});
                              d.setDate(d.getDate() + 1);
                          }
                           if(weeks[5].length>0){
                              while(weeks[5].length <7){
                                weeks[5].push({state:'next-d',date:d.getDate()});
                                d.setDate(d.getDate() + 1);
                             } 
                           }
                           
                           
               
                           return weeks;
                       }
                       
                            
                      scope.$watch('curDate.month',function(oldVal,newVal){                       
                              
                                if(oldVal !=newVal){
                                    scope.weeks=scope.getDatesofMonths(scope.d.getFullYear(),scope.d.getMonth());
                                    scope.curDate.year=scope.d.getFullYear();
                                }
                           
 
                      });
                       
                     scope.$watch('curDate.year',function(oldVal,newVal){
                              
                         if(oldVal !=newVal){
                              scope.d.setFullYear(newVal);
                              scope.weeks=scope.getDatesofMonths(scope.d.getFullYear(),scope.d.getMonth());
                         }
                              
                     });
              
                       scope.yearNow=scope.d.getFullYear();    
                       scope.calanderDate=true;
                       scope.calanderMonth=false;
                       scope.calanderYear=false;
                       
                       scope.yearFrom=scope.d.getFullYear();
                       scope.yearTo=scope.d.getFullYear()+11;
                       
                       scope.weeks=scope.getDatesofMonths(scope.d.getFullYear(),scope.d.getMonth());
            
                       
                       var cal_date_pick='<div ng-show="calanderDate" class="calander"><table>\
                        <thead>\
                          <tr><th ng-click="prev()" class="nav">«</th><th colspan="5" ng-click="showMonths()" class="head"><% months[curDate.month]%> <%curDate.year%></th><th ng-click="nex()" class="nav">»</th></tr>\
<tr class="head"><th>Mo</th><th>Tu</th><th>We</th><th>Th</th><th>Fr</th><th>Sa</th><th>Su</th></tr>\
                        </thead>\
                        <tbody>\
                          <tr ng-repeat="we in weeks track by $index">\
                              <td class="date" ng-repeat="da in we" ng-class="da.state" ng-click="selectDate(da)"><%da.date%></td>\
                          </tr>\
                        </tbody>\
                        </table></div>';   
                       
                      var cal_month_pick='<div ng-show="calanderMonth" class="calander"><table>\
                        <thead>\
                          <tr><th ng-click="prev()" class="nav">«</th><th colspan="2" ng-click="showYears()" class="head"><%yearNow%></th><th ng-click="nex()" class="nav">»</th></tr>\
                        </thead>\
                        <tbody>\
                          <tr><td class="month" ng-click="selectMonth(1)">JAN</td><td class="month" ng-click="selectMonth(2)">FEB</td><td class="month" ng-click="selectMonth(3)">MAR</td><td class="month" ng-click="selectMonth(4)">APR</td></tr>\
                          <tr><td class="month" ng-click="selectMonth(5)">MAY</td><td class="month" ng-click="selectMonth(6)">JUN</td><td class="month" ng-click="selectMonth(7)">JUL</td><td class="month" ng-click="selectMonth(8)">AUG</td></tr>\
                          <tr><td class="month" ng-click="selectMonth(9)">SEP</td><td class="month" ng-click="selectMonth(10)">OCT</td><td class="month" ng-click="selectMonth(11)">NOV</td><td class="month" ng-click="selectMonth(12)">DEC</td></tr>\
                        </tbody>\
                        </table></div>';
                       
                      var cal_year_pick='<div ng-show="calanderYear" class="calander"><table>\
                        <thead>\
                          <tr><th ng-click="prevYear()" class="nav">«</th><th colspan="2" class="head"><%curDate.year%> - <%curDate.year+11%></th><th ng-click="nextYear()" class="nav">»</th></tr>\
                         </thead>\
                        <tbody>\
                          <tr><td class="year" ng-click="selectYear(0)"><%curDate.year%></td><td class="year"ng-click="selectYear(1)"><%(curDate.year+1)%></td><td class="year" ng-click="selectYear(2)"><%(curDate.year+2)%></td><td class="year" ng-click="selectYear(3)"><%(curDate.year+3)%></td></tr>\
                          <tr><td class="year" ng-click="selectYear(4)"><%(curDate.year+4)%></td><td class="year" ng-click="selectYear(5)"><%(curDate.year+5)%></td><td class="year" ng-click="selectYear(6)"><%(curDate.year+6)%></td><td class="year" ng-click="selectYear(7)"><%(curDate.year+7)%></td></tr>\
                          <tr><td class="year" ng-click="selectYear(8)"><%(curDate.year+8)%></td><td class="year" ng-click="selectYear(9)"><%(curDate.year+9)%></td><td class="year" ng-click="selectYear(10)"><%(curDate.year+10)%></td><td class="year" ng-click="selectYear(11)"><%(curDate.year+11)%></td></tr>\
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
                  $scope.calanderDate=true;
                  $scope.calanderMonth=false;
                  $scope.calanderYear=false;
              } 
            
            $scope.prev=function(){
                
                $scope.d.setMonth($scope.d.getMonth()-1);
                $scope.curDate.month=$scope.d.getMonth();
   
            } 
            
            $scope.prevYear=function(){
               $scope.curDate.year=$scope.curDate.year-11; 
            }
            
            $scope.nextYear=function(){
               $scope.curDate.year=$scope.curDate.year+11;  
            }
      
            $scope.nex=function(){
                
                $scope.d.setMonth($scope.d.getMonth()+1);
                $scope.curDate.month=$scope.d.getMonth();
                
              } 
            
            $scope.selectYear=function(inc){
                $scope.curDate.year=$scope.curDate.year+inc;
                
                 $scope.calanderDate=false;
                 $scope.calanderMonth=true;
                 $scope.calanderYear=false;
             }
            
            $scope.selectMonth=function(inc){
                $scope.d.setMonth(inc-1);
                $scope.curDate.month=(inc-1);
                
                $scope.calanderDate=true;
                $scope.calanderMonth=false;
                $scope.calanderYear=false;
                
            }
            
            $scope.selectDate=function(da){
                if(da.state=='cur-d'){
                    $scope.d.setDate(da.date);
                    $scope.curDate.date=da.date;
                    
                  $scope.calanderDate=false;
                  $scope.calanderMonth=false;
                  $scope.calanderYear=false;
                }
            }
           },
       } 
    });

})(window)