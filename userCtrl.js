app.controller('userCtrl', function ($scope, $modal, $filter, Data2, $http, $routeParams) {
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

});


app.controller('userEditCtrl', function ($scope, $modalInstance, item, Data2) {

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
            //alert("product.id="+product.id);
            if(user.uid > 0){
                Data2.put('users/'+user.uid, user).then(function (result) {
                    if(result.status != 'error'){
                        var x = angular.copy(user);
                        x.save = 'update';
                        $modalInstance.close(x);
                    }else{                    	alert("Ошибка update");
                        console.log(result);
                    }
                });
            }else{
                Data2.post('users', user).then(function (result) {
                //alert("result.data="+result.data);
                    if(result.status != 'error'){
                        var x = angular.copy(user);
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
});
