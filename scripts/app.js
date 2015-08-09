var app = angular.module('routerDemo',['ui.router','ui.bootstrap']);
app.controller('indexCtrl',['$scope',function($scope){
  $scope.welcome = "Hello Router";
}]);
app.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/home');
  $stateProvider
  // HOME STATES AND NESTED VIEWS ========================================
  .state('home', {
    url: '/home',
    templateUrl: 'partial-home.html',
    controller:'homeCtrl'
  })
  // ABOUT PAGE AND MULTIPLE NAMED VIEWS =================================
  .state('about', {
    url: '/about',
    templateUrl: 'partial-about.html'
  })
  .state('main',{
    url:'/main/:type/:docid',
    views:{
      '':{
        templateUrl:'partial-main.html',
        controller:'mainCtrl'
      },
      'vin@main':{
        templateUrl:'partial-vin.html'
      },
      'asr@main':{
        templateUrl:'partial-asr.html'
      }
    }
  });
});
app.controller('homeCtrl',function($scope, $state){
  $scope.CreateVIN = function(){
    var docid = uuid.v4();
    $state.go('main',{type:'VIN',docid:docid});
  }
  $scope.CreateASR = function(){
    var docid = uuid.v4();
    $state.go('main',{type:'ASR',docid:docid});
  }
});
app.controller('mainCtrl',function($scope,$state, $stateParams){
  $scope.doctype = $stateParams.type;
  $scope.docid = $stateParams.docid;

  var setAllInactive = function() {
    angular.forEach($scope.workspaces, function(workspace) {
      workspace.active = false;
    });
  };

  $scope.addNewWorkspace = function(docid,doctype) {
    $scope.workspaces.push({
      id: docid,
      name: doctype + ": " + docid,
      type: doctype,
      active: true
    });
  };

  $scope.workspaces = [];
  $scope.addNewWorkspace($scope.docid,$scope.doctype);
  
  $scope.addWorkspace = function () {
    var docid = uuid.v4();
    setAllInactive();
    $scope.addNewWorkspace(docid,'VIN');
  };

  $scope.removeTab = function (index) {
    console.log(index + ' is removing')
    $scope.workspaces.splice(index, 1);
  };
});
