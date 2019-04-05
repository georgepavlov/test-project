var app = angular.module('myApp', ['ngRoute','ui.bootstrap','ngAnimate', 'toaster', 'hSweetAlert', 'ngSanitize']);
  app.config(['$routeProvider', function($routeProvider) {
		$routeProvider
			.when('/all_list', {
				templateUrl : 'partials/all_list.html',
				controller  : 'allListCtrl'
			})
			.when('/mobile_list', {
				templateUrl : 'partials/mobile_list.html',
				controller  : 'mobileListCtrl'
			})
			.when('/list_files', {
				templateUrl : 'partials/list_files.html',
				controller  : 'listFilesCtrl'
			})
			.when('/search', {
				templateUrl : 'partials/search_key.html',
				controller  : 'findFilesCtrl'
			})
			.when('/viewFindFiles/:key', {
				templateUrl : 'partials/view_find_files.html',
				controller  : 'viewFindFilesCtrl'
			})
            .when('/myUpfr', {
                templateUrl: 'partials/myUpfr.html',
                controller: 'myUpfrCtrl'
            })
            .when('/myUpfrDel', {
                templateUrl: 'partials/myUpfrDel.html',
                controller: 'myUpfrDelCtrl'
            })
            .when('/sel_dptcod', {
                templateUrl: 'partials/sel_dptcod.html',
                controller: 'selDptcodCtrl'
            })
            .when('/address', {
                templateUrl: 'partials/address.html',
                controller: 'addressCtrl'
            })
            .when('/contacts', {
                templateUrl: 'partials/contacts.html',
                controller: 'contactsCtrl'
            })
            .when('/gosuslugi', {
                templateUrl: 'partials/gosuslugi.html',
                controller: 'gosuslugiCtrl'
            })
            .when('/logChange', {
                templateUrl: 'partials/log_change.html',
                controller: 'logChangeCtrl'
            })
			.when('/keyAccess', {
				templateUrl : 'partials/input_key.html',
				controller  : 'setKeyAccessCtrl'
			})
			.when('/passChange', {
				templateUrl : 'partials/pass_change.html',
				controller  : 'passChangeCtrl'
			})
			.when('/opfr_otdel', {
				templateUrl : 'partials/opfr_otdel.html',
				controller  : 'loadOpfrOtdelCtrl'
			})
			.when('/opfr_dolgnost', {
				templateUrl : 'partials/opfr_dolgnost.html',
				controller  : 'loadOpfrDolgnostCtrl'
			})
			.when('/import_opfr', {
				templateUrl : 'partials/import_opfr.html',
				controller  : 'importOpfrCtrl'
			})
			.when('/load_upfr_buf', {
				templateUrl : 'partials/load_upfr_buf.html',
				controller  : 'loadUpfrBufCtrl'
			})
			.when('/upfr_otdel', {
				templateUrl : 'partials/upfr_otdel.html',
				controller  : 'loadUpfrOtdelCtrl'
			})
			.when('/upfr_dolgnost', {
				templateUrl : 'partials/upfr_dolgnost.html',
				controller  : 'loadUpfrDolgnostCtrl'
			})
			.when('/import_upfr', {
				templateUrl : 'partials/import_upfr.html',
				controller  : 'importUpfrCtrl'
			})
            .when('/instruction', {
                templateUrl: 'partials/instruc.html',
                controller: 'instrucCtrl'
            })
            .when('/library', {
                templateUrl: 'partials/library.html',
                controller: 'libraryCtrl'
            })
			.when('/cmp_upfr', {
				templateUrl : 'partials/cmp_upfr_buf.html',
				controller  : 'cmpUpfrCtrl'
			})
            .when('/imgPhones/:phone', {
                templateUrl: 'partials/imgPhones.html',
                controller: 'imgPhonesCtrl'
            })
			.when('/locOtdel', {
				templateUrl: 'partials/otdels.html',
				controller  : 'locOtdelCtrl'
			})
			.when('/locRank', {
				templateUrl: 'partials/Ranks.html',
				controller  : 'locRankCtrl'
			})
            .when('/backup', {
                templateUrl: 'partials/backup.html',
                controller: 'backupCtrl'
            })
            .when('/phoneOffice', {
                templateUrl: 'partials/phone_office.html',
                controller: 'phoneOfficeCtrl'
            })
            .otherwise({
                redirectTo: '/',
                controller: 'iniCtrl'
            });
  }]);
app.controller('iniCtrl',['$scope','$location', function($scope, $location) {
		topLeft = Math.round((screen.width - 745)/2)-38 + "px";
		$scope.objStyle = {
			"z-index" : "-1",
			"position": "fixed",
			"top"     : "50px",
			"left"    : topLeft
		}
  var phone = "";
$scope.defPosition = function(e) {
	var x = 0;
	var y = 0;
	if (!e) var e = window.event;
	if (e.pageX || e.pageY) 	{
		x = e.pageX;
		y = e.pageY;
	}
	else if (e.clientX || e.clientY) 	{
		x = e.clientX + document.body.scrollLeft
			+ document.documentElement.scrollLeft;
		y = e.clientY + document.body.scrollTop
			+ document.documentElement.scrollTop;
	}
    y0=document.getElementById("kartina").offsetTop;
    x0=document.getElementById("kartina").offsetLeft;
    x = x-x0;
    y = y-y0;
    if (x>=464 && x <=501 && y>=412 && y<=447) {
    	phone += '1';
    }
    if (x>=519 && x <=556 && y>=412 && y<=447) {
    	phone += '2';
    }
    if (x>=574 && x <=611 && y>=412 && y<=447) {
    	phone += '3';
    }
    if (x>=464 && x <=501 && y>=458 && y<=495) {
    	phone += '4';
    }
    if (x>=519 && x <=556 && y>=458 && y<=495) {
    	phone += '5';
    }
    if (x>=574 && x <=611 && y>=458 && y<=495) {
    	phone += '6';
    }
    if (x>=464 && x <=501 && y>=504 && y<=541) {
    	phone += '7';
    }
    if (x>=519 && x <=556 && y>=504 && y<=541) {
    	phone += '8';
    }
    if (x>=574 && x <=611 && y>=504 && y<=541) {
    	phone += '9';
    }
    if (x>=519 && x <=556 && y>=552 && y<=587) {
    	phone += '0';
    }
    if (x>=631 && x <=673 && y>=365 && y<=408) {
      if (phone.length >=4 && phone.length <=6) {
        $location.path('/imgPhones/'+phone);
      }
        phone = "";
    };
 }
}]);
app.controller('imgPhonesCtrl', ['$scope', '$http', '$routeParams', function ($scope, $http, $routeParams) {
     $scope.phone=$routeParams.phone;
     $http.post("ajax/getImgPhones.php",{"phone" : $scope.phone})
        .success(function(response){
            $scope.reports = response;
    	})
    	.error(function(reason){
    		alert("Ошибка при попытке чтения данных!?");
    	});
}]);
app.service('fileUpload', ['$rootScope', '$http', 'sweet', function ($rootScope, $http, sweet) {
    this.uploadFileToUrl = function (file, uploadUrl) {
        var fd = new FormData();
        fd.append('file', file);
        return $http.post(uploadUrl, fd, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
        })
            .success(function (response) {
                $rootScope.progress = 0;
                if (response.message === undefined) {
                    sweet.show('Что-то не так...', 'Файл не выбран?', 'error');
                } else {
                    if (response.message.substring(0, 9) == 'Отклонено') {
                        sweet.show('Результат', response.message, 'error');
                    } else {
                        sweet.show('Успех!', response.message, 'success');
                    }
                }
            })
            .error(function (response) {
                $rootScope.progress = 0;
                sweet.show('Что-то не так...', 'Ошибка.', 'error');
            });
    }
}]);
app.controller('selDptcodCtrl', ['$scope', '$http', 'sweet', '$timeout', function($scope, $http, sweet, $timeout) {
	$scope.enableBtn = 0;
    $scope.getCurrDptcod = function () {
        $http.get('ajax/getCurrentDptcod.php')
        .success(function(response) {
        	 $scope.curr_dptcod = response[0].curr_dptcod;
	         $http.get('ajax/getDptdsc.php')
             .success(function(response){
                    $scope.dptcls = response;
                    var j = 0;
                    for (var i=0; i < response.length; i++) {
                         if (response[i].dptcod === $scope.curr_dptcod) {
                	       j=i;
                	       break;
                         }
                    }
                    $scope.yourSelect1 = $scope.dptcls[j];
                    $scope.enableBtn = 1;
    	     })
    	     .error(function(reason){
    		        alert("Ошибка при попытке чтения данных!?");
   	         });
        })
   	    .error(function(reason){
    		alert("Ошибка при попытке чтения данных!?");
   	    });
   	};
   	$scope.getCurrDptcod();
    $scope.setDptcod1 = function(dptcod) {
    $scope.enableBtn = 0;
     var dataObject = {
         upfr_code : dptcod
     };
       $http.post("ajax/setCurrUpfr.php", dataObject)
       .success(function(response) {
       	  $scope.enableBtn = 1;
          location.reload();
       })
       .error(function(response) {
          alert("Ошибка при отправке данных!");
       });
    };
}]);
app.controller('allListCtrl', ['$scope', '$http', '$filter', '$rootScope', 'sweet', function($scope, $http, $filter, $rootScope, sweet) {
	    $http.get('ajax/getDptdsc.php')
        .success(function(response){
            $scope.dptcls = response;
            $scope.yourSelect1 = $scope.dptcls[0];
    	})
    	.error(function(reason){
    		alert("Ошибка при попытке чтения данных!?");
   	    });
        $http.get('ajax/getDptcodBrief.php')
        .success(function(response){
            $scope.otdelcls = response;
            $scope.yourSelect2 = $scope.otdelcls[23];
    	})
    	.error(function(reason){
    		alert("Ошибка при попытке чтения данных!?");
   	    });
	$scope.getAllList = function() {
      $http.get('ajax/all_list.php')
        .success(function(response){
            $scope.filteredReports = [];
            $scope.reports = response;
            $scope.currentPage = 1;
            $scope.pageSize = 10;
            $scope.getPage = function(){
              var begin = (($scope.currentPage - 1) * $scope.pageSize);
              var end = begin + $scope.pageSize;
              $scope.filteredReports = $filter('filter')($scope.reports, {
                 dptcod: $scope.filter_dptcod,
                 phone_city: $scope.filter_phone_city,
                 phone_kspd: $scope.filter_phone_kspd,
                 fam: $scope.filter_fam,
                 otdel: $scope.filter_otdel
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
    };
    $rootScope.progress = 0;
    $scope.getAllList();
    $scope.setFilter1 = function(dptcod) {
      $scope.filter_dptcod = dptcod;
      $scope.filter_otdel = "";
      $scope.pageChanged();
    }
    $scope.setFilter2 = function(brief) {
      $scope.filter_dptcod = "44000";
      $scope.filter_otdel = brief;
      $scope.pageChanged();
    }
    $scope.setFilter0 = function() {
      $scope.filter_dptcod = "";
      $scope.filter_otdel = "";
      $scope.filter_phone_city="";
      $scope.filter_phone_kspd="";
      $scope.filter_fam="";
      $scope.pageChanged();
    }
    $scope.view_office = function(dptcod, office) {
     var dataObject = {
         upfr_code : dptcod,
         id_office : office
     };
       $http.post("ajax/view_office.php", dataObject)
       .success(function(response) {
       	   sweet.show('Адрес офиса', response.message);
       })
       .error(function(response) {
          alert("Ошибка при отправке данных!");
       });
    }
}]);
app.controller('listFilesCtrl', ['$scope', '$http', '$filter', 'fileUpload', '$rootScope', 'sweet', function($scope, $http, $filter, fileUpload, $rootScope, sweet){
    $rootScope.progress = 0;
    $http.get('ajax/getSession.php')
        .success(function(response){
            $scope.role = response.role;
    	})
    	.error(function(reason){
    		alert("Ошибка при попытке чтения данных!?");
    	});
    $scope.uploadFile = function(){
        var file = $scope.myFile;
        $rootScope.progress = 1;
        var uploadUrl = "ajax/loadAnyFile.php";
        fileUpload.uploadFileToUrl(file, uploadUrl).then(function(success) {
        $scope.getListFiles();
        }, function(error) {
        });
    };
    $scope.getListFiles = function() {
        $http.get('ajax/list_files.php')
        .success(function(response){
            $scope.names = response;
    	})
    	.error(function(reason){
    		alert("Ошибка при попытке чтения данных!?");
    	});
    }
    $scope.getListFiles();
    $scope.deleteFile = function(c){
        sweet.show({
            title: 'Подтвердите',
            text: 'Удалить файл: '+c.filename+'?',
            type: 'warning',
            showCancelButton: true,
            cancelButtonText: 'Отмена',
            confirmButtonColor: '#DD6B55',
            confirmButtonText: 'Да, удалить!',
            closeOnConfirm: false
        }, function() {
     var dataObject = {
         file_name : c.filename
     };
       $http.post("ajax/delete_doc.php", dataObject)
       .success(function(response) {
                  if (response.message.substring(0,6) == 'Ошибка') {
                      sweet.show('Результат', response.message, 'error');
                  } else {
                      sweet.show('Удалено!', response.message, 'success');
                  }
                  $scope.getListFiles();
       })
       .error(function(response) {
          alert("Ошибка при отправке данных!");
       });
      });
    };
}]);
app.controller('contactsCtrl', ['$scope', '$http', '$filter', '$rootScope', function($scope, $http, $filter, $rootScope){
   $rootScope.progress = 0;
        $http.get('ajax/getContacts.php')
        .success(function(response){
            $scope.contacts = response;
    	})
    	.error(function(reason){
    		alert("Ошибка при попытке чтения данных!?");
    	});
}]);
app.controller('gosuslugiCtrl', ['$scope', '$http', '$filter', '$rootScope', function($scope, $http, $filter, $rootScope){
   $rootScope.progress = 0;
        $http.get('ajax/getGosuslugi.php')
        .success(function(response){
            $scope.contacts = response;
    	})
    	.error(function(reason){
    		alert("Ошибка при попытке чтения данных!?");
    	});
}]);
app.controller('viewFindFilesCtrl', ['$scope', '$http', '$filter', '$rootScope', '$routeParams', function($scope, $http, $filter, $rootScope, $routeParams){
   $rootScope.progress = 0;
   $scope.keyword = $routeParams.key;
        $http.get("ajax/search.php?text="+encodeURI($scope.keyword))
        .success(function(response){
            $scope.names = response;
    	})
    	.error(function(reason){
    		alert("Ошибка при попытке чтения данных!?");
    	});
}]);
app.controller('findFilesCtrl', ['$scope', '$http', '$location', function($scope, $http, $location){
    $scope.myForm = {};
    	$scope.enableBtn=1;
                $scope.myForm.submitTheForm = function() {
                if($scope.myForm.keyword == undefined) return false;
                var way = $scope.myForm.keyword;
                $scope.enableBtn=0;
                $location.path("/viewFindFiles/"+way);
                }
}]);
app.controller('myUpfrCtrl', ['$scope', '$modal', '$http', '$filter', '$rootScope', 'sweet', function($scope, $modal, $http, $filter, $rootScope, sweet) {
        $http.get('ajax/getUpfrdsc.php')
        .success(function(response){
            $scope.upfrdsc = response;
    	})
    	.error(function(reason){
    		alert("Ошибка при попытке чтения данных!?");
   	    });
	$scope.getUpfrList = function() {
      $http.get('ajax/upfr_list.php')
        .success(function(response){
            $scope.names = response;
    	})
    	.error(function(reason){
    		alert("Ошибка при попытке чтения данных!?");
   	    });
    }
    $scope.getUpfrList();
    $scope.deleteName = function(c){
        sweet.show({
            title: 'Подтвердите',
            text: 'Удалить запись: '+c.fam+'?',
            type: 'warning',
            showCancelButton: true,
            cancelButtonText: 'Отмена',
            confirmButtonColor: '#DD6B55',
            confirmButtonText: 'Да, удалить!',
            closeOnConfirm: false
        }, function() {
            $http.get('ajax/delOne.php?id='+c.id)
            .success(function(response) {
                  if (response.message.substring(0,6) == 'Ошибка') {
                      sweet.show('Результат', response.message, 'error');
                  } else {
                      sweet.show('Удалено!', response.message, 'success');
                  }
                  $scope.getUpfrList();
            })
        	.error(function(reason){
        		alert("Ошибка при попытке чтения данных!?");
   	        });
        });
    };
            $scope.blank = {
                id : ''
                ,phone_city : ''
                ,phone_kspd  : ''
                ,fam : ''
                ,nam : ''
                ,ptr : ''
                ,dolgnost : ''
                ,otdelname : ''
            };
    $scope.openName = function (p,size) {
    $scope.animationsEnabled = true;
        var modalInstance = $modal.open({
          animation: $scope.animationsEnabled,
          templateUrl: 'partials/oneRecordEdit.html',
          controller: 'oneRecordEditCtrl',
          size: size,
          resolve: {
            item: function () {
              return p;
            }
          }
        });
        modalInstance.result.then(function(selectedObject) {
            if(selectedObject.save == "insert"){
                $scope.getUpfrList();
            }else if(selectedObject.save == "update"){
                p.id = selectedObject.id;
                p.phone_city = selectedObject.phone_city;
                p.phone_kspd = selectedObject.phone_kspd;
                p.fam = selectedObject.fam;
                p.nam = selectedObject.nam;
                p.ptr = selectedObject.ptr;
                p.dolgnost = selectedObject.dolgnost;
                p.otdel = selectedObject.otdel;
            }
        });
    };
}]);
app.controller('myUpfrDelCtrl', ['$scope', '$http', '$filter', '$rootScope', 'sweet', function($scope, $http, $filter, $rootScope, sweet) {
        $http.get('ajax/getUpfrdsc.php')
        .success(function(response){
            $scope.upfrdsc = response;
    	})
    	.error(function(reason){
    		alert("Ошибка при попытке чтения данных!?");
   	    });
	$scope.getUpfrList = function() {
      $http.get('ajax/getPhonelstNotInBuxls.php')
        .success(function(response){
            $scope.names = response;
    	})
    	.error(function(reason){
    		alert("Ошибка при попытке чтения данных!?");
   	    });
    }
    $scope.getUpfrList();
    $scope.deleteName = function(c){
        sweet.show({
            title: 'Подтвердите',
            text: 'Удалить запись: '+c.fam+'?',
            type: 'warning',
            showCancelButton: true,
            cancelButtonText: 'Отмена',
            confirmButtonColor: '#DD6B55',
            confirmButtonText: 'Да, удалить!',
            closeOnConfirm: false
        }, function() {
            $http.get('ajax/delOne.php?id='+c.id)
            .success(function(response) {
                  if (response.message.substring(0,6) == 'Ошибка') {
                      sweet.show('Результат', response.message, 'error');
                  } else {
                      sweet.show('Удалено!', response.message, 'success');
                  }
                  $scope.getUpfrList();
            })
        	.error(function(reason){
        		alert("Ошибка при попытке чтения данных!?");
   	        });
        });
    };
}]);
app.controller('oneRecordEditCtrl', ['$scope', '$modalInstance', 'item', '$http', 'sweet', function ($scope, $modalInstance, item, $http, sweet) {
  $scope.record = angular.copy(item);
  $scope.enableBtn = 0;
  $scope.myForm = {};
        $http.get('ajax/getRankUpfr.php').success(function(response){
            $scope.rankUpfr = response;
            var j=0;
            for (var i=0; i < response.length; i++) {
                if (response[i].name_post === $scope.record.dolgnost) {
                	j=i;
                }
            }
            $scope.myForm.rankUpfr = $scope.rankUpfr[j];
            $http.get('ajax/getOtdelUpfr.php').success(function(response){
                   $scope.otdelUpfr = response;
                   var j=0;
                   for (var i=0; i < response.length; i++) {
                         if (response[i].otdelname === $scope.record.otdel) {
                	        j=i;
                         }
                   }
                   $scope.myForm.otdelUpfr = $scope.otdelUpfr[j];
                   $scope.enableBtn = 1;
    	    })
    	    .error(function(reason){
    		       alert("Ошибка при попытке чтения данных!?");
    	    });
    	})
    	.error(function(reason){
    		alert("Ошибка при попытке чтения данных!?");
    	});
        $scope.paste_fio = function(x) {
var strbuf = new Array();
var inside = new Array();
var del = "\n";
var fam_fill=0;
var nam_fill=0;
var ptr_fill=0;
strbuf = x.split(del);
  if (strbuf.length >= 1) {
      for (var j = 0; j <strbuf.length; j++) {
           strbuf[j]=strbuf[j].replace(/\s+/g," ");
           if (strbuf[j].match(/[А-Яа-я]/)) {
               inside=strbuf[j].split(" ");
               for (var k = 0; k < inside.length; k++) {
               	if (inside[k] != null) {
	                if (inside[k].match(/[А-Яа-я]/)) {
	                	if (fam_fill == 0) {
	                		$scope.record.fam = inside[k];
	                		$scope.record.nam = "";
	                		$scope.record.ptr = "";
	                		fam_fill=1;
	                		continue;
	                	}
	                	if (nam_fill == 0) {
	                		$scope.record.nam = inside[k];
	                		nam_fill=1;
	                		continue;
	                	}
	                	if (ptr_fill == 0) {
	                		$scope.record.ptr = inside[k];
	                		ptr_fill=1;
	                		continue;
	                	}
	                }
	            }
	           }
	       }
      }
   }
        }
        $scope.clipbuf = function () {
if (window.clipboardData === undefined) {
	         $http.get('ajax/getClp.php')
             .success(function(response){
             $scope.paste_fio(response[0]);
    	     })
    	     .error(function(reason){
    		        alert("Ошибка при попытке чтения данных!?");
   	         });
} else {
        var x = clipboardData.getData("Text");
        if (x==null) {
	         alert("Буфер обмена пуст.");
	         return;
	    }
        $scope.paste_fio(x);
        clipboardData.clearData();
}
        };
        $scope.cancel = function () {
            $modalInstance.dismiss('Close');
        };

        $scope.buttonText = (item.id > 0) ? 'Сохранить' : 'Добавить';
        var original = item;
        $scope.isClean = function() {
            return angular.equals(original, $scope.record);
        }
        $scope.saveRecord = function (record) {
            $scope.enableBtn = 0;
            record.id = $scope.record.id;
            record.dolgnost = $scope.myForm.rankUpfr.name_post;
            record.otdel = $scope.myForm.otdelUpfr.otdelname
            var dataObject = {
                id : record.id
                ,phone_city : record.phone_city
                ,phone_kspd  : record.phone_kspd
                ,fam :  record.fam
                ,nam : record.nam
                ,ptr : record.ptr
                ,dolgnost : record.dolgnost
                ,otdelname : record.otdel
            };
            if(record.id > 0){
               var responsePromise = $http.post("ajax/updateRecordUpfr.php", dataObject, {});
               responsePromise.success(function(dataFromServer, status, headers, config) {
                  if (dataFromServer.message.substring(0,6) == 'Ошибка') {
                      sweet.show('Результат', dataFromServer.message, 'error');
                      $modalInstance.close(x);
                  } else {
                      sweet.show('Успех!', "Сохранено.", 'success');
                      var x = angular.copy(record);
                      x.save = 'update';
                      $modalInstance.close(x);
                  }
               });
               responsePromise.error(function(data, status, headers, config) {
                        alert("Отправка формы не удалась!");
               });
            } else {
               var responsePromise = $http.post("ajax/insertRecordUpfr.php", dataObject, {});
               responsePromise.success(function(dataFromServer, status, headers, config) {
                  if (dataFromServer.message.substring(0,6) == 'Ошибка') {
                      sweet.show('Результат', dataFromServer.message, 'error');
                      $modalInstance.close(x);
                  } else {
                        sweet.show('Успех!', "Сохранено.", 'success');
                        var x = angular.copy(record);
                        x.save = 'insert';
                        $modalInstance.close(x);
                  }
               });
               responsePromise.error(function(data, status, headers, config) {
                        alert("Отправка формы не удалась!");
               });
            }
        };
}]);
app.controller('mobileListCtrl', ['$scope', '$modal', '$http', '$filter', '$rootScope', 'sweet', function($scope, $modal, $http, $filter, $rootScope, sweet){
   $rootScope.progress = 0;
	$scope.getMobList = function() {
        $http.get('ajax/getMobiles.php')
        .success(function(response){
            $scope.mobiles = response;
    	})
    	.error(function(reason){
    		alert("Ошибка при попытке чтения данных!?");
    	});
    };
    $scope.getMobList();
    $scope.deleteMobile = function(c){
        sweet.show({
            title: 'Подтвердите',
            text: 'Удалить запись: '+c.fam+'?',
            type: 'warning',
            showCancelButton: true,
            cancelButtonText: 'Отмена',
            confirmButtonColor: '#DD6B55',
            confirmButtonText: 'Да, удалить!',
            closeOnConfirm: false
        }, function() {
            $http.get('ajax/delOneMob.php?id='+c.id)
            .success(function(response) {
                  if (response.message.substring(0,6) == 'Ошибка') {
                      sweet.show('Результат', response.message, 'error');
                  } else {
                      sweet.show('Удалено!', response.message, 'success');
                  }
                  $scope.getMobList();
            })
        	.error(function(reason){
        		alert("Ошибка при попытке чтения данных!?");
   	        });
        });
    };
            $scope.blank = {
                id : ''
                ,mobile : ''
                ,fam : ''
                ,nam : ''
                ,ptr : ''
                ,name_post : ''
            };
    $scope.openMobile = function (p,size) {
    $scope.animationsEnabled = true;
        var modalInstance = $modal.open({
          animation: $scope.animationsEnabled,
          templateUrl: 'partials/oneMobEdit.html',
          controller: 'oneMobEditCtrl',
          size: size,
          resolve: {
            item: function () {
              return p;
            }
          }
        });
        modalInstance.result.then(function(selectedObject) {
            if(selectedObject.save == "insert"){
                $scope.getMobList();
            }else if(selectedObject.save == "update"){
                p.id = selectedObject.id;
                p.mobile = selectedObject.mobile;
                p.fam = selectedObject.fam;
                p.nam = selectedObject.nam;
                p.ptr = selectedObject.ptr;
                p.name_post = selectedObject.name_post;
            }
        });
    };
}]);
app.controller('oneMobEditCtrl', ['$scope', '$modalInstance', 'item', '$http', 'sweet', function ($scope, $modalInstance, item, $http, sweet) {
  $scope.record = angular.copy(item);
  $scope.enableBtn = 0;
  $scope.myForm = {};
        $http.get('ajax/getRank.php').success(function(response){
            $scope.rankUpfr = response;
            var j=0;
            for (var i=0; i < response.length; i++) {
                if (response[i].name_post === $scope.record.name_post) {
                	j=i;
                }
            }
            $scope.myForm.rankUpfr = $scope.rankUpfr[j];
            $scope.enableBtn = 1;
    	})
    	.error(function(reason){
    		alert("Ошибка при попытке чтения данных!?");
    	});
        $scope.cancel = function () {
            $modalInstance.dismiss('Close');
        };
        $scope.buttonText = (item.id > 0) ? 'Сохранить' : 'Добавить';
        var original = item;
        $scope.isClean = function() {
            return angular.equals(original, $scope.record);
        }
        $scope.saveRecord = function (record) {
            $scope.enableBtn = 0;
            record.id = $scope.record.id;
            record.name_post = $scope.myForm.rankUpfr.name_post;
            var dataObject = {
                id : record.id
                ,mobile : record.mobile
                ,fam :  record.fam
                ,nam : record.nam
                ,ptr : record.ptr
                ,name_post : record.name_post
            };
            if(record.id > 0){
               var responsePromise = $http.post("ajax/updateRecordMob.php", dataObject, {});
               responsePromise.success(function(dataFromServer, status, headers, config) {
                  if (dataFromServer.message.substring(0,6) == 'Ошибка') {
                      sweet.show('Результат', dataFromServer.message, 'error');
                      $modalInstance.close(x);
                  } else {
                      sweet.show('Успех!', "Сохранено.", 'success');
                      var x = angular.copy(record);
                      x.save = 'update';
                      $modalInstance.close(x);
                  }
               });
               responsePromise.error(function(data, status, headers, config) {
                        alert("Отправка формы не удалась!");
               });
            } else {
               var responsePromise = $http.post("ajax/insertRecordMob.php", dataObject, {});
               responsePromise.success(function(dataFromServer, status, headers, config) {
                  if (dataFromServer.message.substring(0,6) == 'Ошибка') {
                      sweet.show('Результат', dataFromServer.message, 'error');
                      $modalInstance.close(x);
                  } else {
                        sweet.show('Успех!', "Сохранено.", 'success');
                        var x = angular.copy(record);
                        x.save = 'insert';
                        $modalInstance.close(x);
                  }
               });
               responsePromise.error(function(data, status, headers, config) {
                        alert("Отправка формы не удалась!");
               });
            }
        };
}]);
app.controller('addressCtrl', ['$scope', '$modal', '$http', '$filter', '$rootScope', 'sweet', function($scope, $modal, $http, $filter, $rootScope, sweet){
   $rootScope.progress = 0;
	$scope.getAddressList = function() {
        $http.get('ajax/getAddress.php')
        .success(function(response){
            $scope.address = response;
    	})
    	.error(function(reason){
    		alert("Ошибка при попытке чтения данных!?");
    	});
    };
    $scope.getAddressList();
    $scope.openAddress = function (p,size) {
    $scope.animationsEnabled = true;
        var modalInstance = $modal.open({
          animation: $scope.animationsEnabled,
          templateUrl: 'partials/oneAddressEdit.html',
          controller: 'oneAddressEditCtrl',
          size: size,
          resolve: {
            item: function () {
              return p;
            }
          }
        });
        modalInstance.result.then(function(selectedObject) {
                p.dptcod = selectedObject.dptcod;
                p.citycode = selectedObject.citycode;
                p.dptdsc = selectedObject.dptdsc;
                p.adress = selectedObject.adress;
        });
    };
}]);
app.controller('oneAddressEditCtrl', ['$scope', '$modalInstance', 'item', '$http', 'sweet', function ($scope, $modalInstance, item, $http, sweet) {
  $scope.enableBtn = 1;
  $scope.record = angular.copy(item);
  $scope.myForm = {};
        $scope.cancel = function () {
            $modalInstance.dismiss('Close');
        };
        $scope.buttonText = 'Сохранить';
        var original = item;
        $scope.isClean = function() {
            return angular.equals(original, $scope.record);
        }
        $scope.saveRecord = function (record) {
            $scope.enableBtn = 0;
            var dataObject = {
                dptcod : record.dptcod
                ,citycode : record.citycode
                ,dptdsc :  record.dptdsc
                ,adress : record.adress
            };
               var responsePromise = $http.post("ajax/updateRecordAddress.php", dataObject, {});
               responsePromise.success(function(dataFromServer, status, headers, config) {
                  if (dataFromServer.message.substring(0,6) == 'Ошибка') {
                      sweet.show('Результат', dataFromServer.message, 'error');
                      $modalInstance.close(x);
                  } else {
                      sweet.show('Успех!', "Сохранено.", 'success');
                      var x = angular.copy(record);
                      x.save = 'update';
                      $modalInstance.close(x);
                  }
               });
               responsePromise.error(function(data, status, headers, config) {
                        alert("Отправка формы не удалась!");
               });
        };
}]);
app.controller('logChangeCtrl', ['$scope', '$http', '$filter', function($scope, $http, $filter) {
        $http.get('ajax/getUpfrdsc.php')
        .success(function(response){
            $scope.upfrdsc = response;
    	})
    	.error(function(reason){
    		alert("Ошибка при попытке чтения данных!?");
   	    });
        $http.get('ajax/getLogChange.php')
        .success(function(response){
            $scope.log = response;
    	})
    	.error(function(reason){
    		alert("Ошибка при попытке чтения данных!?");
    	});
  var orderBy = $filter('orderBy');
  $scope.order = function(predicate, reverse) {
    $scope.log = orderBy($scope.log, predicate, reverse);
  };
  $scope.order('-id',true);
}]);
app.controller('passChangeCtrl', ['$scope', '$http', 'sweet' , function($scope, $http, sweet) {
      $scope.myForm = {};
      $scope.enableBtn=1;
      $scope.myForm.submitTheForm = function() {
      $scope.enableBtn=0;
               if($scope.myForm.oldpass == undefined || $scope.myForm.newpass == undefined ) return false;
                    var dataObject = {
                        oldpass : $scope.myForm.oldpass,
                        newpass : $scope.myForm.newpass
                        };
               var responsePromise = $http.post("ajax/changePass.php", dataObject, {});
               responsePromise.success(function(dataFromServer, status, headers, config) {
                  if (dataFromServer.message.substring(0,6) == 'Ошибка') {
                      sweet.show('Результат', dataFromServer.message, 'error');
                      $scope.enableBtn=1;
                  } else {
                      sweet.show('Успех!', "Выполнено.", 'success');
                  }
               });
               responsePromise.error(function(data, status, headers, config) {
                        alert("Отправка формы не удалась!");
               });
      }
   }]);
app.controller('setKeyAccessCtrl', ['$scope', '$http', 'sweet' , function($scope, $http, sweet) {
      $scope.myForm = {};
      $scope.enableBtn=1;
      $scope.myForm.submitTheForm = function() {
      $scope.enableBtn=0;
               if($scope.myForm.keyword == undefined) {
                    $scope.enableBtn=1;
               	    return false;
               }
                    var dataObject = {
                        key : $scope.myForm.keyword
                        };
               var responsePromise = $http.post("ajax/setAccess.php", dataObject, {});
               responsePromise.success(function(dataFromServer, status, headers, config) {
                  $scope.enableBtn=1;
                  if (dataFromServer.message.substring(0,6) == 'Ошибка') {
                      sweet.show('Результат', dataFromServer.message, 'error');
                  } else {
                      sweet.show('Успех!', "Выполнено.", 'success');
                  }
               });
               responsePromise.error(function(data, status, headers, config) {
                        alert("Отправка формы не удалась!");
               });
      }
}]);
app.controller('loadOpfrOtdelCtrl', ['$scope', '$http', '$filter', 'fileUpload', '$rootScope', 'sweet', function($scope, $http, $filter, fileUpload, $rootScope, sweet) {
   $rootScope.progress = 0;
    $scope.uploadFile = function(){
        var file = $scope.myFile;
        $rootScope.progress = 1;
        var uploadUrl = "ajax/loadOpfrXls.php?cmp="+$scope.cmp_table;
        fileUpload.uploadFileToUrl(file, uploadUrl).then(function(success) {
        $scope.getBufXls();
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
    $scope.cmp_table = true;
    $http.get('ajax/getDptcodBrief.php')
        .success(function(response){
            $scope.dptcls = response;
            $scope.yourSelect = $scope.dptcls[0];
    	})
    	.error(function(reason){
    		alert("Ошибка при попытке чтения данных!?");
   	});
    $scope.getBufXls = function() {
      $http.get('ajax/getBufXls.php')
        .success(function(response){
            $scope.reports = response;
    	})
    	.error(function(reason){
    		alert("Ошибка при попытке чтения данных!?");
    	});
    };
    $scope.getBufXls();
    $scope.setFilter = function(brief) {
      $scope.filterReport = brief;
    }
    $scope.setDptcod = function(dptcod) {
     var selRows=[];
     var dataObject = {
         otdelcode : dptcod,
         rows : selRows
     }
     var j = 0;
     for (var i = 0; i < $scope.filteredReports.length; i++) {
     	if ($scope.checkedRows.indexOf($scope.filteredReports[i].rownmb) != -1) {
            selRows[j] = $scope.filteredReports[i].rownmb;
     	    $scope.reports[$scope.filteredReports[i].id-1].otdelcode = (dptcod == undefined ? '?' : dptcod);
     	    j = j + 1;
     	}
     }
     if (j > 0) {
       $http.post("ajax/setOtdel.php", dataObject)
       .success(function(response) {
          sweet.show('Успех!', response.message, 'success');
       })
       .error(function(response) {
          alert("Ошибка при отправке данных!");
       });
     }
    }
}]);
app.controller('loadOpfrDolgnostCtrl', ['$scope', '$http', '$filter', '$rootScope', 'sweet', function($scope, $http, $filter, $rootScope, sweet) {
   $rootScope.progress = 0;
    $scope.checkedRows = [];
    $scope.toggleCheck = function (rownmb) {
        if ($scope.checkedRows.indexOf(rownmb) === -1) {
            $scope.checkedRows.push(rownmb);
        } else {
            $scope.checkedRows.splice($scope.checkedRows.indexOf(rownmb), 1);
        }
    };
    $http.get('ajax/getDptcodBrief2.php')
        .success(function(response){
            $scope.dptcls = response;
            $scope.yourSelect = $scope.dptcls[0];
    	})
    	.error(function(reason){
    		alert("Ошибка при попытке чтения данных!?");
   	});
    $scope.getBufXls2 = function() {
      $http.get('ajax/getBufXls2.php')
        .success(function(response){
            $scope.reports = response;
    	})
    	.error(function(reason){
    		alert("Ошибка при попытке чтения данных!?");
    	});
    };
    $scope.getBufXls2();
    $scope.setFilter = function(brief) {
      $scope.filterReport = brief;
    }
    $scope.setDolgnost = function(brief) {
     var selRows=[];
     var dataObject = {
         dolgnost : brief,
         rows : selRows
     }
     var j = 0;
     for (var i = 0; i < $scope.filteredReports.length; i++) {
     	if ($scope.checkedRows.indexOf($scope.filteredReports[i].rownmb) != -1) {
            selRows[j] = $scope.filteredReports[i].rownmb;
     	    $scope.reports[$scope.filteredReports[i].id-1].dolgnost_bd = (brief == undefined ? '?' : brief);
     	    j = j + 1;
     	}
     }
     if (j > 0) {
       $http.post("ajax/setDolgnostOPFR.php", dataObject)
       .success(function(response) {
          sweet.show('Успех!', response.message, 'success');
       })
       .error(function(response) {
          alert("Ошибка при отправке данных!");
       });
     }
    }
}]);
app.controller('importOpfrCtrl', ['$scope', '$http', '$filter', '$rootScope', 'sweet', function($scope, $http, $filter, $rootScope, sweet) {
   $rootScope.progress = 0;
    $http.get('ajax/getCheckBufxls.php')
        .success(function(response){
            $scope.check_bufxls = response[0].check_bufxls;
    	})
    	.error(function(reason){
    		alert("Ошибка при попытке чтения данных!?");
   	});
    $scope.getBufXls3 = function() {
      $http.get('ajax/getBufXls3.php')
        .success(function(response){
            $scope.reports = response;
    	})
    	.error(function(reason){
    		alert("Ошибка при попытке чтения данных!?");
    	});
    };
    $scope.getBufXls3();
    $scope.setNewXLS = function() {
       $rootScope.progress = 1;
       $http.get('ajax/setNewOPFR.php')
            .success(function (response) {
                $rootScope.progress = 0;
                if (response.message === undefined) {
                    sweet.show('Что-то не так...', 'Ошибка?', 'error');
                } else {
                    if (response.message.substring(0, 9) == 'Отклонено') {
                        sweet.show('Результат', response.message, 'error');
                    } else {
                        sweet.show('Успех!', response.message, 'success');
                    }
                }
            })
            .error(function (response) {
                $rootScope.progress = 0;
                sweet.show('Что-то не так...', 'Ошибка.', 'error');
            });
    };
}]);
app.controller('loadUpfrOtdelCtrl', ['$scope', '$http', '$filter', '$rootScope', 'sweet', function($scope, $http, $filter, $rootScope, sweet) {
    $rootScope.progress = 0;
    $scope.checkedRows = [];
    $scope.toggleCheck = function (rownmb) {
        if ($scope.checkedRows.indexOf(rownmb) === -1) {
            $scope.checkedRows.push(rownmb);
        } else {
            $scope.checkedRows.splice($scope.checkedRows.indexOf(rownmb), 1);
        }
    };
    $http.get('ajax/getDptcodBrief3.php')
        .success(function(response){
            $scope.dptcls = response;
            $scope.yourSelect = $scope.dptcls[0];
    	})
    	.error(function(reason){
    		alert("Ошибка при попытке чтения данных!?");
   	});
    $scope.getBufXlsUpfr = function() {
      $http.get("ajax/getBufXlsUpfr.php")
        .success(function(response){
            $scope.rep = response;
    	})
    	.error(function(reason){
    		alert("Ошибка при попытке чтения данных!?");
    	});
    };
    $scope.getBufXlsUpfr();
    $scope.setFilter = function(brief) {
      $scope.filterReport = brief;
    }
    $scope.setOtdelcode = function(otdelcod, brief) {
     var selRows=[];
     var dataObject = {
         otdelcode : otdelcod,
         otdelname : brief,
         rows : selRows
     }
     var j = 0;
     for (var i = 0; i < $scope.filteredRep.length; i++) {
     	if ($scope.checkedRows.indexOf($scope.filteredRep[i].rownmb) != -1) {
            selRows[j] = $scope.filteredRep[i].rownmb;
     	    j = j + 1;
     	}
     }
     if (j > 0) {
       $http.post("ajax/setOtdelUpfr.php", dataObject)
       .success(function(response) {
          $scope.getBufXlsUpfr();
          sweet.show('Успех!', response.message, 'success');
       })
       .error(function(response) {
          alert("Ошибка при отправке данных!");
       });
     }
    }
}]);
app.controller('loadUpfrDolgnostCtrl', ['$scope', '$http', '$filter', '$rootScope', 'sweet', function($scope, $http, $filter, $rootScope, sweet) {
    $rootScope.progress = 0;
    $scope.checkedRows = [];
    $scope.toggleCheck = function (rownmb) {
        if ($scope.checkedRows.indexOf(rownmb) === -1) {
            $scope.checkedRows.push(rownmb);
        } else {
            $scope.checkedRows.splice($scope.checkedRows.indexOf(rownmb), 1);
        }
    };
    $http.get('ajax/getDptcodBrief4.php')
        .success(function(response){
            $scope.dptcls = response;
            $scope.yourSelect = $scope.dptcls[0];
    	})
    	.error(function(reason){
    		alert("Ошибка при попытке чтения данных!?");
   	});
    $scope.getBufXlsUpfrDolgnost = function() {
      $http.get("ajax/getBufXlsUpfrDolgnost.php")
        .success(function(response){
            $scope.rep = response;
    	})
    	.error(function(reason){
    		alert("Ошибка при попытке чтения данных!?");
    	});
    };
    $scope.getBufXlsUpfrDolgnost();
    $scope.setFilter = function(brief) {
      $scope.filterReport = brief;
    }
    $scope.setDolgnost = function(brief) {
     var selRows=[];
     var dataObject = {
         dolgnost : brief,
         rows : selRows
     }
     var j = 0;
     for (var i = 0; i < $scope.filteredRep.length; i++) {
     	if ($scope.checkedRows.indexOf($scope.filteredRep[i].rownmb) != -1) {
            selRows[j] = $scope.filteredRep[i].rownmb;
     	    j = j + 1;
     	}
     }
     if (j > 0) {
       $http.post("ajax/setDolgnostUpfr.php", dataObject)
       .success(function(response) {
       	  $scope.getBufXlsUpfrDolgnost();
          sweet.show('Успех!', response.message, 'success');
       })
       .error(function(response) {
          alert("Ошибка при отправке данных!");
       });
     }
    }
}]);
app.controller('importUpfrCtrl', ['$scope', '$http', '$filter', '$rootScope', 'sweet', function($scope, $http, $filter, $rootScope, sweet) {
   $rootScope.progress = 0;
    $http.get("ajax/getCheckBufupfrxls.php")
        .success(function(response){
            $scope.check_bufxls = response[0].check_bufxls;
    	})
    	.error(function(reason){
    		alert("Ошибка при попытке чтения данных!?");
   	});
    $scope.getBufXlsUpfr3 = function() {
      $http.get("ajax/getBufXlsUpfr3.php")
        .success(function(response){
            $scope.reports = response;
    	})
    	.error(function(reason){
    		alert("Ошибка при попытке чтения данных!?");
    	});
    };
    $scope.getBufXlsUpfr3();
    $scope.setNewUpfrXLS = function() {
       $rootScope.progress = 1;
       $http.get("ajax/setNewUpfr.php")
            .success(function (response) {
                $rootScope.progress = 0;
                if (response.message === undefined) {
                    sweet.show('Что-то не так...', 'Ошибка?', 'error');
                } else {
                    if (response.message.substring(0, 9) == 'Отклонено') {
                        sweet.show('Результат', response.message, 'error');
                    } else {
                        sweet.show('Успех!', response.message, 'success');
                    }
                }
            })
            .error(function (response) {
                $rootScope.progress = 0;
                sweet.show('Что-то не так...', 'Ошибка.', 'error');
            });
    };
}]);
app.controller('loadUpfrBufCtrl', ['$scope', '$http', '$filter', 'fileUpload', '$rootScope', 'sweet', function($scope, $http, $filter, fileUpload, $rootScope, sweet) {
   $rootScope.progress = 0;
    $scope.uploadFile = function(){
        var file = $scope.myFile;
        $rootScope.progress = 1;
        var uploadUrl = "ajax/loadUpfrXls.php";
        fileUpload.uploadFileToUrl(file, uploadUrl).then(function(success) {
        $scope.getBufXlsUpfr1();
        }, function(error) {
        });
    };
    $scope.getBufXlsUpfr1 = function() {
      $http.get("ajax/getBufXlsUpfr1.php")
        .success(function(response){
            $scope.reports = response;
    	})
    	.error(function(reason){
    		alert("Ошибка при попытке чтения данных!?");
    	});
    };
    $scope.getBufXlsUpfr1();
}]);
app.controller('cmpUpfrCtrl', ['$scope', '$http', '$filter', 'fileUpload', '$rootScope', 'sweet', function($scope, $http, $filter, fileUpload, $rootScope, sweet) {
   $rootScope.progress = 0;
    $scope.uploadFile = function(){
        var file = $scope.myFile;
        $rootScope.progress = 1;
        var uploadUrl = "ajax/cmpUpfrXls.php";
        fileUpload.uploadFileToUrl(file, uploadUrl).then(function(success) {
        $scope.getBufCmpXlsUpfr1();
        }, function(error) {
        });
    };
    $scope.getBufCmpXlsUpfr1 = function() {
      $http.get("ajax/getCmpXlsUpfr1.php")
        .success(function(response){
            $scope.reports = response;
    	})
    	.error(function(reason){
    		alert("Ошибка при попытке чтения данных!?");
    	});
    };
    $scope.getBufCmpXlsUpfr1();
}]);
app.controller('instrucCtrl',['$scope', function($scope) {
		$scope.info = 'О программе';
}]);
app.controller('libraryCtrl',['$scope', '$http', 'sweet', '$location', function($scope, $http, sweet, $location) {
          sweet.show(
          {
            title: 'Поиск в библиотеке',
            text: 'Открыть окно для поиска в библиотеке ?',
            type: 'warning',
            showCancelButton: true,
            cancelButtonText: 'Отмена',
            closeOnCancel: true,
            confirmButtonColor: '#DD6B55',
            confirmButtonText: 'Да',
            closeOnConfirm: true
          }, function(isConfirm) {
          	  if(isConfirm) {
               $http.get("ajax/library.php?id=999&frame_name=PhonesList")
                  .success(function(response){
    		        newWindow = window.open("http://10.44.0.11/library/docstorage.nsf/4a944ed12b7f3b34c325788d0029eb7a?OpenForm","tmp");
    		        //newWindow = window.open("http://www.google.ru","tmp");
                    newWindow.focus();
                    $location.path('/');
    	          })
    	          .error(function(reason){
    		        alert("Ошибка при попытке регистрации входа в библиотеку.");
    	          });
    	      } else {
         	      //window.location.href = "#/";
         	      $location.path('/');
         	      $scope.$apply();
    	      }
    	     }
          );
}]);
app.controller('locOtdelCtrl', ['$scope', '$routeParams', '$modal', '$http', 'sweet', function ($scope, $routeParams, $modal, $http, sweet) {
     $scope.dpt = $routeParams.dpt;
     $scope.getOtdelsList = function() {
        $http.post("ajax/getOtdels.php",{"dpt" : $scope.dpt})
        .success(function(response){
            $scope.otdels = response;
    	})
    	.error(function(reason){
    		alert("Ошибка при попытке чтения данных!?");
    	});
     };
     $scope.getOtdelsList();
    $scope.deleteOtdel = function(c){
        sweet.show({
            title: 'Подтвердите',
            text: 'Удалить запись: '+c.otdelname+'?',
            type: 'warning',
            showCancelButton: true,
            cancelButtonText: 'Отмена',
            confirmButtonColor: '#DD6B55',
            confirmButtonText: 'Да, удалить!',
            closeOnConfirm: false
        }, function() {
            $http.get('ajax/delOneOtdel.php?id='+c.id+'&dpt='+$scope.dpt)
            .success(function(response) {
                  if (response.message.substring(0,6) == 'Ошибка') {
                      sweet.show('Результат', response.message, 'error');
                  } else {
                      sweet.show('Удалено!', response.message, 'success');
                  }
                  $scope.getOtdelsList();
            })
        	.error(function(reason){
        		alert("Ошибка при попытке чтения данных!?");
   	        });
        });
    };
            $scope.blank = {
                id : '',
            	dpt : $scope.dpt
                ,otdelcode : ''
                ,otdelname : ''
            };
    $scope.openOtdel = function (p,size) {
    $scope.animationsEnabled = true;
        var modalInstance = $modal.open({
          animation: $scope.animationsEnabled,
          templateUrl: 'partials/oneOtdelEdit.html',
          controller: 'oneOtdelEditCtrl',
          size: size,
          resolve: {
            item: function () {
              return p;
            }
          }
        });
        modalInstance.result.then(function(selectedObject) {
            if(selectedObject.save == "insert"){
                $scope.getOtdelsList();
            }else if(selectedObject.save == "update"){
            	p.dpt = selectedObject.dpt;
                p.id = selectedObject.id;
                p.otdelcode = selectedObject.otdelcode;
                p.otdelname = selectedObject.otdelname;
            }
        });
    };
}]);
app.controller('oneOtdelEditCtrl', ['$scope', '$modalInstance', 'item', '$http', 'sweet', function ($scope, $modalInstance, item, $http, sweet) {
  $scope.enableBtn = 1;
  $scope.record = angular.copy(item);
  $scope.myForm = {};
        $scope.cancel = function () {
            $modalInstance.dismiss('Close');
        };
        $scope.buttonText = (item.id > 0) ? 'Сохранить' : 'Добавить';
        var original = item;
        $scope.isClean = function() {
            return angular.equals(original, $scope.record);
        }
        $scope.saveRecord = function (record) {
            $scope.enableBtn = 0;
            record.id = $scope.record.id;
            var dataObject = {
                id : record.id
                ,dpt : record.dpt
                ,otdelcode : record.otdelcode
                ,otdelname :  record.otdelname
            };
            if(record.id > 0){
               var responsePromise = $http.post("ajax/updateRecordOtdel.php", dataObject, {});
               responsePromise.success(function(dataFromServer, status, headers, config) {
                  if (dataFromServer.message.substring(0,6) == 'Ошибка') {
                      sweet.show('Результат', dataFromServer.message, 'error');
                      $modalInstance.close(x);
                  } else {
                      sweet.show('Успех!', "Сохранено.", 'success');
                      var x = angular.copy(record);
                      x.save = 'update';
                      $modalInstance.close(x);
                  }
               });
               responsePromise.error(function(data, status, headers, config) {
                        alert("Отправка формы не удалась!");
               });
            } else {
               var responsePromise = $http.post("ajax/insertRecordOtdel.php", dataObject, {});
               responsePromise.success(function(dataFromServer, status, headers, config) {
                  if (dataFromServer.message.substring(0,6) == 'Ошибка') {
                      sweet.show('Результат', dataFromServer.message, 'error');
                      $modalInstance.close(x);
                  } else {
                        sweet.show('Успех!', "Сохранено.", 'success');
                        var x = angular.copy(record);
                        x.save = 'insert';
                        $modalInstance.close(x);
                  }
               });
               responsePromise.error(function(data, status, headers, config) {
                        alert("Отправка формы не удалась!");
               });
            }
        };
}]);
app.controller('locRankCtrl', ['$scope', '$routeParams', '$modal', '$http', 'sweet', function ($scope, $routeParams, $modal, $http, sweet) {
     $scope.dpt = $routeParams.dpt;
     $scope.getRanksList = function() {
        $http.post("ajax/getRanks.php",{"dpt" : $scope.dpt})
        .success(function(response){
            $scope.ranks = response;
    	})
    	.error(function(reason){
    		alert("Ошибка при попытке чтения данных!?");
    	});
     };
     $scope.getRanksList();
    $scope.deleteRank = function(c){
        sweet.show({
            title: 'Подтвердите',
            text: 'Удалить запись: '+c.name_post+'?',
            type: 'warning',
            showCancelButton: true,
            cancelButtonText: 'Отмена',
            confirmButtonColor: '#DD6B55',
            confirmButtonText: 'Да, удалить!',
            closeOnConfirm: false
        }, function() {
            $http.get('ajax/delOneRank.php?id='+c.id+'&dpt='+$scope.dpt)
            .success(function(response) {
                  if (response.message.substring(0,6) == 'Ошибка') {
                      sweet.show('Результат', response.message, 'error');
                  } else {
                      sweet.show('Удалено!', response.message, 'success');
                  }
                  $scope.getRanksList();
            })
        	.error(function(reason){
        		alert("Ошибка при попытке чтения данных!?");
   	        });
        });
    };
            $scope.blank = {
                id : '',
            	dpt : $scope.dpt
                ,rank : ''
                ,name_post : ''
            };
    $scope.openRank = function (p,size) {
    $scope.animationsEnabled = true;
        var modalInstance = $modal.open({
          animation: $scope.animationsEnabled,
          templateUrl: 'partials/oneRankEdit.html',
          controller: 'oneRankEditCtrl',
          size: size,
          resolve: {
            item: function () {
              return p;
            }
          }
        });
        modalInstance.result.then(function(selectedObject) {
            if(selectedObject.save == "insert"){
                $scope.getRanksList();
            }else if(selectedObject.save == "update"){
            	p.dpt = selectedObject.dpt;
                p.id = selectedObject.id;
                p.rank = selectedObject.rank;
                p.name_post = selectedObject.name_post;
            }
        });
    };
}]);
app.controller('oneRankEditCtrl', ['$scope', '$modalInstance', 'item', '$http', 'sweet', function ($scope, $modalInstance, item, $http, sweet) {
  $scope.enableBtn = 1;
  $scope.record = angular.copy(item);
  $scope.myForm = {};
        $scope.cancel = function () {
            $modalInstance.dismiss('Close');
        };
        $scope.buttonText = (item.id > 0) ? 'Сохранить' : 'Добавить';
        var original = item;
        $scope.isClean = function() {
            return angular.equals(original, $scope.record);
        }
        $scope.saveRecord = function (record) {
        	$scope.enableBtn = 0;
            record.id = $scope.record.id;
            var dataObject = {
                id : record.id
                ,dpt : record.dpt
                ,rank : record.rank
                ,name_post :  record.name_post
            };
            if(record.id > 0){
               var responsePromise = $http.post("ajax/updateRecordRank.php", dataObject, {});
               responsePromise.success(function(dataFromServer, status, headers, config) {
                  if (dataFromServer.message.substring(0,6) == 'Ошибка') {
                      sweet.show('Результат', dataFromServer.message, 'error');
                      $modalInstance.close(x);
                  } else {
                      sweet.show('Успех!', "Сохранено.", 'success');
                      var x = angular.copy(record);
                      x.save = 'update';
                      $modalInstance.close(x);
                  }
               });
               responsePromise.error(function(data, status, headers, config) {
                        alert("Отправка формы не удалась!");
               });
            } else {
               var responsePromise = $http.post("ajax/insertRecordRank.php", dataObject, {});
               responsePromise.success(function(dataFromServer, status, headers, config) {
                  if (dataFromServer.message.substring(0,6) == 'Ошибка') {
                      sweet.show('Результат', dataFromServer.message, 'error');
                      $modalInstance.close(x);
                  } else {
                        sweet.show('Успех!', "Сохранено.", 'success');
                        var x = angular.copy(record);
                        x.save = 'insert';
                        $modalInstance.close(x);
                  }
               });
               responsePromise.error(function(data, status, headers, config) {
                        alert("Отправка формы не удалась!");
               });
            }
        };
}]);
    app.controller("backupCtrl", ['$scope', '$http', '$rootScope', 'sweet', function($scope, $http, $rootScope, sweet) {
  	$scope.myForm = {};
  	$scope.id_user =567;
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
       $scope.send_ftp = false;
       $scope.enableBtn=1;
       $scope.myForm.submitTheForm = function(item, event) {
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
       .error(function(resp) {
            alert("Ошибка при отправке формы!");
       });
       }
  }]);
app.controller('phoneOfficeCtrl', ['$scope', '$http', '$filter', '$rootScope', 'sweet', function($scope, $http, $filter, $rootScope, sweet) {
    $rootScope.progress = 0;
    $scope.checkedRows = [];
    $scope.toggleCheck = function (id) {
        if ($scope.checkedRows.indexOf(id) === -1) {
            $scope.checkedRows.push(id);
        } else {
            $scope.checkedRows.splice($scope.checkedRows.indexOf(id), 1);
        }
    };
    $http.get('ajax/getAdrOffice.php')
        .success(function(response){
            $scope.dptadr = response;
            $scope.yourSelect = $scope.dptadr[0];
    	})
    	.error(function(reason){
    		alert("Ошибка при попытке чтения данных!?");
   	});
	$scope.getUpfrList = function() {
      $http.get('ajax/upfr_list.php')
        .success(function(response){
            $scope.rep = response;
    	})
    	.error(function(reason){
    		alert("Ошибка при попытке чтения данных!?");
   	    });
    }
    $scope.getUpfrList();
    $scope.setFilter = function(brief) {
      $scope.filterReport = brief;
    }
    $scope.setOfficecode = function(office) {
     var selRows=[];
     var dataObject = {
         officecode : office,
         rows : selRows
     }
     var j = 0;
     for (var i = 0; i < $scope.filteredRep.length; i++) {
     	if ($scope.checkedRows.indexOf($scope.filteredRep[i].id) != -1) {
            selRows[j] = $scope.filteredRep[i].id;
     	    j = j + 1;
     	}
     }
     if (j > 0) {
       $http.post("ajax/setOfficeUpfr.php", dataObject)
       .success(function(response) {
                if (response.message === undefined) {
                    sweet.show('Что-то не так...', 'Ошибка?', 'error');
                } else {
                    if (response.message.substring(0, 9) == 'Отклонено') {
                        sweet.show('Результат', response.message, 'error');
                    } else {
                        sweet.show('Успех!', response.message, 'success');
                    }
                }
          $scope.getUpfrList();
       })
       .error(function(response) {
          alert("Ошибка при отправке данных!");
       });
     }
    }
    $scope.view_office1 = function(office) {
     var dataObject = {
         id_office : office
     };
       $http.post("ajax/view_office1.php", dataObject)
       .success(function(response) {
       	   sweet.show('Адрес офиса', response.message);
       })
       .error(function(response) {
          alert("Ошибка при отправке данных!");
       });
     }
}]);