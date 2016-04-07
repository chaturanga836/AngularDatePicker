<html lang="en">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="description" content="">
        <meta name="author" content="">
        <meta http-equiv="cache-control" content="max-age=0" />
        <meta http-equiv="cache-control" content="no-cache" />
        <meta http-equiv="expires" content="0" />
        <meta http-equiv="expires" content="Tue, 01 Jan 1980 1:00:00 GMT" />
        <meta http-equiv="pragma" content="no-cache" />
         <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.0/jquery.min.js"></script>
         
         <script src="js/angular.js"></script>
        <script src="js/ng-date-picker.js"></script>
        <script src="js/exapmle.js"></script>
        <link rel="stylesheet" href="css/index.css">
        <title>Text Editor</title>

    </head>

    <body ng-app="datetimeExample">
      
         <div ng-controller="birthDate">
              <input type="text" ng-model="birthday" date-picker date-format="YYYY/M/D" />
             
              <input type="text" ng-model="publishdate" date-picker date-format="YYYY/M/D" />
        </div>
        
        <!--div date-picker date-format="YYYY/M/D">
        </div-->
        
        

    </body>
</html>

