app.controller('puzzlesCtrl',['$scope', '$rootScope', '$http', '$modal', '$filter', 'Data1', '$routeParams', 'sweet', function ($scope, $rootScope, $http, $modal, $filter, Data1, $routeParams, sweet) {    $http.get('ajax/getSession.php')
        .success(function(response){
            $scope.role = response.role;
    	})
    	.error(function(reason){
    		alert("Ошибка при попытке чтения данных!?");
    	});
    $scope.puzzle = {};
    $scope.rep_id = $routeParams.rep_id;
    $rootScope.id_rep = $routeParams.rep_id;
    $scope.progress = 0;
    if ($scope.rep_id > 0) {
        $http.post("ajax/getNameReport.php",{"id_rep" : $scope.rep_id})
        .success(function(response){
            $scope.report = response;
    	})
    	.error(function(reason){
    		alert("Ошибка при попытке чтения данных!?");
    	});
    }
        $http.post("ajax/getPuzzles.php",{"id_rep" : $scope.rep_id})
        .success(function(response){
            $scope.puzzles = response;
    	})
    	.error(function(reason){
    		alert("Ошибка при попытке чтения данных!?");
    	});
    $scope.changePuzzleStatus = function(puzzle){
      if (puzzle.status != "ЗВРШ") {
        puzzle.status = (puzzle.status=="ВВОД" ? "ПРОЦ" : "ВВОД");
        Data1.put("puzzles/"+puzzle.id,{status:puzzle.status});
      }
    };
    $scope.deletePuzzle = function(puzzle){
        if(confirm("Удалить запись ?")){
            Data1.delete("puzzles/"+puzzle.id).then(function(result){
                $scope.puzzles = _.without($scope.puzzles, _.findWhere($scope.puzzles, {id:puzzle.id}));
            });
        }
    };
    $scope.addRow = function(id_rep) {
        $scope.progress = 1;
        $http.post("ajax/addRow.php",{"id_rep" : id_rep})
        .success(function(response){
            if (response.message == undefined) {
            	sweet.show('Что-то не так...', 'Сообщите администратору.', 'error');
            } else {
            if (response.message.substring(0,6) == 'Ошибка') {
              sweet.show('Результат', response.message, 'error');
              $scope.progress = 0;
            } else {
                 $scope.setPuzzles();
              }
        	}
    	})
    	.error(function(reason){
    		alert("Ошибка при отправке запроса!?");
    	});
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
  $scope.setPuzzles = function() {                 $http.post("ajax/getNameReport.php",{"id_rep" : $scope.rep_id})
                 .success(function(response){
                      $scope.report = response;
    	         })
    	         .error(function(reason){
    		          alert("Ошибка при попытке чтения данных!?");
    	         });
                 $http.post("ajax/getPuzzles.php",{"id_rep" : $scope.rep_id})
                 .success(function(response){
                 $scope.puzzles = response;
    	         })
    	         .error(function(reason){
    		          alert("Ошибка при попытке чтения данных!?");
    	         });
                 $scope.progress = 0;  };
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
                    }else{                    	alert("Ошибка update");
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
app.controller('ModalDelCtrl', ['$scope',  '$rootScope', '$http', '$modal', '$log', 'sweet', function ($scope,  $rootScope, $http, $modal, $log, sweet) {
  $scope.animationsEnabled = true;
  $scope.open_delRow = function (size) {
    var modalInstance = $modal.open({
      animation: $scope.animationsEnabled,
      templateUrl: 'myModalContent.html',
      backdrop: 'static',
      controller: 'ModalInstCtrl',
      size: size,
      resolve: {
        items: function () {
          return $scope.items;
        }
      }
    });
    modalInstance.result.then(function (selectedItem) {
      $scope.selected = selectedItem;
        $http.post("ajax/delRow.php",{"id_rep" : $rootScope.id_rep, "delrow" : $scope.selected.substring(4,7)})
        .success(function(response){
           if (response.message == undefined) {
            	sweet.show('Что-то не так...', 'Сообщите администратору.', 'error');
            } else {
            if (response.message.substring(0,6) == 'Ошибка') {
              sweet.show('Результат', response.message, 'error');
              $scope.progress = 0;
            } else {
                 $scope.setPuzzles();
              }
        	}
    	})
    	.error(function(reason){
    		alert("Ошибка при отправке запроса!?");
    	});
    }, function () {
    });
  };
}]);
app.controller('ModalInstCtrl',['$http', '$scope', '$rootScope', '$modalInstance', 'items', function ($http, $scope, $rootScope, $modalInstance, items) {        $http.post("ajax/showRows.php",{"id_rep" : $rootScope.id_rep})
        .success(function(response){
            $scope.items = response;
            $scope.selected = {
                  item: $scope.items[0].delrow
            };
            $scope.progress = 0;
    	})
    	.error(function(reason){
    		alert("Ошибка при отправке запроса!?");
    	});
  $scope.ok = function () {
    $modalInstance.close($scope.selected.item);
  };
  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
}]);