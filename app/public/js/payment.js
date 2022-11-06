var myApp = angular.module('myApp', []);

myApp.run(function ($rootScope) {

    $rootScope.prodsSold = [{
        pCode: '',
        pCost: '',
        pName: '',
        pImage: '',
        pDisc: '',
        pQuantity: '',
        billNo:''
    }];
    $rootScope.totalAmount = 0;
    $rootScope.months = [];
    $rootScope.years = [];
})



myApp.controller('MainCtrl', function ($scope) {


    $scope.getData = function () {
        const prodArr = [];
        var prodStr = document.getElementById('text').value;
        // alert(prodStr);
        try {
            prodArr.push(JSON.parse(prodStr));
            console.log("check",prodArr)
        }
        catch (e) {
            alert(e.message);
            alert('hi')
        }

        $scope.prodsToAdd = prodArr;    
        $scope.prodsSold = prodArr;

        $scope.months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        var range = [];
        for (var i = 1970; i < 2050; i++) {
            range.push(i);
        }
        $scope.years = range;
    }


    $scope.makePayment = function () {
        
        var json = JSON.stringify($scope.prodsSold, function (key, value) {
            if (key === "$$hashKey") {
                return undefined;
            }
            return value;
        });

        document.getElementById('products').value = json;
        document.getElementById('totalAmount').value = $scope.totalAmount;
        
    }

});
