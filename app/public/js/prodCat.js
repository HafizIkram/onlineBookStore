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
})


myApp.controller('MainCtrl', function($scope,$http) {

  
    $scope.cat = 0;

    $scope.prods = [{
        pCode: '',
        pCost: '',
        pName: '',
        pImage: '',
        pDisc: '',
        pCategory:''
    }];


    $scope.getDataWomen = function () {
//        $scope.prods = $scope.womenCat;
//        $scope.cat = 1;
        
        var getpCategory = [];

        $scope.productCategory = [{
            pCategory: "WomenApparels"
        }];
        getpCategory = $scope.productCategory;
        alert("Women Category");
        $http.post('/getProductCategory', getpCategory).success(function (gotProducts) {
            alert("Got Product Data");
            alert(gotProducts);
             
            var p = [];
            //double parse the string for array
          p = JSON.parse(gotProducts);
           alert(p);
           p = JSON.parse(p);
           alert(p);
            $scope.prods = p;
            $scope.cat = 1;
           
        });
    }



    $scope.getDataChildren = function () {
//        $scope.prods = $scope.childrenCat;
 //       $scope.cat = 2;
        var getpCategory = [];

        $scope.productCategory = [{
            pCategory: "ChildrenApparels"
        }];
        getpCategory = $scope.productCategory;
        alert("Children Category");
        $http.post('/getProductCategory', getpCategory).success(function (gotProducts) {
            alert("Got Product Data");
            alert(gotProducts);

            var p = [];
            //double parse the string for array
            p = JSON.parse(gotProducts);
            alert(p);
            p = JSON.parse(p);
            alert(p);
            $scope.prods = p;
            $scope.cat = 2;

        });
    }


    $scope.getDataMen = function () {
//        $scope.prods = $scope.menCat;
  //      $scope.cat = 3;
        var getpCategory = [];

        $scope.productCategory = [{
            pCategory: "MenApparels"
        }];
        getpCategory = $scope.productCategory;
        alert("Men Category");
        $http.post('/getProductCategory', getpCategory).success(function (gotProducts) {
            alert("Got Product Data");
            alert(gotProducts);

            var p = [];
            //double parse the string for array
            p = JSON.parse(gotProducts);
            alert(p);
            p = JSON.parse(p);
            alert(p);
            $scope.prods = p;
            $scope.cat = 3;

        });

    }

    $scope.getDataCosmetics = function () {
    //    $scope.prods = $scope.cosmeticsCat;
     //   $scope.cat = 4;
        var getpCategory = [];

        $scope.productCategory = [{
            pCategory: "Cosmetics"
        }];
        getpCategory = $scope.productCategory;
        alert("Children Category");
        $http.post('/getProductCategory', getpCategory).success(function (gotProducts) {
            alert("Got Product Data");
            alert(gotProducts);

            var p = [];
            //double parse the string for array
            p = JSON.parse(gotProducts);
            alert(p);
            p = JSON.parse(p);
            alert(p);
            $scope.prods = p;
            $scope.cat = 4;

        });
    }


    $scope.getDataBaggages = function () {
      //  $scope.prods = $scope.baggagesCat;
      //  $scope.cat = 5;
        var getpCategory = [];

        $scope.productCategory = [{
            pCategory: "Baggages"
        }];
        getpCategory = $scope.productCategory;
        alert("Children Category");
        $http.post('/getProductCategory', getpCategory).success(function (gotProducts) {
            alert("Got Product Data");
            alert(gotProducts);

            var p = [];
            //double parse the string for array
            p = JSON.parse(gotProducts);
            alert(p);
            p = JSON.parse(p);
            alert(p);
            $scope.prods = p;
            $scope.cat = 5;

        });

    }


    $scope.add = function (index) {
        //    alert(index);
        $scope.prodsToAdd.push(angular.copy($scope.prods[index]));

    }

/*
    $scope.add = function (index) {       
        switch ($scope.cat) {
            case 1:
                $scope.prodsToAdd.push(angular.copy($scope.womenCat[index]));
                
                break;
            case 2:

                $scope.prodsToAdd.push(angular.copy($scope.childrenCat[index]));

                break;
            case 3:
                $scope.prodsToAdd.push(angular.copy($scope.menCat[index]));
                break;
            case 4:
                $scope.prodsToAdd.push(angular.copy($scope.cosmeticsCat[index]));
                break;
            case 5:
                $scope.prodsToAdd.push(angular.copy($scope.baggagesCat[index]));
                break;

        }
     }
*/


    $scope.store = function () {

        var prodString = "something";
        prodString = JSON.stringify($scope.prodsToAdd);

        document.getElementById('products').value = prodString;
    }

        /*
        $scope.womenCat = [
            { pCode: 1001, pCost: 250, pName: 'Kurtis', pImage: 'women1.jpg', pDisc: 'Kurtis Classic Wear for all times' },
            { pCode: 1002, pCost: 350, pName: 'Jerkins', pImage: 'women2.jpg', pDisc: 'Levi Party wear' },
            { pCode: 1003, pCost: 550, pName: 'Sarwal', pImage: 'women3.jpg', pDisc: 'Sumangal classic wedding reception' },
            { pCode: 1004, pCost: 350, pName: 'Sweaters', pImage: 'women4.jpg', pDisc: 'Levi wear for outings' },
            { pCode: 1005, pCost: 250, pName: 'Jeans', pImage: 'women5.jpg', pDisc: 'Ladies foot wear for parties' }];

        $scope.childrenCat = [
            { pCode: 2001, pCost: 250, pName: 'Jeans', pImage: 'children1.jpg', pDisc: 'Children wear for any time' },
            { pCode: 2002, pCost: 350, pName: 'TShirts', pImage: 'children2.jpg', pDisc: 'girls collection for outings' },
            { pCode: 2003, pCost: 550, pName: 'Jeans', pImage: 'children3.jpg', pDisc: 'kids party wear collection' },
            { pCode: 2004, pCost: 350, pName: 'Winter', pImage: 'children4.jpg', pDisc: 'Winter wear for kids' },
            { pCode: 2005, pCost: 250, pName: 'Summer', pImage: 'children5.jpg', pDisc: 'Summer collection for kids' }];


        $scope.menCat = [
            { pCode: 3001, pCost: 250, pName: 'Jeans', pImage: 'men1.jpg', pDisc: 'Mens wear for any time' },
            { pCode: 3002, pCost: 350, pName: 'TShirts', pImage: 'men2.jpg', pDisc: 'Mens collection for outings' },
            { pCode: 3003, pCost: 550, pName: 'Jeans', pImage: 'men3.jpg', pDisc: 'Mens party wear collection' },
            { pCode: 3004, pCost: 350, pName: 'Winter', pImage: 'men4.jpg', pDisc: 'Mens wear for Men' },
            { pCode: 3005, pCost: 250, pName: 'Jerkins', pImage: 'men5.jpg', pDisc: 'Jerkins collection for Men' },
            { pCode: 3006, pCost: 250, pName: 'Sweaters', pImage: 'men6.jpg', pDisc: 'Summer collection for Men' },
            { pCode: 3007, pCost: 250, pName: 'Joggins', pImage: 'men7.jpg', pDisc: 'Jogging collection for Men' }];


        $scope.cosmeticsCat = [
            { pCode: 4001, pCost: 250, pName: 'Lipsticks', pImage: 'cosmetic1.jpg', pDisc: 'Lipstick for any time' },
            { pCode: 4002, pCost: 350, pName: 'Talcom', pImage: 'cosmetic2.jpg', pDisc: 'Talcom powder for outings' },
            { pCode: 4003, pCost: 550, pName: 'Facecream', pImage: 'cosmetic3.jpg', pDisc: 'Facecream for party collection' },
            { pCode: 4004, pCost: 350, pName: 'Haircolor', pImage: 'cosmetic4.jpg', pDisc: 'Haircolor for all ages' },
            { pCode: 4005, pCost: 250, pName: 'Kajol', pImage: 'cosmetic5.jpg', pDisc: 'Kajol for eye fashion' }];


        $scope.baggagesCat = [
            { pCode: 5001, pCost: 250, pName: 'Suitcase', pImage: 'baggages1.jpg', pDisc: 'Suitcase for any time' },
            { pCode: 5002, pCost: 350, pName: 'Breifcase', pImage: 'baggages2.jpg', pDisc: 'Breifcase collection for outings' },
            { pCode: 5003, pCost: 550, pName: 'Luggage', pImage: 'baggages3.jpg', pDisc: 'Luggage bags for all collection' },
            { pCode: 5004, pCost: 350, pName: 'Trolley', pImage: 'baggages4.jpg', pDisc: 'Trolley for travelling' },
            { pCode: 5005, pCost: 250, pName: 'Handbag', pImage: 'baggages5.jpg', pDisc: 'Handbag for personal belongings' }];


 
        var json = JSON.stringify($scope.prodsToAdd, function (key, value) {
            if (key === "$$hashKey") {
                return undefined;
            }
            return value;
        });
*/

});

