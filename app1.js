var app = angular.module('myApp', ['ngRoute', 'ui.bootstrap','ngAnimate', 'toaster', 'hSweetAlert']);
app.config( ['$routeProvider',
  function ($routeProvider) {
        $routeProvider
        .when('/login', {
            title: 'Login',
            templateUrl: 'partials/login.html',
            controller: 'authCtrl'
        })
            .when('/logout', {
                title: 'Logout',
                templateUrl: 'partials/login.html',
                controller: 'logoutCtrl'
            })
            .when('/reports',{
                title: 'Reports',
                templateUrl: 'partials/reports.html',
                controller: 'reportsCtrl'
            })
            .when('/puzzles/:rep_id', {
                title: 'Puzzles',
                templateUrl: 'partials/puzzles.html',
                controller: 'puzzlesCtrl'
            })
			.when('/archlst', {
				templateUrl : 'partials/archlst.html',
				controller  : 'ArchlstCtrl'
			})
			.when('/smsinfo', {
				templateUrl : 'partials/smsinfo.html',
				controller  : 'smsInfoCtrl'
			})
			.when('/action/6/:id_arch', {
				templateUrl : 'partials/my_archive.html',
				controller  : 'archTblCtrl'
			})
            .when('/instruction', {
                templateUrl: 'partials/instruc.html',
                controller: 'instrucCtrl'
            })
            .when('/', {
                title: 'Login',
                templateUrl: 'partials/login.html',
                controller: 'authCtrl',
                role: '0'
            })
            .otherwise({
                redirectTo: '/login'
            });
  }])
    .run(['$rootScope', '$location', 'Data', function ($rootScope, $location, Data) {
        $rootScope.$on("$routeChangeStart", function (event, next, current) {
            $rootScope.authenticated = false;
            Data.get('session').then(function (results) {
                if (results.uid) {
                    $rootScope.authenticated = true;
                    $rootScope.uid = results.uid;
                    $rootScope.login = results.login;
                    $rootScope.role = results.role;
                } else {
                    var nextUrl = next.$$route.originalPath;
                    if (nextUrl == '/signup' || nextUrl == '/login') {

                    } else {
                        $location.path("/login");
                    }
                }
            });
        });
    }]);
app.factory('Data', ['$http', 'toaster',
    function ($http, toaster) { // This service connects to our REST API
        var serviceBase = 'api/v1/';
        var obj = {};
        obj.toast = function (data) {
            toaster.pop(data.status, "", data.message,10000, 'trustedHtml');
        }
        obj.get = function (q) {
            return $http.get(serviceBase + q).then(function (results) {
                return results.data;
            });
        };
        obj.post = function (q, object) {
            return $http.post(serviceBase + q, object).then(function (results) {
                return results.data;
            });
        };
        obj.put = function (q, object) {
            return $http.put(serviceBase + q, object).then(function (results) {
                return results.data;
            });
        };
        obj.delete = function (q) {
            return $http.delete(serviceBase + q).then(function (results) {
                return results.data;
            });
        };
        return obj;
}]);
app.factory('Data1', ['$http', '$q', '$location',
    function ($http, $q, $location) {
        var serviceBase = 'api/v2/';
        var obj = {};
        obj.get = function (q) {
            return $http.get(serviceBase + q).then(function (results) {
                return results.data;
            });
        };
        obj.post = function (q, object) {
            return $http.post(serviceBase + q, object).then(function (results) {
                return results.data;
            });
        };
        obj.put = function (q, object) {
            return $http.put(serviceBase + q, object).then(function (results) {
                return results.data;
            });
        };
        obj.delete = function (q) {
            return $http.delete(serviceBase + q).then(function (results) {
                return results.data;
            });
        };
        return obj;
}]);
app.service('fileUpload', ['$rootScope', '$http', 'sweet', function ($rootScope, $http, sweet) {
    this.uploadFileToUrl = function(file, uploadUrl){
        var fd = new FormData();
        fd.append('file', file);
        $http.post(uploadUrl, fd, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
        })
        .success(function(response){
            $rootScope.progress = 0;
            if (response.message == undefined) {
            	sweet.show('Что-то не так...', 'Файл не выбран?', 'error');
            } else {
            if (response.message.substring(0,9) == 'Отклонено') {
              sweet.show('Результат', response.message, 'error');
            } else {
              sweet.show({
                          title: 'Результат',
                          text: response.message + '\nДля отображения изменений необходимо перезагрузить страницу.',
                          type: 'warning',
                          showCancelButton: true,
                          cancelButtonText: 'Отмена',
                          confirmButtonColor: '#DD6B55',
                          confirmButtonText: 'Перезагрузка',
                          closeOnConfirm: false
                         }, function() {
                               location.reload();
                        });
              }
        	}
        })
        .error(function(response){            $rootScope.progress = 0;
            sweet.show('Результат', 'Ошибка.', 'error');
        });
    }
}]);
app.controller('reportsCtrl', ['$scope', '$http', function ($scope, $http) {
    $http.get('ajax/getSelfReports.php')
        .success(function(response){
            $scope.reports = response;
    	})
    	.error(function(reason){
    		alert("Ошибка при попытке чтения данных!?");
    	});
}]);
app.controller('smsInfoCtrl', ['$scope', '$http', '$filter', 'fileUpload', '$rootScope', 'sweet', function($scope, $http, $filter, fileUpload, $rootScope, sweet){
   $rootScope.progress = 0;
    $scope.uploadFile = function(){
        sweet.show('Результат', 'Режим блокирован', 'error');
        return;
        var file = $scope.myFile;
        $rootScope.progress = 1;
        var uploadUrl = "ajax/upload.php";
        fileUpload.uploadFileToUrl(file, uploadUrl);
    };
    $http.get('ajax/getSmsinfo.php')
        .success(function(response){
            $scope.reports = response;
    	})
    	.error(function(reason){
    		alert("Ошибка при попытке чтения данных!?");
    	});
}]);
  app.controller('ArchlstCtrl',['$scope', '$http', '$filter',function($scope, $http, $filter) {
    $http.get('ajax/getSession.php')
        .success(function(response){
            $scope.role = response.role;
    	})
    	.error(function(reason){
    		alert("Ошибка при попытке чтения данных!?");
    	});
    $http.get('ajax/getArchlst.php')
        .success(function(response){
            $scope.reports = response;
    	})
    	.error(function(reason){
    		alert("Ошибка при попытке чтения данных!?");
    	});
  }]);
app.controller('archTblCtrl',['$scope', '$http', '$filter', '$routeParams', function ($scope, $http, $filter, $routeParams) {
    $http.get('ajax/getSession.php')
        .success(function(response){
            $scope.role = response.role;
    	})
    	.error(function(reason){
    		alert("Ошибка при попытке чтения данных!?");
    	});
    $scope.archive = {};
    $scope.id_arch = $routeParams.id_arch;
    if ($scope.id_arch > 0) {
        $http.post("ajax/getNameArchReport.php",{"id_arch" : $scope.id_arch})
        .success(function(response){
            $scope.report = response;
    	})
    	.error(function(reason){
    		alert("Ошибка при попытке чтения данных!?");
    	});
    }
        $http.post("ajax/getArchive.php",{"id_arch" : $scope.id_arch})
        .success(function(response){
            $scope.archives = response;
    	})
    	.error(function(reason){
    		alert("Ошибка при попытке чтения данных!?");
    	});
 $scope.columns = [
                    {text:"ID",predicate:"id",sortable:true,dataType:"number"},
                    {text:"Пользователь",predicate:"login",sortable:true},
                    {text:"Служба",predicate:"direct",sortable:true},
                    {text:"Строка",predicate:"str_nmb",sortable:true},
                    {text:"Показатель",predicate:"descr",sortable:true},
                    {text:"Величина",predicate:"pval",sortable:true,dataType:"number"},
                    {text:"Ед. измер.",predicate:"dimen",sortable:true},
                    {text:"На дату.",predicate:"dateon",sortable:true}
                ];
var orderBy = $filter('orderBy');
  $scope.order = function(predicate, reverse) {
    $scope.archives = orderBy($scope.archives, predicate, reverse);
  };
  $scope.order('-id',true);
}]);
  app.controller('instrucCtrl',['$scope', function($scope) {
		$scope.info = 'О программе';
  }]);