var myApp = angular.module('myApp', []);

myApp.run(function ($rootScope) {

    $rootScope.prodsToAdd = [];
    $rootScope.prodToAdd = [{
        pCode: '',
        pCost: '',
        pName: '',
        pImage: '',
        pDisc: ''
    }];

    $rootScope.prodsToAdd = [];

    /*    $rootScope.prodsToAdd = [{
        pCost: '',
        pName: ''
    }];
*/

})


myApp.controller('MainCtrl', function($scope,$rootScope) {

    $scope.add = function(prodToAdd) {
        $scope.prodsToAdd.push(angular.copy(prodToAdd));
    }


    $scope.dispData= function() {
    var prodStr=document.getElementById('prods').value;
    var prodArr=[];
        prodArr=JSON.parse(prodStr);
       $scope.prodsToAdd=prodArr;
    }
});

