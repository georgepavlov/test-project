	var app = angular.module('myApp', ['ngRoute','ui.bootstrap','ngAnimate', 'toaster', 'hSweetAlert','infinite-scroll']);
	app.config(['$routeProvider', function($routeProvider) {
		$routeProvider
			.when('/my_reports', {
				templateUrl : 'partials/org/my_reports.html',
				controller  : 'myReportsCtrl'
			})
			.when('/action/2/:id_rep', {
				templateUrl : 'partials/org/my_puzzles.html',
				controller  : 'myPuzzlesCtrl'
			})
			.when('/action/7/:id_rep', {
				templateUrl : 'partials/org/my_performers.html',
				controller  : 'myPerformersCtrl'
			})
			.when('/action/1/:id_rep', {
				templateUrl : 'partials/org/form_run_report.html',
				controller  : 'formRunReportCtrl'
			})
			.when('/action/5/:id_rep', {
				templateUrl : 'partials/org/form_mov_arch.html',
				controller  : 'movArchCtrl'
			})
			.when('/action/4/:id_rep', {
				templateUrl : 'partials/org/form_to_zvrsh.html',
				controller  : 'movZvrshCtrl'
			})
			.when('/archlst', {
				templateUrl : 'partials/archlst.html',
				controller  : 'ArchlstCtrl'
			})
			.when('/smsopros', {
				templateUrl : 'partials/org/smsopros.html',
				controller  : 'smsOprosCtrl'
			})
			.when('/smspacket', {
				templateUrl : 'partials/org/smsPacket.html',
				controller  : 'smsPacketCtrl'
			})
			.when('/mfc_reception', {
				templateUrl : 'partials/org/mfc_reception.html',
				controller  : 'mfcReceptionCtrl'
			})
			.when('/mfc_reception2', {
				templateUrl : 'partials/org/mfc_reception2.html',
				controller  : 'mfcReception2Ctrl'
			})
			.when('/mfc_issue', {
				templateUrl : 'partials/org/mfc_issue.html',
				controller  : 'mfcIssueCtrl'
			})
			.when('/mfc_issue2', {
				templateUrl : 'partials/org/mfc_issue2.html',
				controller  : 'mfcIssue2Ctrl'
			})
			.when('/upfr_reception', {
				templateUrl : 'partials/org/upfr_reception.html',
				controller  : 'upfrReceptionCtrl'
			})
			.when('/upfr_issue', {
				templateUrl : 'partials/org/upfr_issue.html',
				controller  : 'upfrIssueCtrl'
			})
			.when('/upfr_reception2', {
				templateUrl : 'partials/org/upfr_reception2.html',
				controller  : 'upfrReception2Ctrl'
			})
			.when('/action/6/:id_arch', {
				templateUrl : 'partials/my_archive.html',
				controller  : 'archTblCtrl'
			})
			.when('/my_users', {
				templateUrl : 'partials/org/org_users.html',
				controller  : 'myUsersCtrl'
			})
			.when('/mail/:uid', {
				templateUrl : 'partials/org/form_send_msg.html',
				controller  : 'userSendMsgCtrl'
			})
            .when('/svod_reception', {
                templateUrl: 'partials/org/svod_recept_form.html',
                controller: 'svodReceptFormCtrl'
            })
            .when('/svod_reception2', {
                templateUrl: 'partials/org/svod_recept_form2.html',
                controller: 'svodReceptForm2Ctrl'
            })
            .when('/instruction', {
                templateUrl: 'partials/instruc.html',
                controller: 'instrucCtrl'
            })
            .when('/logout', {
                templateUrl: 'partials/logout.html',
                controller: 'logoutCtrl'
            })
            .otherwise({
                redirectTo: '/'
            });
  }]);
  app.controller('instrucCtrl', ['$scope', function($scope) {
		$scope.info = 'О программе';
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
  app.controller('myReportsCtrl', ['$scope', '$http', function($scope, $http) {
    $http.get('ajax/getMyReports.php')
        .success(function(response){
            $scope.reports = response;
    	})
    	.error(function(reason){
    		alert("Ошибка при попытке чтения данных!?");
    	});
  }]);
  app.controller('myPerformersCtrl', ['$scope', '$http', '$routeParams', function($scope, $http, $routeParams) {
    $scope.rep_id = $routeParams.id_rep;
        $http.post("ajax/getNameReport.php",{"id_rep" : $scope.rep_id})
        .success(function(response){
            $scope.report = response;
    	})
    	.error(function(reason){
    		alert("Ошибка при попытке чтения данных!?");
    	});
        $http.post("ajax/getMyPerformers.php",{"id_rep" : $scope.rep_id})
        .success(function(response){
            $scope.reports = response;
    	})
    	.error(function(reason){
    		alert("Ошибка при попытке чтения данных!?");
    	});
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
            $scope.priem = [];
            $scope.dgu = [];
            for (var i=0; i < response.length; i++) {
                $scope.priem[i] = 0;
                if (response[i].name_rep.indexOf('прием') > 0 ) $scope.priem[i] = 1;
                $scope.dgu[i] = 0;
                if (response[i].name_rep.indexOf('обращений') > 0 ) $scope.dgu[i] = 1;
            }
    	})
    	.error(function(reason){
    		alert("Ошибка при попытке чтения данных!?");
    	});
  }]);
  app.controller('myUsersCtrl', ['$scope', '$http', '$filter',function($scope, $http, $filter) {
    $http.get('ajax/getMyUsers.php')
        .success(function(response){
            $scope.users = response;
    	})
    	.error(function(reason){
    		alert("Ошибка при попытке чтения данных!?");
    	});
var orderBy = $filter('orderBy');
  $scope.order = function(predicate, reverse) {
    $scope.users = orderBy($scope.users, predicate, reverse);
  };
  $scope.order('-uid',true);
  }]);
app.factory("Data1", ['$http', '$q', '$location',
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
app.controller('smsPacketCtrl', ['$scope', '$http', '$filter', 'fileUpload', '$rootScope', 'sweet', function($scope, $http, $filter, fileUpload, $rootScope, sweet){
   $rootScope.progress = 0;
    $scope.uploadFile = function(){
        sweet.show('Результат', 'Режим блокирован', 'error');
        return;
        /*
        var file = $scope.myFile;
        $rootScope.progress = 1;
        var uploadUrl = "ajax/upPacket.php";
        fileUpload.uploadFileToUrl(file, uploadUrl).then(function(success) {
         location.reload();
        }, function(error) {
        });
        */
    };
    $http.get('ajax/getSmsinfo.php')
        .success(function(response){
            $scope.filteredReports = [];
            $scope.reports = response;
            $scope.currentPage = 1;
            $scope.pageSize = 3;
          $scope.getPage = function(){
            var begin = (($scope.currentPage - 1) * $scope.pageSize);
            var end = begin + $scope.pageSize;
            $scope.filteredReports = $filter('filter')($scope.reports, {
              name_upfr: $scope.upfrFilter,
              date_uslugi: $scope.dateuslFilter,
              created: $scope.createdFilter
            });
            $scope.totalItems = $scope.filteredReports.length;
            $scope.filteredReports = $scope.filteredReports.slice(begin, end);
          };
          $scope.getPage();
          $scope.pageChanged = function() {
            $scope.getPage();
          };
    	})
    	.error(function(reason){
    		alert("Ошибка при попытке чтения данных!?");
    	});
}]);
app.controller('mfcReceptionCtrl', ['$scope', '$http', '$filter', 'fileUpload', '$rootScope', function($scope, $http, $filter, fileUpload, $rootScope){
   $rootScope.progress = 0;
    $scope.uploadFile = function(){
        var file = $scope.myFile;
        $rootScope.progress = 1;
        var uploadUrl = "ajax/mfcReception.php";
        fileUpload.uploadFileToUrl(file, uploadUrl).then(function(success) {
        $scope.getMfcRcpt();
        }, function(error) {
        });
    };
    $scope.getMfcRcpt = function() {
      $http.get('ajax/getMfcReception.php')
        .success(function(response){
            $scope.reports = response;
    	})
    	.error(function(reason){
    		alert("Ошибка при попытке чтения данных!?");
    	});
      $http.get('ajax/getMfcNameserv.php')
        .success(function(response){
            $scope.names = response;
    	})
    	.error(function(reason){
    		alert("Ошибка при попытке чтения данных!?");
    	});
    };
    $scope.getMfcRcpt();
}]);
app.controller('upfrReceptionCtrl', ['$scope', '$http', '$filter', 'fileUpload', '$rootScope', function($scope, $http, $filter, fileUpload, $rootScope){
   $rootScope.progress = 0;
    $scope.uploadFile = function(){
        var file = $scope.myFile;
        $rootScope.progress = 1;
        var uploadUrl = "ajax/upfrReception.php";
        fileUpload.uploadFileToUrl(file, uploadUrl).then(function(success) {
        $scope.getUpfrRcpt();
        }, function(error) {
        });
    };
    $scope.getUpfrRcpt = function() {
      $http.get('ajax/getUpfrReception.php')
        .success(function(response){
            $scope.reports = response;
    	})
    	.error(function(reason){
    		alert("Ошибка при попытке чтения данных!?");
    	});
      $http.get('ajax/getMfcNameserv.php')
        .success(function(response){
            $scope.names = response;
    	})
    	.error(function(reason){
    		alert("Ошибка при попытке чтения данных!?");
    	});
    };
    $scope.getUpfrRcpt();
}]);
app.controller('mfcReception2Ctrl', ['$scope', '$http', '$filter', 'fileUpload', '$rootScope', function($scope, $http, $filter, fileUpload, $rootScope){
   $rootScope.progress = 0;
    $scope.uploadFile = function(){
        var file = $scope.myFile;
        $rootScope.progress = 1;
        var uploadUrl = "ajax/mfcReception2.php";
        fileUpload.uploadFileToUrl(file, uploadUrl).then(function(success) {
        $scope.getMfcRcpt();
        }, function(error) {
        });
    };
    $scope.getMfcRcpt = function() {
      $http.get('ajax/getMfcReception2.php')
        .success(function(response){
            $scope.reports = response;
    	})
    	.error(function(reason){
    		alert("Ошибка при попытке чтения данных!?");
    	});
      $http.get('ajax/getMfcNameserv2.php')
        .success(function(response){
            $scope.names = response;
    	})
    	.error(function(reason){
    		alert("Ошибка при попытке чтения данных!?");
    	});
    };
    $scope.getMfcRcpt();
}]);
app.controller('upfrReception2Ctrl', ['$scope', '$http', '$filter', 'fileUpload', '$rootScope', function($scope, $http, $filter, fileUpload, $rootScope){
   $rootScope.progress = 0;
    $scope.uploadFile = function(){
        var file = $scope.myFile;
        $rootScope.progress = 1;
        var uploadUrl = "ajax/upfrReception2.php";
        fileUpload.uploadFileToUrl(file, uploadUrl).then(function(success) {
        $scope.getUpfrRcpt();
        }, function(error) {
        });
    };
    $scope.getUpfrRcpt = function() {
      $http.get('ajax/getUpfrReception2.php')
        .success(function(response){
            $scope.reports = response;
    	})
    	.error(function(reason){
    		alert("Ошибка при попытке чтения данных!?");
    	});
      $http.get('ajax/getMfcNameserv2.php')
        .success(function(response){
            $scope.names = response;
    	})
    	.error(function(reason){
    		alert("Ошибка при попытке чтения данных!?");
    	});
    };
    $scope.getUpfrRcpt();
}]);
app.controller('mfcIssueCtrl', ['$scope', '$http', '$filter', 'fileUpload', '$rootScope', function($scope, $http, $filter, fileUpload, $rootScope){
   $rootScope.progress = 0;
    $scope.uploadFile = function(){
        var file = $scope.myFile;
        $rootScope.progress = 1;
        var uploadUrl = "ajax/mfcIssue.php";
        fileUpload.uploadFileToUrl(file, uploadUrl).then(function(success) {
        $scope.getMfcIssue();
        }, function(error) {
        });
    };
    $scope.getMfcIssue = function() {
        $http.get('ajax/getMfcIssue.php')
        .success(function(response){
            $scope.reports = response;
    	})
    	.error(function(reason){
    		alert("Ошибка при попытке чтения данных!?");
    	});
        $http.get('ajax/getMfcNameserv.php')
        .success(function(response){
            $scope.names = response;
    	})
    	.error(function(reason){
    		alert("Ошибка при попытке чтения данных!?");
    	});
    };
    $scope.getMfcIssue();
}]);
app.controller('mfcIssue2Ctrl', ['$scope', '$http', '$filter', 'fileUpload', '$rootScope', function($scope, $http, $filter, fileUpload, $rootScope){
   $rootScope.progress = 0;
    $scope.uploadFile = function(){
        var file = $scope.myFile;
        $rootScope.progress = 1;
        var uploadUrl = "ajax/mfcIssue2.php";
        fileUpload.uploadFileToUrl(file, uploadUrl).then(function(success) {
        $scope.getMfcIssue();
        }, function(error) {
        });
    };
    $scope.getMfcIssue = function() {
        $http.get('ajax/getMfcIssue2.php')
        .success(function(response){
            $scope.reports = response;
    	})
    	.error(function(reason){
    		alert("Ошибка при попытке чтения данных!?");
    	});
        $http.get('ajax/getMfcNameserv2.php')
        .success(function(response){
            $scope.names = response;
    	})
    	.error(function(reason){
    		alert("Ошибка при попытке чтения данных!?");
    	});
    };
    $scope.getMfcIssue();
}]);

app.controller('upfrIssueCtrl', ['$scope', '$http', '$filter', 'fileUpload', '$rootScope', function($scope, $http, $filter, fileUpload, $rootScope){
   $rootScope.progress = 0;
    $scope.uploadFile = function() {
        var file = $scope.myFile;
        $rootScope.progress = 1;
        var uploadUrl = "ajax/upfrIssue.php";
        fileUpload.uploadFileToUrl(file, uploadUrl).then(function(success) {
        $scope.getUpfrIssue();
        }, function(error) {
        });
    };
    $scope.getUpfrIssue = function() {
        $http.get('ajax/getUpfrIssue.php')
        .success(function(response){
            $scope.reports = response;
    	})
    	.error(function(reason){
    		alert("Ошибка при попытке чтения данных!?");
    	});
        $http.get('ajax/getMfcNameserv.php')
        .success(function(response){
            $scope.names = response;
    	})
    	.error(function(reason){
    		alert("Ошибка при попытке чтения данных!?");
    	});
    };
    $scope.getUpfrIssue();
}]);
app.controller('myPuzzlesCtrl', ['$scope', '$http', '$modal', '$filter', 'Data1', '$routeParams', function ($scope, $http, $modal, $filter, Data1, $routeParams) {
    $scope.puzzle = {};
    $scope.rep_id = $routeParams.id_rep;
    if ($scope.rep_id > 0) {
        $http.post("ajax/getNameReport.php",{"id_rep" : $scope.rep_id})
        .success(function(response){
            $scope.report = response;
    	})
    	.error(function(reason){
    		alert("Ошибка при попытке чтения данных!?");
    	});
    }
        $http.post("ajax/getOrgPuzzles.php",{"id_rep" : $scope.rep_id})
        .success(function(response){
            $scope.puzzles = response;
    	})
    	.error(function(reason){
    		alert("Ошибка при попытке чтения данных!?");
    	});
    $scope.changePuzzleStatus = function(puzzle){
        puzzle.status = (puzzle.status=="ПРОЦ" ? "ЗВРШ" : "ВВОД");
        Data1.put("puzzles/"+puzzle.id,{status:puzzle.status});
    };
    $scope.open = function (p,size) {
        var modalInstance = $modal.open({
          templateUrl: 'partials/puzzleEdit.html',
          controller: 'puzzleEditCtrl',
          size: size,
          resolve: {
            item: function () {
              return p;
            }
          }
        });
        modalInstance.result.then(function(selectedObject) {
            if(selectedObject.save == "insert"){
                $scope.puzzles.push(selectedObject);
                $scope.puzzles = $filter('orderBy')($scope.puzzles, 'id', 'reverse');
            }else if(selectedObject.save == "update"){
                p.str_nmb = selectedObject.str_nmb;
                p.descr = selectedObject.descr;
                p.type_val = selectedObject.type_val;
                p.pval = selectedObject.pval;
                p.login = selectedObject.login;
                p.direct = selectedObject.direct;
                p.dimen = selectedObject.dimen;
            }
        });
    };
 $scope.columns = [
                    {text:"ID",predicate:"id",sortable:true,dataType:"number"},
                    {text:"Пользователь",predicate:"login",sortable:true},
                    {text:"Служба",predicate:"direct",sortable:true},
                    {text:"Строка",predicate:"str_nmb",sortable:true},
                    {text:"Показатель",predicate:"descr",sortable:true},
                    {text:"Тип данных",predicate:"type_val",sortable:true},
                    {text:"Величина",predicate:"pval",sortable:true},
                    {text:"Ед. измер.",predicate:"dimen",sortable:true},
                    {text:"На дату.",predicate:"dateon",sortable:true},
                    {text:"Статус",predicate:"status",sortable:true},
                    {text:"Изменить",predicate:"",sortable:false}
                ];
var orderBy = $filter('orderBy');
  $scope.order = function(predicate, reverse) {
    $scope.puzzles = orderBy($scope.puzzles, predicate, reverse);
  };
  $scope.order('-id',true);
}]);
app.controller('puzzleEditCtrl', ['$scope', '$modalInstance', 'item', 'Data1', function ($scope, $modalInstance, item, Data1) {
  $scope.puzzle = angular.copy(item);
        $scope.cancel = function () {
            $modalInstance.dismiss('Close');
        };
        $scope.title = (item.id > 0) ? 'Редактировать строку' : 'Добавить строку';
        $scope.buttonText = (item.id > 0) ? 'Сохранить' : 'Добавить';
        var original = item;
        $scope.isClean = function() {
            return angular.equals(original, $scope.puzzle);
        }
        $scope.savePuzzle = function (puzzle) {
            puzzle.id = $scope.puzzle.id;
            if(puzzle.id > 0){
                Data1.put('puzzles/'+puzzle.id, puzzle).then(function (result) {
                    if(result.status != 'error'){
                        var x = angular.copy(puzzle);
                        x.save = 'update';
                        $modalInstance.close(x);
                    }else{
                    	alert("Ошибка update");
                    }
                });
            }else{
                puzzle.status = 'ВВОД';
                Data1.post('puzzles', puzzle).then(function (result) {
                    if(result.status != 'error'){
                        var x = angular.copy(puzzle);
                        x.save = 'insert';
                        x.id = result.data;
                        $modalInstance.close(x);
                    }else{
                    alert("Ошибка insert");
                    }
                });
            }
        };
}]);
app.controller('DatepickerCtrl1', ['$scope', function ($scope) {
  $scope.today = function() {
    $scope.dt1 = new Date();
  };
  $scope.today();
  $scope.clear = function () {
    $scope.dt1 = null;
  };
  $scope.minDate="2018-01-01";
  $scope.toggleMin = function() {
    $scope.minDate = $scope.minDate ? null : new Date();
  };
  $scope.toggleMin();
  $scope.open = function($event) {
    $event.preventDefault();
    $event.stopPropagation();
    $scope.opened = true;
  };
  $scope.dateOptions = {
    formatYear: 'yy',
    startingDay: 1
  };
  $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
  $scope.format = $scope.formats[0];
  var tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  var afterTomorrow = new Date();
  afterTomorrow.setDate(tomorrow.getDate() + 2);
  $scope.events =
    [
      {
        date: tomorrow,
        status: 'full'
      },
      {
        date: afterTomorrow,
        status: 'partially'
      }
    ];
    $scope.getDayClass = function(date, mode) {
    if (mode === 'day') {
      var dayToCheck = new Date(date).setHours(0,0,0,0);
        for (var i=0;i<$scope.events.length;i++){
        var currentDay = new Date($scope.events[i].date).setHours(0,0,0,0);
        if (dayToCheck === currentDay) {
          return $scope.events[i].status;
        }
      }
    }
    return '';
  };
}]);
app.controller('DatepickerCtrl2', ['$scope', function ($scope) {
  $scope.today = function() {
    $scope.dt2 = new Date();
  };
  $scope.today();
  $scope.clear = function () {
    $scope.dt2 = null;
  };
  // Disable weekend selection
  $scope.disabled = function(date, mode) {
    return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
  };
  $scope.toggleMin = function() {
    $scope.minDate = $scope.minDate ? null : new Date();
  };
  $scope.toggleMin();
  $scope.open = function($event) {
    $event.preventDefault();
    $event.stopPropagation();
    $scope.opened = true;
  };
  $scope.dateOptions = {
    formatYear: 'yy',
    startingDay: 1
  };
  $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
  $scope.format = $scope.formats[0];
  var tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  var afterTomorrow = new Date();
  afterTomorrow.setDate(tomorrow.getDate() + 2);
  $scope.events =
    [
      {
        date: tomorrow,
        status: 'full'
      },
      {
        date: afterTomorrow,
        status: 'partially'
      }
    ];
  $scope.getDayClass = function(date, mode) {
    if (mode === 'day') {
      var dayToCheck = new Date(date).setHours(0,0,0,0);
      for (var i=0;i<$scope.events.length;i++){
        var currentDay = new Date($scope.events[i].date).setHours(0,0,0,0);
        if (dayToCheck === currentDay) {
          return $scope.events[i].status;
        }
      }
    }
    return '';
  };
}]);
app.controller('formRunReportCtrl', ['$scope', '$http', '$routeParams', 'sweet', function ($scope, $http, $routeParams, sweet) {
    $scope.rep_id = $routeParams.id_rep;
    if ($scope.rep_id > 0) {
        $http.post("ajax/getNameReport.php",{"id_rep" : $scope.rep_id})
        .success(function(response){
            $scope.report = response;
    	})
    	.error(function(reason){
    		alert("Ошибка при попытке чтения данных!?");
    	});
    }
    $scope.myForm = {};
    $scope.myForm.send_all = true;
    $scope.myForm.dt1 = new Date();
    $scope.myForm.dt2 = new Date();
    $scope.enableBtn=1;
    function formatDate(date) {
                var dd = date.getDate();
                if (dd < 10) dd = '0' + dd;
                var mm = date.getMonth() + 1;
                if (mm < 10) mm = '0' + mm;
                var yyyy = date.getFullYear();
                return yyyy + '-' + mm + '-' + dd;
    }
    $scope.myForm.submitTheForm = function(item, event) {
    $scope.enableBtn=0;
    $scope.dat1=formatDate($scope.myForm.dt1);
    $scope.dat2=formatDate($scope.myForm.dt2);
       var dataObject = {
           id_rep : $scope.rep_id
          ,dat1 : $scope.dat1
          ,dat2 : $scope.dat2
          ,send_mail : $scope.myForm.send_all
          ,name_report : $scope.report[0].name_rep
       };
       $http.post("ajax/newRep.php", dataObject)
       .success(function(response) {
            if (response.message.substring(0,6) == 'Ошибка') {
              sweet.show('Результат', response.message, 'error');
            } else {
              sweet.show('Успех!', response.message, 'success');
            }
       })
       .error(function(response) {
          alert("Ошибка при отправке формы!");
       });
    }
}]);
app.controller('smsOprosCtrl', ['$scope', '$http', '$filter', '$rootScope', function($scope, $http, $filter, $rootScope){
   $rootScope.progress = 0;
   data = {};
   pageSize = 10;
   first = 0;
    $http.get('ajax/getSmsinfo.php')
        .success(function(response){
            $scope.reports = response;
            data = response;
        $scope.displayData = data.slice(first, pageSize);
        $scope.getNewItems = function() {
        	first += pageSize;
        	var newArray = data.slice(first, first + pageSize);
        	$scope.displayData = $scope.displayData.concat(newArray);
        }
    	})
    	.error(function(reason){
    		alert("Ошибка при попытке чтения данных!?");
    	});
    $scope.myForm = {};
    $scope.myForm.dt1 = new Date();
    $scope.enableBtn=1;
    function formatDate(date) {
                var dd = date.getDate();
                if (dd < 10) dd = '0' + dd;
                var mm = date.getMonth() + 1;
                if (mm < 10) mm = '0' + mm;
                var yyyy = date.getFullYear();
                return yyyy + '-' + mm + '-' + dd;
    }
}]);
  app.controller('userSendMsgCtrl', ['$scope', '$http', '$routeParams', 'sweet', function($scope, $http, $routeParams, sweet) {
		$scope.uid = $routeParams.uid;
		if ($scope.uid > 0) {
		$http.post("ajax/getEmailUser.php",{"uid" : $scope.uid})
        .success(function(response){
            $scope.user = response;
    	})
    	.error(function(reason){
    		alert("Ошибка при попытке чтения данных!?");
    	});
    	}
    $scope.myForm = {};
    $scope.enableBtn=1;
    $scope.myForm.message = "";
    $scope.myForm.submitTheForm = function(item, event) {
    $scope.enableBtn=0;
       var dataObject = {
           address : $scope.user.email
          ,message : $scope.myForm.message
       };
       var responsePromise = $http.post("ajax/sendMessage.php", dataObject, {});
       responsePromise.success(function(dataFromServer, status, headers, config) {
          sweet.show('Успех!', "Выполнено.", 'success');
       });
       responsePromise.error(function(data, status, headers, config) {
          alert("Отправка формы не удалась!");
       });
    }
  }]);
app.controller('movArchCtrl', ['$scope', '$http', '$routeParams', 'sweet', function ($scope, $http, $routeParams, sweet) {
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
    $scope.myForm = {};
    $scope.myForm.submitTheForm = function(item, event) {
    $scope.enableBtn=0;
       var dataObject = {
           id_rep : $scope.id_rep
          ,name_rep : $scope.report[0].name_rep
          ,path_out : $scope.report[0].path_out
          ,comment : $scope.report[0].comment
          ,dateon : $scope.report[0].dateon
          ,dateisp : $scope.report[0].dateisp
          ,enable_ins : $scope.report[0].enable_ins
       };
       $http.post("ajax/movArch.php", dataObject)
       .success(function(response) {
          sweet.show('Успех!', response.message, 'success');
       })
       .error(function(response) {
          alert(response.message);
       });
    }
}]);
app.controller('movZvrshCtrl', ['$scope', '$http', '$routeParams', 'sweet', function ($scope, $http, $routeParams, sweet) {
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
    $scope.myForm = {};
    $scope.myForm.submitTheForm = function(item, event) {
    $scope.enableBtn=0;
       var dataObject = {
           id_rep : $scope.id_rep
       };
       $http.post("ajax/movZvrsh.php", dataObject)
       .success(function(response) {
          sweet.show('Успех!', response.message, 'success');
       })
       .error(function(response) {
          alert(response.message);
       });
    }
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
    app.controller("svodReceptFormCtrl", ['$scope', '$http', 'sweet', '$rootScope', function($scope, $http, sweet, $rootScope) {
     $rootScope.progress = 0;
     $scope.make_svod = [];
     $scope.user = {};
     $http.get('ajax/getSession.php')
        .success(function(response){
            $scope.role = response.role;
    	})
    	.error(function(reason){
    		alert("Ошибка при попытке чтения данных!?");
    	});
     $scope.myForm = {};
     $http.get('ajax/getSvodReports.php').success(function(response){
            $scope.myForm.reports = response;
            var mrep=[];
            $scope.myForm.report = mrep;
    	})
    	.error(function(reason){
    		alert("Ошибка при попытке чтения данных!?");
    	});
    	$scope.myForm.clrfrm = function() {
    		if ( $scope.myForm.report.length > 0 ) {
    			$scope.myForm.report.splice(0,$scope.myForm.report.length);
    		}
    	   $scope.make_svod = "";
    	}
       $scope.myForm.submitTheForm = function(item, event) {
       var dataObject = {
          report : $scope.myForm.report
       };
       var lr = $scope.myForm.report.length;
       if ( lr % 2 || lr == 0) {
         sweet.show('Что-то не так...', 'Не выбрано ни одной или выбрано нечетное число строк.', 'error');
       	 return false;
       }
       $rootScope.progress = 1;
       $http.post("ajax/svod.php", dataObject)
       .success(function(response) {
       $rootScope.progress = 0;
            if (response.message.substring(0,9) == 'Отклонено') {
              sweet.show('Результат', response.message, 'error');
            } else {
              sweet.show('Успех!', response.message, 'success');
              $scope.make_svod = response.message;
            }
       })
       .error(function(response) {
          alert("Ошибка при отправке формы!");
       });
       }
    }]);
    app.controller("svodReceptForm2Ctrl", ['$scope', '$http', 'sweet', '$rootScope', function($scope, $http, sweet, $rootScope) {
     $rootScope.progress = 0;
     $scope.make_svod = [];
     $scope.user = {};
     $http.get('ajax/getSession.php')
        .success(function(response){
            $scope.role = response.role;
    	})
    	.error(function(reason){
    		alert("Ошибка при попытке чтения данных!?");
    	});
     $scope.myForm = {};
     $http.get('ajax/getSvodReports2.php').success(function(response){
            $scope.myForm.reports = response;
            var mrep=[];
            $scope.myForm.report = mrep;
    	})
    	.error(function(reason){
    		alert("Ошибка при попытке чтения данных!?");
    	});
    	$scope.myForm.clrfrm = function() {
    		if ( $scope.myForm.report.length > 0 ) {
    			$scope.myForm.report.splice(0,$scope.myForm.report.length);
    		}
    	   $scope.make_svod = "";
    	}
       $scope.myForm.submitTheForm = function(item, event) {
       var dataObject = {
          report : $scope.myForm.report
       };
       var lr = $scope.myForm.report.length;
       if ( lr < 2 || lr == 0) {
         sweet.show('Что-то не так...', 'Не выбрано ни одной или выбрана одна строка.', 'error');
       	 return false;
       }
       $rootScope.progress = 1;
       $http.post("ajax/svod2.php", dataObject)
       .success(function(response) {
       $rootScope.progress = 0;
            if (response.message.substring(0,9) == 'Отклонено') {
              sweet.show('Результат', response.message, 'error');
            } else {
              sweet.show('Успех!', response.message, 'success');
              $scope.make_svod = response.message;
            }
       })
       .error(function(response) {
          alert("Ошибка при отправке формы!");
       });
       }
    }]);