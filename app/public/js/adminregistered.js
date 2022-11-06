var myApp = angular.module('myApp', []);

myApp.run(function ($rootScope) {

//    $rootScope.firstname;


})


myApp.controller('MainCtrl', function($scope,$rootScope) {

//    $scope.prods = [];

/*
    $scope.prodsToAdd = [{
        pCost: '',
        pName: ''
    }];

*/

    $scope.add = function(prodToAdd) {

        /*
                var index = $scope.prodsToAdd.indexOf(prodToAdd);
                $scope.prodsToAdd.splice(index, 1);
                $scope.prods.push(angular.copy(prodToAdd))

        */
        $scope.prodsToAdd.push(angular.copy(prodToAdd));
    }

    $scope.store = function() {
        var prodString="something";
        prodString=JSON.stringify($scope.prodsToAdd);

        document.getElementById('prods').value=prodString;
        //alert("Proceed to billing");

    }


    /*
        $scope.storeValues = function(){
            var prodString=JSON.stringify(prodsToAdd);
    console.log("Products String" + prodString) ;

            document.getElementById('prods').setAttribute('value',prodString);
            alert("got it");
            document.getElementById('prods').value="Nothing";
        }
    */
    /*
    $scope.addNew = function() {

        $scope.prodsToAdd.push({
            pCost: '',
            pName: ''
        })

    }
  */

});

