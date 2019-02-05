	var app = angular.module('myApp', ['ngRoute','ui.bootstrap','ngAnimate', 'toaster', 'hSweetAlert']);
	app.config(['$routeProvider', function($routeProvider) {
		$routeProvider
			.when('/reports/0', {
				templateUrl : 'partials/adm/reports.html',
				controller  : 'reportCtrl'
			})
			.when('/buflst', {
				templateUrl : 'partials/adm/buflst.html',
				controller  : 'buflstCtrl'
			})
			.when('/buflst/:id_rep', {
				templateUrl : 'partials/adm/bufrep.html',
				controller  : 'bufrepCtrl'
			})
			.when('/blanks', {
				templateUrl : 'partials/adm/blanks.html',
				controller  : 'reportsCtrl'
			})
			.when('/blank/:id_rep', {
				templateUrl : 'partials/adm/blank.html',
				controller  : 'blankCtrl'
			})
			.when('/users/0', {
				templateUrl : 'partials/users.html',
				controller  : 'userCtrl'
			})
			.when('/customers', {
				templateUrl : 'partials/customers.html',
				controller  : 'customerCtrl'
			})
            .when('/customers/:uid', {
                templateUrl: 'partials/adm/form.html',
                controller: 'customerFormCtrl'
            })
			.when('/managers', {
				templateUrl : 'partials/adm/managers.html',
				controller  : 'managerCtrl'
			})
            .when('/managers/:uid', {
                templateUrl: 'partials/adm/form1.html',
                controller: 'managerFormCtrl'
            })
			.when('/archlst', {
				templateUrl : 'partials/archlst.html',
				controller  : 'ArchlstCtrl'
			})
			.when('/action/6/:id_arch', {
				templateUrl : 'partials/my_archive.html',
				controller  : 'archTblCtrl'
			})
			.when('/action/4/:id_rep', {
				templateUrl : 'partials/adm/form_del_blank_rep.html',
				controller  : 'delBlankCtrl'
			})
			.when('/action/7/:id_arch', {
				templateUrl : 'partials/adm/form_del_arch_rep.html',
				controller  : 'delArchCtrl'
			})
			.when('/action/2/:id_rep', {
				templateUrl : 'partials/adm/form_del_puzzle.html',
				controller  : 'delPuzzleCtrl'
			})
             .when('/instruction', {
                templateUrl: 'partials/instruc.html',
                controller: 'instrucCtrl'
            })
             .when('/backup', {
                templateUrl: 'partials/adm/backup.html',
                controller: 'backupCtrl'
            })
			.when('/mfc_columns', {
				templateUrl : 'partials/adm/mfc_columns.html',
				controller  : 'mfcColumnsrCtrl'
			})
			.when('/mfc_rows', {
				templateUrl : 'partials/adm/mfc_rows.html',
				controller  : 'mfcRowsCtrl'
			})
			.when('/mfc_rows2', {
				templateUrl : 'partials/adm/mfc_rows.html',
				controller  : 'mfcRows2Ctrl'
			})
			.when('/mfc_ini', {
				templateUrl : 'partials/adm/mfc_ini.html',
				controller  : 'mfcIniCtrl'
			})
			.when('/mfc_ini2', {
				templateUrl : 'partials/adm/mfc_ini2.html',
				controller  : 'mfcIni2Ctrl'
			})
            .when('/logout', {
                templateUrl: 'partials/logout.html',
                controller: 'logoutCtrl'
            })
           .otherwise({
                redirectTo: '/'
            });
    }]);
	app.factory('Data2', ['$http', '$q', '$location',
    function ($http, $q, $location) {
        var serviceBase = 'api/v3/';
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
        return $http.post(uploadUrl, fd, {
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
              sweet.show('Успех!', response.message, 'success');
              }
        	}
        })
        .error(function(response){
            $rootScope.progress = 0;
            sweet.show('Что-то не так...', 'Ошибка.', 'error');
        });
    }
}]);
  app.controller('logoutCtrl', ['$scope', '$http', '$templateCache', function ($scope, $http, $templateCache) {
    $http.get('ajax/delSession.php')
        .success(function(response){
    		$templateCache.removeAll();
    	    location.replace("partials/logout.html");
    	})
    	.error(function(reason){
    		alert("Ошибка при попытке чтения данных!?");
    	});
  }]);
  app.controller('reportsCtrl', ['$scope', '$http', function ($scope, $http) {
    $http.get('ajax/getSession.php')
        .success(function(response){
            $scope.role = response.role;
    	})
    	.error(function(reason){
    		alert("Ошибка при попытке чтения данных!?");
    	});
    $http.get('ajax/getReports.php')
        .success(function(response){
            $scope.reports = response;
    	})
    	.error(function(reason){
    		alert("Ошибка при попытке чтения данных!?");
    	});
  }]);
  app.controller('buflstCtrl', ['$scope', '$http', function ($scope, $http) {
    $http.get('ajax/getSession.php')
        .success(function(response){
            $scope.role = response.role;
    	})
    	.error(function(reason){
    		alert("Ошибка при попытке чтения данных!?");
    	});
    $http.get('ajax/getBuflst.php')
        .success(function(response){
            $scope.reports = response;
    	})
    	.error(function(reason){
    		alert("Ошибка при попытке чтения данных!?");
    	});
  }]);
app.controller('userCtrl', ['$scope', '$modal', '$filter', 'Data2', '$http', '$routeParams', function ($scope, $modal, $filter, Data2, $http, $routeParams) {
    $scope.user = {};
    $http.get('ajax/getSession.php')
        .success(function(response){
            $scope.role = response.role;
    	})
    	.error(function(reason){
    		alert("Ошибка при попытке чтения данных!?");
    	});
    Data2.get('users/0').then(function(data){
        $scope.users = data.data;
    });
    $scope.deleteUser = function(user){
        if(confirm("Удалить запись ?")){
            Data2.delete("users/"+user.uid).then(function(result){
                $scope.users = _.without($scope.users, _.findWhere($scope.users, {uid:user.uid}));
            });
        }
    };
    $scope.open = function (p,size) {
        var modalInstance = $modal.open({
          templateUrl: 'partials/userEdit.html',
          controller: 'userEditCtrl',
          size: size,
          resolve: {
            item: function () {
              return p;
            }
          }
        });
        modalInstance.result.then(function(selectedObject) {
            if(selectedObject.save == "insert"){
                $scope.users.push(selectedObject);
                $scope.users = $filter('orderBy')($scope.users, 'uid', 'reverse');
            }else if(selectedObject.save == "update"){
                p.uid = selectedObject.uid;
                p.fio = selectedObject.fio;
                p.email = selectedObject.email;
                p.login = selectedObject.login;
                p.password = selectedObject.password;
                p.role = selectedObject.role;
                p.phone = selectedObject.phone;
            }
        });
    };
 $scope.columns = [
                    {text:"UID",predicate:"uid",sortable:true,dataType:"number"},
                    {text:"Пользователь",predicate:"login",sortable:true},
                    {text:"Роль",predicate:"role",sortable:true},
                    {text:"Пароль",predicate:"password",sortable:true},
                    {text:"ФИО",predicate:"fio",sortable:true},
                    {text:"Email",predicate:"email",sortable:true},
                    {text:"Телефон",predicate:"phone",sortable:true},
                    {text:"Изменить",predicate:"",sortable:false}
                ];
var orderBy = $filter('orderBy');
  $scope.order = function(predicate, reverse) {
    $scope.users = orderBy($scope.users, predicate, reverse);
  };
  $scope.order('-uid',true);
}]);
app.controller('userEditCtrl', ['$scope', '$modalInstance', 'item', 'Data2', function ($scope, $modalInstance, item, Data2) {
  $scope.user = angular.copy(item);
        $scope.cancel = function () {
            $modalInstance.dismiss('Close');
        };
        $scope.title = (item.uid > 0) ? 'Редактировать строку' : 'Добавить строку';
        $scope.buttonText = (item.uid > 0) ? 'Сохранить' : 'Добавить';
        var original = item;
        $scope.isClean = function() {
            return angular.equals(original, $scope.user);
        }
        $scope.saveUser = function (user) {
            user.uid = $scope.user.uid;
            if(user.uid > 0){
                Data2.put('users/'+user.uid, user).then(function (result) {
                    if(result.status != 'error'){
                        var x = angular.copy(user);
                        x.save = 'update';
                        $modalInstance.close(x);
                    }else{
                    	alert("Ошибка update");
                    }
                });
            }else{
                Data2.post('users', user).then(function (result) {
                    if(result.status != 'error'){
                        var x = angular.copy(user);
                        x.save = 'insert';
                        x.uid = result.data;
                        $modalInstance.close(x);
                    }else{
                    alert("Ошибка insert");
                    }
                });
            }
        };
}]);
app.controller('customerCtrl', ['$scope', 'Data2', '$http', '$filter', '$routeParams', function ($scope, Data2, $http, $filter, $routeParams) {
    $scope.user = {};
    $http.get('ajax/getSession.php')
        .success(function(response){
            $scope.role = response.role;
    	})
    	.error(function(reason){
    		alert("Ошибка при попытке чтения данных!?");
    	});
    Data2.get('users/0').then(function(data){
        $scope.users = data.data;
    });
 $scope.columns = [
                    {text:"UID",predicate:"uid",sortable:true,dataType:"number"},
                    {text:"Пользователь",predicate:"login",sortable:true},
                    {text:"Роль",predicate:"role",sortable:true},
                    {text:"ФИО",predicate:"fio",sortable:true},
                    {text:"Email",predicate:"email",sortable:true},
                    {text:"Телефон",predicate:"phone",sortable:true}
                  ];
var orderBy = $filter('orderBy');
  $scope.order = function(predicate, reverse) {
    $scope.users = orderBy($scope.users, predicate, reverse);
  };
  $scope.order('-uid',true);
}]);
    app.controller("customerFormCtrl", ['$scope', 'Data2', '$http', '$routeParams', 'sweet', function($scope, Data2, $http, $routeParams, sweet) {
     $scope.user = {};
     $http.get('ajax/getSession.php')
        .success(function(response){
            $scope.role = response.role;
    	})
    	.error(function(reason){
    		alert("Ошибка при попытке чтения данных!?");
    	});
     Data2.get('users/'+$routeParams.uid).then(function(data){
     $scope.users = data.data;
     });
     $scope.myForm = {};
     $http.get('ajax/getReports.php').success(function(response){
            $scope.myForm.reports = response;
    	})
    	.error(function(reason){
    		alert("Ошибка при попытке чтения данных!?");
    	});
     $http.get('ajax/getDirect.php').success(function(otvet){
            $scope.myForm.hobbies = otvet;
    	})
    	.error(function(reason){
    		alert("Ошибка при попытке чтения данных!?");
    	});
     Data2.get('uidrep/'+$routeParams.uid).then(function(data){
     var mrep=[];
     for (var i=0; i< data.data.length; i++) {
     	mrep[i]= ""+data.data[i].id_rep;
     }
     $scope.myForm.report = mrep;
     });
     Data2.get('uiddir/'+$routeParams.uid).then(function(data){
     var mdir=[];
     for (var i=0; i< data.data.length; i++) {
     	mdir[i]= ""+data.data[i].id_dir;
     }
     $scope.myForm.hobbie = mdir;
     });
       $scope.myForm.submitTheForm = function(item, event) {
       var dataObject = {
           uid : $scope.users[0].uid
          ,report : $scope.myForm.report
          ,hobbie  : $scope.myForm.hobbie
       };
       var responsePromise = $http.post("ajax/uidRepDir.php", dataObject, {});
       responsePromise.success(function(dataFromServer, status, headers, config) {
          sweet.show('Успех!', "Сохранено.", 'success');
       });
        responsePromise.error(function(data, status, headers, config) {
          alert("Отправка формы не удалась!");
       });
       }
    }]);
app.controller('reportCtrl', ['$scope', '$modal', '$filter', 'Data2', '$http', '$routeParams', function ($scope, $modal, $filter, Data2, $http, $routeParams) {
    $scope.report = {};
    $http.get('ajax/getSession.php')
        .success(function(response){
            $scope.role = response.role;
    	})
    	.error(function(reason){
    		alert("Ошибка при попытке чтения данных!?");
    	});
    Data2.get('reports/0').then(function(data){
        $scope.reports = data.data;
            for (var i=0; i < $scope.reports.length; i++) {
                if ($scope.reports[i].enable_ins == 0) {
                	$scope.reports[i].enable_ins = false;
                } else {
                	$scope.reports[i].enable_ins = true;
                }
            }
    });
    $scope.deleteReport = function(report){
        if(confirm("Удалить запись ?")){
            Data2.delete("reports/"+report.id_rep).then(function(result){
                $scope.reports = _.without($scope.reports, _.findWhere($scope.reports, {id_rep:report.id_rep}));
            });
        }
    };
    $scope.open = function (p,size) {
        var modalInstance = $modal.open({
          templateUrl: 'partials/adm/reportEdit.html',
          controller: 'reportEditCtrl',
          size: size,
          resolve: {
            item: function () {
              return p;
            }
          }
        });
        modalInstance.result.then(function(selectedObject) {
            if(selectedObject.save == "insert"){
                $scope.reports.push(selectedObject);
                $scope.reports = $filter('orderBy')($scope.reports, 'id_rep', 'reverse');
            }else if(selectedObject.save == "update"){
                p.id_rep = selectedObject.id_rep;
                p.name_rep = selectedObject.name_rep;
                p.path_out = selectedObject.path_out;
                p.comment = selectedObject.comment;
                p.path_doc = selectedObject.path_doc;
                p.enable_ins = selectedObject.enable_ins;
            }
        });
    };
 $scope.columns = [
                    {text:"ID",predicate:"id_rep",sortable:true,dataType:"number"},
                    {text:"Наименование",predicate:"name_rep",sortable:true},
                    {text:"Формирует отчет",predicate:"path_out",sortable:true},
                    {text:"Комментарии",predicate:"comment",sortable:true},
                    {text:"Документ",predicate:"path_doc",sortable:true},
                    {text:"Изменить",predicate:"",sortable:false}
                ];

}]);
app.controller('reportEditCtrl', ['$scope', '$modalInstance', 'item', 'Data2', function ($scope, $modalInstance, item, Data2) {
  $scope.report = angular.copy(item);
        $scope.cancel = function () {
            $modalInstance.dismiss('Close');
        };
        $scope.title = (item.id_rep > 0) ? 'Редактировать строку' : 'Добавить строку';
        $scope.buttonText = (item.id_rep > 0) ? 'Сохранить' : 'Добавить';
        var original = item;
        $scope.isClean = function() {
            return angular.equals(original, $scope.report);
        }
        $scope.saveReport = function (report) {
            report.id_rep = $scope.report.id_rep;
            if(report.id_rep > 0){
                Data2.put('reports/'+report.id_rep, report).then(function (result) {
                    if(result.status != 'error'){
                        var x = angular.copy(report);
                        x.save = 'update';
                        $modalInstance.close(x);
                    }else{
                    	alert("Ошибка update");
                        console.log(result);
                    }
                });
            }else{
                Data2.post('reports', report).then(function (result) {
                    if(result.status != 'error'){
                        var x = angular.copy(report);
                        x.save = 'insert';
                        x.id_rep = result.data;
                        $modalInstance.close(x);
                    }else{
                    alert("Ошибка insert");
                        console.log(result);
                    }
                });
            }
        };
}]);
app.controller('blankCtrl', ['$scope', '$modal', '$filter', 'Data2', '$http', '$routeParams', function ($scope, $modal, $filter, Data2, $http, $routeParams) {
    $scope.blank = {};
    $http.get('ajax/getSession.php')
        .success(function(response){
            $scope.role = response.role;
    	})
    	.error(function(reason){
    		alert("Ошибка при попытке чтения данных!?");
    	});
     $scope.blank.id_rep=$routeParams.id_rep;
     $http.post("ajax/getBlank.php",{"id_rep" : $scope.blank.id_rep})
        .success(function(response){
            $scope.blanks = response;
    	})
    	.error(function(reason){
    		alert("Ошибка при попытке чтения данных!?");
    	});
    $scope.deleteBlank = function(blank){
        if(confirm("Удалить запись ?")){
            Data2.delete("blank/"+blank.id).then(function(result){
                $scope.blanks = _.without($scope.blanks, _.findWhere($scope.blanks, {id:blank.id}));
            });
        }
    };
    $scope.open = function (p,size) {
        var modalInstance = $modal.open({
          templateUrl: 'partials/adm/blankEdit.html',
          controller: 'blankEditCtrl',
          size: size,
          resolve: {
            item: function () {
              return p;
            }
          }
        });
        modalInstance.result.then(function(selectedObject) {
            if(selectedObject.save == "insert"){
                $scope.blanks.push(selectedObject);
                $scope.blanks = $filter('orderBy')($scope.blanks, 'id', 'reverse');
            }else if(selectedObject.save == "update"){
                p.id = selectedObject.id;
                p.id_rep = selectedObject.id_rep;
                p.str_nmb = selectedObject.str_nmb;
                p.direct = selectedObject.direct;
                p.descr = selectedObject.descr;
                p.type_val = selectedObject.type_val;
                p.pval = selectedObject.pval;
                p.dimen = selectedObject.dimen;
            }
        });
    };
 $scope.columns = [
                    {text:"ID",predicate:"id",sortable:true,dataType:"number"},
                    {text:"ID-отчета",predicate:"id_rep",sortable:true},
                    {text:"Строка",predicate:"str_nmb",sortable:true},
                    {text:"Направление",predicate:"direct",sortable:true},
                    {text:"Описание",predicate:"descr",sortable:true},
                    {text:"Тип данных",predicate:"type_val",sortable:true},
                    {text:"Величина",predicate:"pval",sortable:true},
                    {text:"Ед.изм.",predicate:"dimen",sortable:true},
                    {text:"Изменить",predicate:"",sortable:false}
                ];

var orderBy = $filter('orderBy');
  $scope.order = function(predicate, reverse) {
    $scope.blanks = orderBy($scope.blanks, predicate, reverse);
  };
  $scope.order('-id',true);
}]);

app.controller('blankEditCtrl', ['$scope', '$modalInstance', 'item', '$http', 'Data2', function ($scope, $modalInstance, item, $http, Data2) {
  $scope.blank = angular.copy(item);
  $scope.myForm = {};
       $http.get('ajax/getDirBlank.php').success(function(response){
            $scope.dir = response;
            var j=0;
            for (var i=0; i < response.length; i++) {
                if (response[i].direct === $scope.blank.direct) {
                	j=i;
                }
            }
            $scope.myForm.dir = $scope.dir[j];
    	})
    	.error(function(reason){
    		alert("Ошибка при попытке чтения данных!?");
    	});
        $scope.cancel = function () {
            $modalInstance.dismiss('Close');
        };
        $scope.title = (item.id > 0) ? 'Редактировать строку' : 'Добавить строку';
        $scope.buttonText = (item.id > 0) ? 'Сохранить' : 'Добавить';
        var original = item;
        $scope.isClean = function() {
            return angular.equals(original, $scope.blank);
        }
        $scope.saveBlank = function (blank) {
            blank.id = $scope.blank.id;
            blank.direct = $scope.myForm.dir.direct;
            if(blank.id > 0){
                Data2.put('blank/'+blank.id, blank).then(function (result) {
                    if(result.status != 'error'){
                        var x = angular.copy(blank);
                        x.save = 'update';
                        $modalInstance.close(x);
                    }else{
                    	alert("Ошибка update");
                        console.log(result);
                    }
                });
            }else{
                Data2.post('blank', blank).then(function (result) {
                    if(result.status != 'error'){
                        var x = angular.copy(blank);
                        x.save = 'insert';
                        x.id = result.data;
                        $modalInstance.close(x);
                    }else{
                    alert("Ошибка insert");
                        console.log(result);
                    }
                });
            }
        };
}]);
	app.controller('instrucCtrl', ['$scope', function($scope) {
		$scope.info = 'О программе';
	}]);
  app.controller('ArchlstCtrl', ['$scope', '$http', '$filter', function($scope, $http, $filter) {
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
  app.controller('archTblCtrl', ['$scope', '$http', '$filter', '$routeParams', function ($scope, $http, $filter, $routeParams) {
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
app.controller('managerCtrl', ['$scope', 'Data2', '$http', '$routeParams', function ($scope, Data2, $http, $routeParams) {
    $scope.user = {};
    $http.get('ajax/getSession.php')
        .success(function(response){
            $scope.role = response.role;
    	})
    	.error(function(reason){
    		alert("Ошибка при попытке чтения данных!?");
    	});
    Data2.get('managers/0').then(function(data){
        $scope.users = data.data;
    });
 $scope.columns = [
                    {text:"UID",predicate:"uid",sortable:true,dataType:"number"},
                    {text:"Пользователь",predicate:"login",sortable:true},
                    {text:"Роль",predicate:"role",sortable:true},
                    {text:"ФИО",predicate:"fio",sortable:true},
                    {text:"Email",predicate:"email",sortable:true},
                    {text:"Телефон",predicate:"phone",sortable:true}
                  ];

}]);
    app.controller("managerFormCtrl", ['$scope', 'Data2', '$http', '$routeParams', 'sweet', function($scope, Data2, $http, $routeParams, sweet) {
     $scope.user = {};
     $http.get('ajax/getSession.php')
        .success(function(response){
            $scope.role = response.role;
    	})
    	.error(function(reason){
    		alert("Ошибка при попытке чтения данных!?");
    	});
     Data2.get('managers/'+$routeParams.uid).then(function(data){
     $scope.users = data.data;
     });
     $scope.myForm = {};
     $http.get('ajax/getReports.php').success(function(response){
            $scope.myForm.reports = response;
    	})
    	.error(function(reason){
    		alert("Ошибка при попытке чтения данных!?");
    	});
     Data2.get('uidrep/'+$routeParams.uid).then(function(data){
     var mrep=[];
     for (var i=0; i< data.data.length; i++) {
     	mrep[i]= ""+data.data[i].id_rep;
     }
     $scope.myForm.report = mrep;
     });
       $scope.myForm.submitTheForm = function(item, event) {
       var dataObject = {
           uid : $scope.users[0].uid
          ,report : $scope.myForm.report
       };
       $http.post("ajax/uidRep.php", dataObject)
       .success(function(response) {
          sweet.show('Успех!', response.message, 'success');
       })
       .error(function(response) {
          alert("Ошибка при отправке формы!");
       });
       }
    }]);
  app.controller("delArchCtrl", ['$scope', '$http', '$routeParams', 'sweet', function($scope, $http, $routeParams, sweet) {
  	$scope.myForm = {};
    $http.get("ajax/getSession.php")
        .success(function(response){
            $scope.role = response.role;
    	})
    	.error(function(reason){
    		alert("Ошибка при попытке чтения данных!?");
   	    });
        $scope.id_arch = $routeParams.id_arch;
        $http.post("ajax/getNameArchReport.php",{"id_arch" : $scope.id_arch})
        .success(function(response){
            $scope.report = response;
   	    })
    	.error(function(reason){
    		alert("Ошибка при попытке чтения данных!?");
    	});
       $scope.myForm.submitTheForm = function(item, event) {
       var dataObject = {
           id_arch : $scope.id_arch
       };
       $http.post("ajax/delArchRep.php", dataObject)
       .success(function(response) {
       	sweet.show('Успех!', "Выполнено.", 'success');
       })
       .error(function(response) {
          alert("Ошибка при отправке формы!");
       });
       }
  }]);
    app.controller("delBlankCtrl", ['$scope', '$http', '$routeParams', 'sweet', function($scope, $http, $routeParams, sweet) {
  	$scope.myForm = {};
    $http.get("ajax/getSession.php")
        .success(function(response){
            $scope.role = response.role;
    	})
    	.error(function(reason){
    		alert("Ошибка при попытке чтения данных!?");
   	    });
        $scope.id_rep = $routeParams.id_rep;
        $http.post("ajax/getNameReport.php",{"id_rep" : $scope.id_rep})
        .success(function(response){
            $scope.report = response;
   	    })
    	.error(function(reason){
    		alert("Ошибка при попытке чтения данных!?");
    	});
       $scope.myForm.submitTheForm = function(item, event) {
       var dataObject = {
           id_rep : $scope.id_rep
       };
       $http.post("ajax/delBlankRep.php", dataObject)
       .success(function(response) {
        if (response.message === undefined) {
        	alert('Что-то выполнено.');
        } else {
            sweet.show('Успех!', response.message, 'success');
        }
       })
       .error(function(response) {
          alert("Ошибка при отправке формы!");
       });
       }
  }]);
   app.controller('bufrepCtrl', ['$scope', '$http', '$filter', '$routeParams', function ($scope, $http, $filter, $routeParams) {
    $scope.report = {};
    $scope.id_rep = $routeParams.id_rep;
    if ($scope.id_rep > 0) {
        $http.post("ajax/getNameReport.php",{"id_rep" : $scope.id_rep})
        .success(function(response){
            $scope.report = response;
    	})
    	.error(function(reason){
    		alert("Ошибка при попытке чтения данных!?");
    	});
    }
        $http.post("ajax/getPuzzlesAll.php",{"id_rep" : $scope.id_rep})
        .success(function(response){
            $scope.reports = response;
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
                    {text:"На дату",predicate:"dateon",sortable:true},
                    {text:"Статус",predicate:"status",sortable:true}
                ];
var orderBy = $filter('orderBy');
  $scope.order = function(predicate, reverse) {
    $scope.reports = orderBy($scope.reports, predicate, reverse);
  };
  $scope.order('-id',true);
}]);
    app.controller("delPuzzleCtrl", ['$scope', '$http', '$routeParams', 'sweet', function($scope, $http, $routeParams, sweet) {
  	$scope.myForm = {};
    $http.get("ajax/getSession.php")
        .success(function(response){
            $scope.role = response.role;
    	})
    	.error(function(reason){
    		alert("Ошибка при попытке чтения данных!?");
   	    });
        $scope.id_rep = $routeParams.id_rep;
        $http.post("ajax/getNameReport.php",{"id_rep" : $scope.id_rep})
        .success(function(response){
            $scope.report = response;
   	    })
    	.error(function(reason){
    		alert("Ошибка при попытке чтения данных!?");
    	});
    	$scope.enableBtn=1;
       $scope.myForm.submitTheForm = function(item, event) {
       var dataObject = {
           id_rep : $scope.id_rep
       };
       $scope.enableBtn=0;
       $http.post("ajax/delPuzzle.php", dataObject)
       .success(function(response) {
       	sweet.show('Успех!', response.message, 'success');
       })
       .error(function(response) {
          alert("Ошибка при отправке формы!");
       });
       }
  }]);
    app.controller("backupCtrl", ['$scope', '$http', '$rootScope', 'sweet', function($scope, $http, $rootScope, sweet) {
  	$scope.myForm = {};
    $http.get("ajax/getSession.php")
        .success(function(response){
            $scope.role = response.role;
    	})
    	.error(function(reason){
    		alert("Ошибка при попытке чтения данных!?");
   	    });
       $scope.getInfDb = function() {
            $http.get("ajax/getBackupLst.php")
            .success(function(response){
            $scope.files = response;
    	    })
    	    .error(function(reason){
    		   alert("Ошибка при попытке чтения данных!?");
   	        });
            $http.get("ajax/getInfoDB.php")
            .success(function(response){
               $scope.tables = response;
    	    })
    	    .error(function(reason){
    		   alert("Ошибка при попытке чтения данных!?");
   	        });
       }
       $scope.getInfDb();
       $scope.enableBtn=1;
       $scope.myForm.submitTheForm = function(item, event) {
       $scope.enableBtn=0;
       $scope.enableBtn=0;
       $http.get("ajax/backup1.php?send_ftp="+$scope.send_ftp)
       .success(function(resp) {
            $scope.getInfDb();
            $scope.enableBtn=1;
                  if (resp.message.substring(0,6) == 'Ошибка') {
                      sweet.show('Результат', resp.message, 'error');
                  } else {
                      sweet.show('Успех!', resp.message, 'success');
                  }
       })
       .error(function(response) {
            alert("Ошибка при отправке формы!");
       });
       }
  }]);
app.controller('mfcRowsCtrl', ['$scope', '$http', '$filter', 'fileUpload', '$rootScope', 'sweet', function($scope, $http, $filter, fileUpload, $rootScope, sweet){
   $rootScope.progress = 0;
    $scope.uploadFile = function(){
        var file = $scope.myFile;
        $rootScope.progress = 1;
        var uploadUrl = "ajax/mfcLoadNameAddress.php?cl="+$scope.clear_table;
        fileUpload.uploadFileToUrl(file, uploadUrl).then(function(success) {
        $scope.getMfcNamAdr();
        }, function(error) {
        });
    };
    $scope.checkedRows = [];
    $scope.toggleCheck = function (rownmb) {
        if ($scope.checkedRows.indexOf(rownmb) === -1) {
            $scope.checkedRows.push(rownmb);
        } else {
            $scope.checkedRows.splice($scope.checkedRows.indexOf(rownmb), 1);
        }
    };
    $scope.clear_table = true;
    $http.get('ajax/getDptcodBrief.php')
        .success(function(response){
            $scope.dptcls = response;
    	})
    	.error(function(reason){
    		alert("Ошибка при попытке чтения данных!?");
   	});
    $scope.getMfcNamAdr = function() {
      $http.get('ajax/getMfcNameAddress.php')
        .success(function(response){
            $scope.reports = response;
    	})
    	.error(function(reason){
    		alert("Ошибка при попытке чтения данных!?");
    	});
    };
    $scope.getMfcNamAdr();
    $scope.setFilter = function(brief) {
      $scope.filterReport = brief;
    }
    $scope.setDptcod = function(dptcod) {
     var selRows=[];
     var dataObject = {
         upfr : dptcod,
         rows : selRows
     }
     var j = 0;
     for (var i = 0; i < $scope.filteredReports.length; i++) {
     	if ($scope.checkedRows.indexOf($scope.filteredReports[i].rownmb) != -1) {
            selRows[j] = $scope.filteredReports[i].rownmb;
     	    $scope.reports[$scope.filteredReports[i].id-1].dptcod = (dptcod == undefined ? '?' : dptcod);
     	    j = j + 1;
     	}
     }
     if (j > 0) {
       $http.post("ajax/setMfcNameAddress.php", dataObject)
       .success(function(response) {
          sweet.show('Успех!', response.message, 'success');
       })
       .error(function(response) {
          alert("Ошибка при отправке данных!");
       });
     }
    }
}]);
    app.controller("mfcIniCtrl", ['$scope', '$http', 'sweet', function($scope, $http, sweet) {
    	$scope.master = {};
        $http.get('ajax/getSession.php')
        .success(function(response){
            $scope.role = response.role;
    	})
    	.error(function(reason){
    		alert("Ошибка при попытке чтения данных!?");
    	});
        $http.get('ajax/getMfcIni.php').success(function(response){
            $scope.mfcini = response;
            $scope.master = angular.copy($scope.mfcini);
    	})
    	.error(function(reason){
    		alert("Ошибка при попытке чтения данных!?");
    	});
      $scope.send = function() {
       var dataObject = {
          param : $scope.mfcini
       };
       $scope.enableBtn = 0;
       $http.post("ajax/setMfcIni.php", dataObject)
       .success(function(response) {
          if (response.message.substring(0,9) == 'Отклонено') {
          	  sweet.show('Результат', response.message, 'error');
          } else {
              sweet.show('Успех!', response.message, 'success');
          }
          $scope.enableBtn = 1;
       })
       .error(function(response) {
          alert("Ошибка при отправке формы!");
       });
       }
       $scope.reset = function() {
       	  $scope.mfcini = angular.copy($scope.master);
       }
    }]);
    app.controller("mfcIni2Ctrl", ['$scope', '$http', 'sweet', function($scope, $http, sweet) {
    	$scope.master2 = {};
        $http.get('ajax/getSession.php')
        .success(function(response){
            $scope.role = response.role;
    	})
    	.error(function(reason){
    		alert("Ошибка при попытке чтения данных!?");
    	});
        $http.get('ajax/getMfcIni2.php').success(function(response){
            $scope.mfcini2 = response;
            $scope.master2 = angular.copy($scope.mfcini2);
    	})
    	.error(function(reason){
    		alert("Ошибка при попытке чтения данных!?");
    	});
      $scope.send = function() {
       var dataObject = {
          param : $scope.mfcini2
       };
       $scope.enableBtn = 0;
       $http.post("ajax/setMfcIni2.php", dataObject)
       .success(function(response) {
          if (response.message.substring(0,9) == 'Отклонено') {
          	  sweet.show('Результат', response.message, 'error');
          } else {
              sweet.show('Успех!', response.message, 'success');
          }
          $scope.enableBtn = 1;
       })
       .error(function(response) {
          alert("Ошибка при отправке формы!");
       });
       }
       $scope.reset = function() {
       	  $scope.mfcini2 = angular.copy($scope.master2);
       }
    }]);
app.controller('mfcRows2Ctrl', ['$scope', '$http', '$filter', 'fileUpload', '$rootScope', 'sweet', function($scope, $http, $filter, fileUpload, $rootScope, sweet){
   $rootScope.progress = 0;
    $scope.uploadFile = function(){
        var file = $scope.myFile;
        $rootScope.progress = 1;
        var uploadUrl = "ajax/mfcLoadNameAddress2.php?cl="+$scope.clear_table;
        fileUpload.uploadFileToUrl(file, uploadUrl).then(function(success) {
        $scope.getMfcNamAdr();
        }, function(error) {
        });
    };
    $scope.checkedRows = [];
    $scope.toggleCheck = function (rownmb) {
        if ($scope.checkedRows.indexOf(rownmb) === -1) {
            $scope.checkedRows.push(rownmb);
        } else {
            $scope.checkedRows.splice($scope.checkedRows.indexOf(rownmb), 1);
        }
    };
    $scope.clear_table = true;
    $http.get('ajax/getDptcodBrief.php')
        .success(function(response){
            $scope.dptcls = response;
    	})
    	.error(function(reason){
    		alert("Ошибка при попытке чтения данных!?");
   	});
    $scope.getMfcNamAdr = function() {
      $http.get('ajax/getMfcNameAddress2.php')
        .success(function(response){
            $scope.reports = response;
    	})
    	.error(function(reason){
    		alert("Ошибка при попытке чтения данных!?");
    	});
    };
    $scope.getMfcNamAdr();
    $scope.setFilter = function(brief) {
      $scope.filterReport = brief;
    }
    $scope.setDptcod = function(dptcod) {
     var selRows=[];
     var dataObject = {
         upfr : dptcod,
         rows : selRows
     }
     var j = 0;
     for (var i = 0; i < $scope.filteredReports.length; i++) {
     	if ($scope.checkedRows.indexOf($scope.filteredReports[i].rownmb) != -1) {
            selRows[j] = $scope.filteredReports[i].rownmb;
     	    $scope.reports[$scope.filteredReports[i].id-1].dptcod = (dptcod == undefined ? '?' : dptcod);
     	    j = j + 1;
     	}
     }
     if (j > 0) {
       $http.post("ajax/setMfcNameAddress2.php", dataObject)
       .success(function(response) {
          sweet.show('Успех!', response.message, 'success');
       })
       .error(function(response) {
          alert("Ошибка при отправке данных!");
       });
     }
    }
}]);
