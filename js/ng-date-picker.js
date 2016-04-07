(function(window){
    var calander = angular.module('lscalander', []);
    
    calander.config(function($interpolateProvider) {
       $interpolateProvider.startSymbol('<%');
       $interpolateProvider.endSymbol('%>');
     });
    calander.directive('datePicker',function($compile){
       return{
           restrict:'A',
           scope: {
                format:"@dateFormat",
                ngModel:"="
            },
           
           compile:function(elem, attr){        
               return{
                   pre:function(scope,elements,attrs){
                            scope.d=new Date(); 
                            //scope.datetimevalue=scope.format;
                           scope.today=new Date();
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
                            
                          
                              
                           //var reg=scope.format.match(/dd?|DD?|mm?|MM?|yy(?:yy)?/g);
                      
                             scope.yearR=scope.curDate.year;
                             scope.yeararr=[
                                 [scope.yearR+1,scope.yearR+2,scope.yearR+3,scope.yearR+4],
                                 [scope.yearR+5,scope.yearR+6,scope.yearR+7,scope.yearR+8],
                                 [scope.yearR+9,scope.yearR+10,scope.yearR+11,scope.yearR+12]
                             ];
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
                          scope.mn=[
                            [0,1,2,3],
                            [4,5,6,7],
                            [8,9,10,11]  
                          ];
                          
                       
                                         
                          var setDateTime=function(){
                              
                     
                           var weeksDays=["Sunday","Monday","Tuseday","wednesday","Thursday","Friday","Saturday"];
                           var getnotation=function(val){
                               if(isNaN(val)){
                                   return null;
                               }
                               if(val%10===1){
                                   return val+'st';
                               }else if(val%10===2){
                                   return val+'nd';
                               }else if(val%10===3){
                                   return val+'rd';
                               }else{
                                   return val+'th';
                               }
                           }
                                

                              
                            var dateFormatFilter={
                                'yyyy':scope.curDate.year.toString(),
                                'yy':scope.curDate.year.toString().substring(scope.curDate.year.toString().length-3,scope.curDate.year.toString().length),
                                'YYYY':scope.curDate.year.toString(),
                                'YY':scope.curDate.year.toString().substring(scope.curDate.year.toString().length-3,scope.curDate.year.toString().length),
                                'd':scope.curDate.day.toString(),
                                'do':getnotation(scope.curDate.day),
                                'dd':weeksDays[scope.curDate.day].substring(0,2),
                                'ddd':weeksDays[scope.curDate.day].substring(0,3),
                                'dddd':weeksDays[scope.curDate.day],
                                'D':(scope.curDate.date).toString(),
                                'Do':getnotation(scope.curDate.date),
                                'DD':(scope.curDate.date<10)?'0'+scope.curDate.date:scope.curDate.date.toString(),
                                'M':(scope.curDate.month+1).toString(),
                                'Mo':getnotation(scope.curDate.month),
                                'MM':(scope.curDate.month<10)?'0'+scope.curDate.month:scope.curDate.month.toString(),
                                'MMM':scope.months[scope.curDate.month].substring(0,3),
                                'MMMM':scope.months[scope.curDate.month]
                            };
                           

                           
                           //scope.datetimevalue=scope.format
                            var reg=scope.format.match(/[YymMdDhHiso]+/g);
                            //var reg=scope.format.match(/(d)+|(do)|(y)+|(Y)+|(M)+|(Mo)?|(D)+|(Do)/g);
                             var fmt=scope.format;
           
                            for(var i=0 in reg){
                                if(dateFormatFilter[reg[i]]!==undefined){
                                    fmt=fmt.replace(reg[i],dateFormatFilter[reg[i]])
                                }
  
                            }
                           
                                scope.ngModel=fmt;
                    
                       }
                           
                           setDateTime();

                       scope.getDatesofMonths=function(year,month){
                           
                           var d=new Date(year,month,1);
                           
                           var days=[];
                           var weeks=[];
                           d.setDate(d.getDate()-1);      
                           while(d.getDay()>0){
                                
                              days.unshift({state:'prev-d',date:d.getDate()});
                               d.setDate(d.getDate()-1);                             
                               
                           }
                           
                           d=new Date(year,month,1);
                           while (d.getMonth() === month) {
                              
                               if(
                                   (d.getDate()===scope.today.getDate()) && 
                                   (d.getFullYear()===scope.today.getFullYear())&& 
                                   (d.getMonth()===scope.today.getMonth())
                               ){
                                    days.push({state:'today-d',date:d.getDate()});
                                }else{
                                    days.push({state:'cur-d',date:d.getDate()});
                               
                                }
                              
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
                       
                            
                      scope.$watch('curDate.month',function(newVal,oldVal){                       
                              
                                if(oldVal !=newVal){
                                    
                                    scope.weeks=scope.getDatesofMonths(scope.d.getFullYear(),scope.d.getMonth());
                                    scope.curDate.year=scope.d.getFullYear();
                                    setDateTime();
                                }
                           
 
                      });
                       
                     scope.$watch('curDate.year',function(newVal,oldVal){
                              
                         if(oldVal !=newVal){
                             
                              scope.d.setFullYear(newVal);
                              scope.weeks=scope.getDatesofMonths(scope.d.getFullYear(),scope.d.getMonth());
                             setDateTime();
                         }
                              
                     });
                     
                       scope.$watch('yearR',function(){
                           scope.yeararr=[
                                 [scope.yearR+1,scope.yearR+2,scope.yearR+3,scope.yearR+4],
                                 [scope.yearR+5,scope.yearR+6,scope.yearR+7,scope.yearR+8],
                                 [scope.yearR+9,scope.yearR+10,scope.yearR+11,scope.yearR+12]
                             ];
                       });
                       
                              scope.$watch('curDate.date',function(){
                                  setDateTime();
                              });
                              
                       scope.yearNow=scope.d.getFullYear();    
                       scope.calanderDate=false;
                       scope.calanderMonth=false;
                       scope.calanderYear=false;
                       
                       
                       scope.weeks=scope.getDatesofMonths(scope.d.getFullYear(),scope.d.getMonth());
            
                       
                       var cal_date_pick='<div ng-show="calanderDate" class="calander"><table>\
                        <thead>\
                          <tr><th ng-click="prev($event)" class="nav">«</th><th colspan="5" ng-click="showMonths($event)" class="head"><% months[curDate.month]%> <%curDate.year%></th><th ng-click="nex($event)" class="nav">»</th></tr>\
<tr class="head"><th>Mo</th><th>Tu</th><th>We</th><th>Th</th><th>Fr</th><th>Sa</th><th>Su</th></tr>\
                        </thead>\
                        <tbody>\
                          <tr ng-repeat="we in weeks track by $index">\
                              <td class="date" ng-repeat="da in we" ng-class="da.state" ng-click="selectDate(da,$event)"><%da.date%></td>\
                          </tr>\
                        </tbody>\
                        </table></div>';   
                       
                      var cal_month_pick='<div ng-show="calanderMonth" class="calander"><table>\
                        <thead>\
                          <tr><th ng-click="prevYear($event)" class="nav">«</th><th colspan="2" ng-click="showYears($event)" class="head"><%curDate.year%></th><th ng-click="nextYear($event)" class="nav">»</th></tr>\
                        </thead>\
                        <tbody>\
                          <tr ng-repeat="mon in mn track by $index">\
                              <td class="month" ng-repeat="m in mon" ng-click="selectMonth(m,$event)" ng-class="{\'today-d\':curDate.month==m}">\
                                  <%months[m].substring(0,3)%>\
                              </td>\
                          </tr>\
                        </tbody>\
                        </table></div>';
                       
                      var cal_year_pick='<div ng-show="calanderYear" class="calander"><table>\
                        <thead>\
                          <tr><th ng-click="prevYearRange($event)" class="nav">«</th><th colspan="2" class="head"><%yeararr[0][0]-1%> - <%yeararr[2][3]+1%></th><th ng-click="nextYearRange($event)" class="nav">»</th></tr>\
                         </thead>\
                        <tbody>\
                          <tr ng-repeat="yer in yeararr">\
                              <td class="year" ng-repeat="yr in yer" ng-click="selectYear(yr,$event)" ng-class="{\'today-d\':curDate.year==yr}" >\
                                  <%yr%>\
                                </td>\
                         </tr>\
                        </tbody>\
                        </table></div>';
                       
                    
                    var el='<div class="input-group date-picker">\
                          <div class="input-group-addon">\
                          </div>\
                          '+cal_date_pick+''+cal_month_pick+''+cal_year_pick+'\
                          </div>';
                       scope.el=$compile(el)(scope);
                       //elements.append(el);
                           var offset=elements.offset();
                           scope.$watch('offset')
                           console.log(offset);
                        scope.el.offset({
                            top:offset.top+elements.height()+7,
                            left:offset.left
                        });
                        //scope.$apply(function(){
                           $('body').append(scope.el); 
                        //});
              
                   },
                   post:function(scope,elements,attrs){
                      $(document).on('dblclick mousedown mouseup scroll',function(events){
                            
                      
                           scope.$apply(function(){
                               scope.el.offset({
                                    top:elements.offset().top+elements.height()+7,
                                    left:elements.offset().left
                               });
                           })
                       });
                      
                      $(document).on('click',function(event){
                               
                               scope.$apply(function(){
                                  
                                    scope.calanderDate=false; 
                                    scope.calanderMonth=false;
                                    scope.calanderYear=false;
                                  
                               });
                             
                      });
                       
                        elements.on('click',function(event){
                            event.stopPropagation();
                             scope.$apply(function(){
                              

                                   if(scope.calanderDate){
                                      scope.calanderDate=false; 
                                   }else{
                                       scope.calanderDate=true;
                                   }
                                  
                                  scope.calanderMonth=false;
                                  scope.calanderYear=false;
                            });
                        });
    

                   }
               }
           },
           
           
           controller:function($scope,$element){
         
               
             $scope.showMonths=function($event){
              $event.stopPropagation();
                 $scope.calanderDate=false;
                 $scope.calanderMonth=true;
                 $scope.calanderYear=false;
             }
             
             $scope.showYears=function($event){
              $event.stopPropagation();
                 $scope.calanderDate=false;
                 $scope.calanderMonth=false;
                 $scope.calanderYear=true;
             }
                
                    $scope.calanderDate=true;
                    $scope.calanderMonth=false;
                    $scope.calanderYear=false;
                
            
            $scope.prev=function($event){
                $event.stopPropagation();
                $scope.d.setMonth($scope.d.getMonth()-1);
                $scope.curDate.month=$scope.d.getMonth();
                
            } 
            $scope.nex=function($event){
                $event.stopPropagation();
                $scope.d.setMonth($scope.d.getMonth()+1);
                $scope.curDate.month=$scope.d.getMonth();
             
              }
                        
            $scope.prevYear=function($event){
              $event.stopPropagation();
                $scope.curDate.year=$scope.curDate.year-1;
               //$scope.yearR=$scope.yearR-11; 
            }
            
            $scope.nextYear=function($event){
              $event.stopPropagation();
                $scope.curDate.year=$scope.curDate.year+1;
               //$scope.yearR=$scope.yearR+11;  
            }
      
 
            
            $scope.selectYear=function(inc,$event){
              $event.stopPropagation();
                 $scope.curDate.year=inc;                
                 $scope.calanderDate=false;
                 $scope.calanderMonth=true;
                 $scope.calanderYear=false;
             }
            
            $scope.selectMonth=function(inc,$event){
              $event.stopPropagation();
                $scope.d.setMonth(inc);
                $scope.curDate.month=(inc);
                
                $scope.calanderDate=true;
                $scope.calanderMonth=false;
                $scope.calanderYear=false;
                
            }
            
            $scope.prevYearRange=function($event){
              $event.stopPropagation();
                $scope.yearR=$scope.yearR-12; 
            }
            
            $scope.nextYearRange=function($event){
              $event.stopPropagation();
                $scope.yearR=$scope.yearR+12; 
            }
            
            
            $scope.selectDate=function(da,$event){
              $event.stopPropagation();
                if(da.state=='cur-d'||da.state=='today-d'){
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