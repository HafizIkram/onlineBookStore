  var myApp = angular.module('myApp', []);

myApp.run(function ($rootScope) {

    $rootScope.prodsToAdd = [];


})


myApp.controller('MainCtrl', function($scope,$http) {

    
    $scope.add = function(prodToAdd) {

        /*
                var index = $scope.prodsToAdd.indexOf(prodToAdd);
                $scope.prodsToAdd.splice(index, 1);
                $scope.prods.push(angular.copy(prodToAdd))

        */
        $scope.prodsToAdd.push(angular.copy(prodToAdd));
    }



    $scope.submitData = function () {
        alert('submit Data');

        $scope.books = [{
            issn: document.getElementById('issn').value,
            title: document.getElementById('title').value,
            editor: document.getElementById('editor').value,
            publisher: document.getElementById('publisher').value,
            price: document.getElementById('price').value,
            discount: document.getElementById('discount').value
        }];

        var books = [];
        books = $scope.books;
        alert("Magazines to add");
//        alert(prods[0].pCode);

        $http.post('/addMagazine', books).success(function (books) {
            //alert(books);
            alert("Submitted Data");
        });
    }

    $scope.getData = function () {
        var bookissn=[];

        $scope.bookissn = [{
            issn: document.getElementById('getissn').value
             }];
        bookissn = $scope.bookissn;
        $http.post('/getMagazines', bookissn).success(function (gotProducts) {
           // alert("Got Product Data");
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

            document.getElementById('issn').value = p[0].issn;
            document.getElementById('title').value = p[0].title;
            document.getElementById('editor').value = p[0].editor;
            document.getElementById('publisher').value = p[0].publisher;
            document.getElementById('price').value = p[0].price;
            document.getElementById('discount').value = p[0].discount;
       });    
    }

    $scope.updateData = function () {
       // alert('submit Data for update');

        $scope.books = [{
            issn: document.getElementById('issn').value,
            title: document.getElementById('title').value,
            editor: document.getElementById('editor').value,
            publisher: document.getElementById('publisher').value,
            price: document.getElementById('price').value,
            discount: document.getElementById('discount').value
        }];

        var books = [];
        books = $scope.books;
        alert("Magazines to update");
        //        alert(prods[0].pCode);

        $http.post('/updateMagazines', books).success(function (prods) {
         //   alert(prods);
            alert("Updated Data");
        });
    }

    

    $scope.deleteData = function () {
        var getpCode = [];

        $scope.productCode = [{
            issn: document.getElementById('issn').value
        }];
        getpCode = $scope.productCode;
        $http.post('/deleteMagazines', getpCode).success(function (gotProducts) {
        //    alert(gotProducts);
            
            document.getElementById('issn').value = "";
            document.getElementById('title').value = "";
            document.getElementById('editor').value = "";
            document.getElementById('publisher').value = "";
            document.getElementById('price').value = "";
            document.getElementById('discount').value = "";
           
        });    
    }

});

