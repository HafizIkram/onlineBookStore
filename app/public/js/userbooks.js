var myApp = angular.module('myApp', []);

myApp.run(function ($rootScope) {

    
})


myApp.controller('MainCtrl', function ($scope, $http) {

    $scope.books = [];
    // $scope.cat = 0;
    /*
    $scope.books = [{
        isbn: '',
        name: '',
        author: '',
        publisher: '',
        price: ''
    }];
    */

    $scope.addBooks = [];

    $scope.store = function () {
        // alert('submit Data');

        var json = JSON.stringify($scope.addBooks, function (key, value) {
            if (key === "$$hashKey") {
                return undefined;
            }
            return value;
        });

        // alert(json);
        var books = [];
        books = JSON.parse(json);
        alert(books);
        $http.post('/billing', books).success(function (books) {
            //alert(books);
            alert("Order Placed");
        });
    }
    $scope.getDataBook = function () {
        alert("Get Book Details");
        $http.post('/getBookDetails').success(function (gotBooks) {
            var p = [];
            //double parse the string for array
            p = JSON.parse(gotBooks);
            p = JSON.parse(p);
            //alert(p);
            $scope.books = p;

        });
        // alert("Got Book Details");
        $http.post('/getBillNo').success(function (billArray) {
            x = parseInt(billArray[0].billno) || 1000;
            x = x + 1;
            document.getElementById('billno').value = x;
            
        });
        // alert("Got Bill No.");

    }

    $scope.add = function (bookcode) {
        document.getElementById('isbn').value = $scope.books[bookcode - 1].isbn;
        document.getElementById('title').value = $scope.books[bookcode - 1].title;
        document.getElementById('author').value = $scope.books[bookcode - 1].author;
        document.getElementById('price').value = $scope.books[bookcode - 1].price;
    }

    $scope.calculate = function () {

        quantity = parseInt(document.getElementById("quantity").value);
        discount = parseInt(document.getElementById("discount").value);
        price = parseInt(document.getElementById("price").value);

        document.getElementById("total").value = (quantity * price) - (quantity * discount);
    }



    $scope.addBook = function () {

        $scope.addBooks.push({
            'billno': document.getElementById('billno').value,
            'isbn': document.getElementById('isbn').value,
            'title': document.getElementById('title').value,
            'author': document.getElementById('author').value,
            'price': document.getElementById('price').value,
            'quantity': document.getElementById('quantity').value,
            'discount': document.getElementById('discount').value,
            'total': document.getElementById('total').value,
            'delname': document.getElementById('delname').value,
            'deladd': document.getElementById('deladd').value,
            'delphone': document.getElementById('delphone').value
        });

    }

    $scope.order = function () {
        alert('submit Data');

        var json = JSON.stringify($scope.addBooks, function (key, value) {
            if (key === "$$hashKey") {
                return undefined;
            }
            return value;
        });

        alert(json);
        var books = [];
        books = JSON.parse(json);
        alert(books);
        $http.post('/addBookOrder', books).success(function (books) {
            //alert(books);
            alert("Order Placed");
        });
    }


});

