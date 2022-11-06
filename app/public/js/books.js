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
            isbn: document.getElementById('isbn').value,
            title: document.getElementById('title').value,
            author: document.getElementById('author').value,
            publisher: document.getElementById('publisher').value,
            price: document.getElementById('price').value,
            discount: document.getElementById('discount').value
        }];

        var books = [];
        books = $scope.books;
        alert("Books to add");
//        alert(prods[0].pCode);

        $http.post('/addBook', books).success(function (books) {
            //alert(books);
            alert("Submitted Data");
        });
    }

    $scope.getData = function () {
        var bookIsbn=[];

        $scope.bookIsbn = [{
            isbn: document.getElementById('getisbn').value
             }];
        bookIsbn = $scope.bookIsbn;
        $http.post('/getBook', bookIsbn).success(function (gotProducts) {
          //  alert("Got Product Data");
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

            document.getElementById('isbn').value = p[0].isbn;
            document.getElementById('title').value = p[0].title;
            document.getElementById('author').value = p[0].author;
            document.getElementById('publisher').value = p[0].publisher;
            document.getElementById('price').value = p[0].price;
            document.getElementById('discount').value = p[0].discount;
       });    
    }

    $scope.updateData = function () {
        //alert('submit Data for update');

        $scope.books = [{
            isbn: document.getElementById('isbn').value,
            title: document.getElementById('title').value,
            author: document.getElementById('author').value,
            publisher: document.getElementById('publisher').value,
            price: document.getElementById('price').value,
            discount: document.getElementById('discount').value
        }];

        var books = [];
        books = $scope.books;
        alert("Books to update");
        //        alert(prods[0].pCode);

        $http.post('/updateBooks', books).success(function (prods) {
            //alert(prods);
            alert("Updated Data");
        });
    }

    

    $scope.deleteData = function () {
        var getpCode = [];

        $scope.productCode = [{
            isbn: document.getElementById('isbn').value
        }];
        getpCode = $scope.productCode;
        $http.post('/deleteBook', getpCode).success(function (gotProducts) {
            //alert(gotProducts);
            
            document.getElementById('isbn').value = "";
            document.getElementById('title').value = "";
            document.getElementById('author').value = "";
            document.getElementById('publisher').value = "";
            document.getElementById('price').value = "";
            document.getElementById('discount').value = "";
           
        });    
    }

});

