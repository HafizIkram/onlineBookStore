  var myApp = angular.module('myApp', []);

myApp.run(function ($rootScope) {

    $rootScope.prodsToAdd = [];


})


myApp.controller('MainCtrl', function($scope,$http) {

    
    $scope.imageName = "";

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

    $scope.showImage = function () {
              var name = document.getElementById('fileInput'); 
        $scope.imageName = name.files.item(0).name;
        document.getElementById('pImage').value = name.files.item(0).name;

//      alert('Selected file: ' + name.files.item(0).name);
  //    alert('Selected file: ' + name.files.item(0).size);
    //  alert('Selected file: ' + name.files.item(0).type);

    }

    $scope.submitData = function () {
        alert('submit Data');

        $scope.products = [{
            pCode: document.getElementById('pCode').value,
            pCost: document.getElementById('pCost').value,
            pName: document.getElementById('pName').value,
            pImage: document.getElementById('pImage').value,
            pDisc: document.getElementById('pDisc').value,
            pCategory: document.getElementById('pCategory').value
        }];
    /*
    alert($scope.products[0].pCode);
    alert($scope.products[0].pCost);
    alert($scope.products[0].pName);
  */

        var prods = [];
        prods = $scope.products;
        alert("Products to add");
//        alert(prods[0].pCode);

        $http.post('/addProduct', prods).success(function (prods) {
            alert(prods);
            alert("Submitted Data");
        });
    }

    $scope.getData = function () {
        var getpCode=[];

        $scope.productCode = [{
            pCode: document.getElementById('getpCode').value
             }];
        getpCode = $scope.productCode;
        $http.post('/getProduct', getpCode).success(function (gotProducts) {
            alert("Got Product Data");
            /*
                var p = [{
                pCode: String,
                pCost: Number,
                pName: String,
                pImage: String,
                pDisc: String

            }];
            */
            var p = [];
            //double parse the string for array
            p = JSON.parse(gotProducts);
            p = JSON.parse(p);

            document.getElementById('pCode').value = p[0].pCode;
            document.getElementById('pCost').value = p[0].pCost;
            document.getElementById('pName').value = p[0].pName;
            document.getElementById('pImage').value = p[0].pImage;
            document.getElementById('pDisc').value = p[0].pDisc;
            document.getElementById('pCategory').value = p[0].pCategory;
            $scope.imageName = p[0].pImage;
       });    
    }

    $scope.updateData = function () {
        alert('submit Data for update');

        $scope.products = [{
            pCode: document.getElementById('pCode').value,
            pCost: document.getElementById('pCost').value,
            pName: document.getElementById('pName').value,
            pImage: document.getElementById('pImage').value,
            pDisc: document.getElementById('pDisc').value,
            pCategory: document.getElementById('pCategory').value

        }];
        /*
        alert($scope.products[0].pCode);
        alert($scope.products[0].pCost);
        alert($scope.products[0].pName);
      */

        var prods = [];
        prods = $scope.products;
        alert("Products to update");
        //        alert(prods[0].pCode);

        $http.post('/updateProduct', prods).success(function (prods) {
            alert(prods);
            alert("Updated Data");
        });
    }

    

    $scope.deleteData = function () {
        var getpCode = [];

        $scope.productCode = [{
            pCode: document.getElementById('getpCode').value
        }];
        getpCode = $scope.productCode;
        $http.post('/deleteProduct', getpCode).success(function (gotProducts) {
            alert(gotProducts);
            
            document.getElementById('pCode').value = "";
            document.getElementById('pCost').value = "";
            document.getElementById('pName').value = "";
            document.getElementById('pImage').value = "";
            document.getElementById('pDisc').value = "";
            // document.getElementById('pCategory').value = p[0].pCategory;
            $scope.imageName = "";
        });    
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

