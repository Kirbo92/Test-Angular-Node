angular.module('quantion', []);  

function controlador($scope, $http) {  
    $scope.formData = {};

    $http.get('/api/clientes')
        .success(function(data) {
            $scope.clientes = data;
            console.log(data)
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });

    $scope.createClient = function(){
        $http.post('/api/clientes', $scope.formData)
            .success(function(data) {
                $scope.formData = {};
                $scope.clientes = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error:' + data);
            });
    };

    $scope.deleteClient = function(id) {
        $http.delete('/api/clientes/' + id)
            .success(function(data) {
                $scope.clientes = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error:' + data);
            });
    };
}