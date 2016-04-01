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
       
        <title>Text Editor</title>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css">
        <script src="js/jquery.min.js"></script>
        

        
        <script src="js/angular.js"></script>
        <script src="js/angular-animate.min.js"></script>
        <script src="js/angular-text-editor.js"></script>
        <link rel="stylesheet" href="css/index.css">
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" integrity="sha384-1q8mTJOASx8j1Au+a5WDVnPi2lkFfwwEAa8hDDdjZlpLegxhjVME1fgjWPGmkzs7" crossorigin="anonymous">

<!-- Optional theme -->
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap-theme.min.css" integrity="sha384-fLW2N01lMqjakBkx3l/M9EahuwpSfeNvV63J5ezn3uZzapT0u7EYsXMjQV+0En5r" crossorigin="anonymous">

<!-- Latest compiled and minified JavaScript -->
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js" integrity="sha384-0mSbJDEHialfmuBBQP6A4Qrprq5OVfW37PRR3j5ELqxss1yVqOtnepnHVP9aJ7xS" crossorigin="anonymous"></script>
  <script src="js/bootstrap-datepicker.js"></script>   
 <link rel="stylesheet" href="css/bootstrap-datepicker.css">
        <script src="js/moment.js"></script>
    </head>

    <body ng-app="textpad">
         <div class="container" text-editor>
            <div class="row">
                 
                <div class="btn-group">
                 <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                   <i class="fa fa-font"></i> Font<span class="caret"></span>
                 </button>
                 <ul class="dropdown-menu">
                    <li><a href="#" style="font-family:Arial" ng-click="getfont()">Arial</a></li>
                    <li><a href="#" style="font-family:sans-serif" ng-click="getfont()">San-Serif</a></li>
                    <li><a href="#" style="font-family:Georgia" ng-click="getfont()">Georgia, serif</a></li>
                    <li><a href="#" style="font-family:Comic Sans MS" ng-click="getfont()">Comic Sans MS</a></li>
                    <li><a href="#" style="font-family:Impact" ng-click="getfont()">Impact</a></li>
                 </ul>
               </div>
                
                <div class="btn-group">
                 <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                   <i class="fa fa-text-height"></i><span class="caret"></span>
                 </button>
                 <ul class="dropdown-menu">
                    <li><a href="#" ng-click="getfontSize()"><font size="2">2x</font></a></li>
                    <li><a href="#" ng-click="getfontSize()"><font size="3">3x</font></a></li>
                    <li><a href="#" ng-click="getfontSize()"><font size="4">4x</font></a></li>
                    <li><a href="#" ng-click="getfontSize()"><font size="5">5x</font></a></li>
                    <li><a href="#" ng-click="getfontSize()"><font size="6">6x</font></a></li>
                 </ul>
               </div>
                
               <div class="btn-group">
                 <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                   <i class="fa fa-paint-brush"></i><span class="caret"></span>
                 </button>
                 <ul class="dropdown-menu">
                    <li><a href="#" style="background-color:#33cc33" ng-click="getColor()">&nbsp;</a></li>
                    <li><a href="#" style="background-color:#1a75ff" ng-click="getColor()">&nbsp;</a></li>
                    <li><a href="#" style="background-color:#ff751a" ng-click="getColor()">&nbsp;</a></li>
                    <li><a href="#" style="background-color:#ff3333" ng-click="getColor()">&nbsp;</a></li>
                    <li><a href="#" style="background-color:#ff33ff" ng-click="getColor()">&nbsp;</a></li>
                 </ul>
               </div>
                 
                 <div class="btn-group" role="group" aria-label="...">
                   <button type="button" class="btn btn-default" ng-click="getAlignment()"><i class="fa fa-align-left"></i></button>
                   <button type="button" class="btn btn-default" ng-click="getAlignment()"><i class="fa fa-align-center"></i></button>
                   <button type="button" class="btn btn-default" ng-click="getAlignment()"><i class="fa fa-align-right"></i></button>
                 </div>
             
                  <div class="btn-group" role="group" aria-label="...">
                   <button type="button" class="btn btn-default" ng-click="textDecor()"><i class="fa fa-underline"></i></button>
                   <button type="button" class="btn btn-default" ng-click="textDecor()"><i class="fa fa-italic"></i></button>
                   <button type="button" class="btn btn-default" ng-click="textDecor()"><i class="fa fa-bold"></i></button>
                   <button type="button" class="btn btn-default" ng-click="textDecor()"><i class="fa fa-list-ol"></i></button>
                   <button type="button" class="btn btn-default" ng-click="textDecor()"><i class="fa fa-list-ul"></i></button>
                   <button type="button" class="btn btn-default" ng-clikc="textDecor()"><i class="fa fa-quote-right"></i></button>
                 </div>
        
                 <div class="btn-group" role="group" aria-label="...">
                   <button type="button" class="btn btn-default" ng-click="addPicture()" data-toggle="modal" data-target="#myModal"><i class="fa fa-picture-o"></i></button>
                   <button type="button" class="btn btn-default" ng-click="addyoutube()"><i class="fa fa-youtube-play"></i></button>
                   <button type="button" class="btn btn-default" ng-click="addLink()"><i class="fa fa-link"></i></button>
                   <button type="button" class="btn btn-default" ng-click="addFile()"><i class="fa fa-file"></i></button>
                 </div>
            </div>
            <div class="row">
                <div class="col-xs-10 editor" id="345textEditor" contenteditable="true">
                 
                </div> 
            </div> 
             
         <div class="input-group date" id="sandbox-container">
              <input type="text" class="form-control">
                <div class="input-group-addon">
                 <span class="glyphicon glyphicon-th"></span>
               </div>
</div>
             
        </div>
        
  <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title" id="myModalLabel">Add Picture</h4>
      </div>
      <div class="modal-body">
        <input type="text" class="form-control" id="exampleInputEmail1" placeholder="Insert link">
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal">Upload Picture</button>
        <button type="button" class="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>

<script src="js/bootstrap-datepicker.en-GB.min.js"></script>
        <script>
             $('#sandbox-container input').datepicker();
        </script>

    </body>
</html>

