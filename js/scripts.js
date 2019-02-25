var app = angular
            .module("myModule", ["ui.router", "ngCookies", "ngStorage"])
            .config(function($stateProvider, $urlMatcherFactoryProvider, $urlRouterProvider, $locationProvider){
                // for case insensitive
                $urlMatcherFactoryProvider.caseInsensitive(true);

                // for default rout
                $urlRouterProvider.otherwise("/home");

                //Routes
                $stateProvider
                    .state("home",{
                        url: "/home",
                        templateUrl: "templates/home.html",
                        controller: "homeController",
                        data: {
                            customData1: "Home Custom data 1",
                            customData2: "Home Custom data 2"
                        }
                    })
                    .state("usersParent",{
                        url: "/users",
                        templateUrl: "templates/usersParent.html",
                        controller: "usersParentController",
                        abstract: true
                    })
                    .state("usersParent.users",{
                        url: "/",
                        templateUrl: "templates/users.html",
                        controller: "usersController",
                        data: {
                            customData1: "Users Custom data 1",
                            customData2: "Users Custom data 2"
                        }
                    })
                    .state("usersParent.userDetail",{
                        url: "/:id",
                        templateUrl: "templates/user.html",
                        controller: "userDetailController"
                    })
                    .state("weatherData",{
                        url: "/weather-data",
                        templateUrl: "templates/weather-data.html",
                        controller: "weatherDataController"
                    })
                    .state("watchMethod",{
                        url: "/watch-method",
                        templateUrl: "templates/watch-method.html",
                        controller: "watchController"
                    })
                    .state("cookie",{
                        url: "/cookie",
                        templateUrl: "templates/cookies.html",
                        controller: "CookieController"
                    })
                    .state("forms",{
                        url: "/forms",
                        templateUrl: "templates/forms.html",
                        controller: "formsController"
                    })
                    .state("shopping-list", {
                        url: "/shopping-list",
                        templateUrl: "templates/shopping-list.html",
                        controller: "shoppingListController"
                    })
                    .state("localstorage",{
                        url: "/localstorage",
                        templateUrl: "templates/localstorage.html",
                        controller: "localstorageController"
                    })
                    .state("abbreviations",{
                        url: "/abbreviations",
                        templateUrl: "templates/abbreviations.html",
                        controller: "abbreviationsController"
                    })
                    .state("currency-converter",{
                        url: "/currency-converter",
                        templateUrl: "templates/currency-converter.html",
                        controller: "currencyConverterController"
                    });
                    //$locationProvider.html5Mode(true);

            })
            .controller("homeController", function($scope, $state){
                $scope.homeCustomdata1 = $state.current.data.customData1;
                $scope.homeCustomdata2 = $state.current.data.customData2;

                $scope.usersCustomdata1 = $state.get("usersParent.users").data.customData1;
                $scope.usersCustomdata2 = $state.get("usersParent.users").data.customData2;
            })
            .controller("usersParentController", function($scope){
                $scope.msg = "Message from controller";
            })
            .controller("usersController", function($scope, $http){
                
                $scope.Loader = false;

                var successCallBack = function(response){
                    $scope.users = response.data;
                    $scope.Loader = true;                    
                };

                var errorCallBack = function(response){
                    $scope.users = response.data;
                };
                
                $http({
                    method: "GET",
                    url: "http://jsonplaceholder.typicode.com/users"
                }).then(successCallBack, errorCallBack);
            })
            .controller("userDetailController", function($scope, $http, $stateParams){
    
                var successCallBack = function(response){
                    $scope.user = response.data;
                };

                var errorCallBack = function(response){
                    $scope.user = response.data;
                };
                
                $http({
                    method: "GET",
                    url: "http://jsonplaceholder.typicode.com/users/"+$stateParams.id
                }).then(successCallBack, errorCallBack);
            })
            .controller("weatherDataController", function($scope, $http){
                
                // Hide Details Container
                $scope.showHideDetails = true;
                $scope.Loader = true;
                $scope.errorBlock = true;
                
                var successCallBack = function(response){
                    $scope.weatherdata = response.data;
                    console.log($scope.weatherdata);

                    //Show Details Container
                    $scope.showHideDetails = false;
                    $scope.Loader = true;
                    $scope.errorBlock = true;
                };

                var errorCallBack = function(response){
                    $scope.weatherdata = response.data;
                    
                    if(response.status == 502 || response.status == 404){
                        $scope.errorBlock = false;
                    }
                    
                    //Show Details Container
                    $scope.showHideDetails = true;
                    $scope.Loader = true;
                };

                $scope.getWeatherdata = function(searchCity){
                    $scope.Loader = false;
                    $http({
                        method: "GET",
                        url: "http://api.openweathermap.org/data/2.5/weather?q="+$scope.searchCity+"&APPID=aa3fed2e31eb47b3e5aa709162b6360e"
                    }).then(successCallBack, errorCallBack);
                }

            })
            .controller("watchController", function($scope){
                $scope.counter = -1;
                $scope.$watch('watchText', function(){
                    $scope.counter++;
                });
            })
            .controller("CookieController", function($scope, $cookies){
                $scope.saveCookies = function(val){
                    $cookies.put("cookies",val);
                }

                $scope.getCookies = $cookies.get("cookies");
            })
            .controller("formsController", function($scope){
                $scope.submitForm = function(){
                    $scope.formData = [
                        {
                            name: $scope.user.name,
                            email: $scope.user.email,
                            password: $scope.user.password,
                        }];
                        console.log($scope.formData);
                }
            })
            .controller("shoppingListController", function($scope){
                $scope.items = ["Mobile", "Laptop", "Pendrive", "HardDisk Drive"];
                $scope.addItem = function(){
                    // for(var i=0; i< $scope.items.length;i++){
                    //     // alert($scope.items[i]);
                    //     console.log($scope.items[i]);
                    //         console.log($scope.newItem);
                    //     if($scope.items[i] == $scope.newItem){
                    //         console.log("Not Same");
                    //     }else{
                    //         console.log("Same");                           
                    //        //$scope.items.push($scope.newItem); 
                    //     }
                    // }
                    
                    $scope.items.push($scope.newItem);
                    $scope.newItem="";
                }

                $scope.removeItem = function(item){
                    $scope.items.splice(item, 1);
                }
            })
            .controller("localstorageController", function($scope, $localStorage){
                
                $scope.setData = function(){
                    var employees = [
                        {
                            name: "Akash Bijwe",
                            city: "Mumbai"
                        },
                        {
                            name: "Sagar Bijwe",
                            city: "Pune"
                        }
                    ];
                    $localStorage.employees = employees;
                }

                $scope.getData = function(){
                    $scope.employees = $localStorage.employees;
                }
            })
            .controller("abbreviationsController", function($scope, $http){

                    // Hide Details Container
                $scope.showHideDetails = true;
                $scope.Loader = true;

                var successCallBack = function(response){
                    $scope.results = response.data;
                    
                    //Show Details Container
                    $scope.showHideDetails = false;
                    $scope.Loader = true;
                };

                var errorCallBack = function(response){
                    $scope.results = response.data;
                    
                    //Show Details Container
                    $scope.showHideDetails = false;
                    $scope.Loader = true;
                };

                $scope.hideResults = function(){
                    $scope.showHideDetails =true;
                }

                $scope.getAbbreaviation = function(abbreaviationSearch){

                     // Hide Details Container
                    $scope.showHideDetails =false;
                    $scope.Loader = false;

                     $http({
                        method: "GET",
                        url: "https://daxeel-abbreviations-v1.p.mashape.com/all/"+$scope.abbreaviationSearch,
                        headers:{
                            "X-Mashape-Key": "1ESHnyfRhqmsh3CAl78uOJH1V8zUp1xVDMPjsnVe0XdMjsIRH2"
                        }
                    }).then(successCallBack, errorCallBack);

                }

            })
            .controller("currencyConverterController", function($scope, $http){
                
                var successCallBack = function(response){
                    $scope.currencies = response.data; 
                };
                var errorCallBack = function(response){
                    $scope.currencies = response.data; 
                };
                
                $http({
                    method: "GET",
                    url: "http://currencyconverter.kund.nu/api/availablecurrencies/?"
                }).then(successCallBack, errorCallBack);

                 var successCallBack2 = function(response){
                    $scope.output = response.data; 
                    console.log($scope.output);
                };
                var errorCallBack2 = function(response){
                    $scope.output = response.data; 
                };

                $scope.convertCurrency = function(){
                   $http({
                       method: "GET",
                       url: "https://currencyconverter.p.mashape.com/?from="+$scope.selectedCurrencyFrom.id+"&from_amount="+$scope.number+"&to="+$scope.selectedCurrencyTo.id,
                        headers:{
                            "X-Mashape-Key": "1ESHnyfRhqmsh3CAl78uOJH1V8zUp1xVDMPjsnVe0XdMjsIRH2"
                        }
                   }).then(successCallBack2, errorCallBack2);
                }
            });