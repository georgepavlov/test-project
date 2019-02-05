app.controller('authCtrl', ['$scope', '$rootScope', '$routeParams', '$location', '$http', 'Data', function ($scope, $rootScope, $routeParams, $location, $http, Data) {
    $scope.login = {};
    $scope.signup = {};
    $scope.doLogin = function (customer) {
        Data.post('login', {
            customer: customer
        }).then(function (results) {
            Data.toast(results);
            if (results.status == "success") {
            $rootScope.role = results.role;
             switch (results.role) {
               case '0':
                $location.path('reports');
                break;
               case '1':
                location.replace('org.php');
                break;
               case '2':
                location.replace("adm.php");
                break;
               default:
                $location.path('/');
                break;
              }
            }
        });
    };
    $scope.logout = function () {
        Data.get('logout').then(function (results) {
            Data.toast(results);
            $location.path('login');
        });
    }
}]);