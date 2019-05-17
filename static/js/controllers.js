
var ConsoleModule = angular.module('ConsoleModule', ['ngRoute']);

var url1={lat:0, lng:0};
var map;
var m1;
var m2;
var m3;
var m4;
var m5;
var m6;
var m7;
var m8;

ConsoleModule.config(['$routeProvider', '$locationProvider','$sceDelegateProvider', '$httpProvider',
    function ($routeProvider, $locationProvider, $sceDelegateProvider, $httpProvider) {
    $routeProvider.when('/', {
        templateUrl: '/partials/Byzip.html',
        controller: 'wcontroller',
        controllerAs: 'wcontroller'
    });
}]);

ConsoleModule.controller('wcontroller', ['$scope', '$http', '$routeParams', '$timeout', '$sce',
    function($scope, $http, $routeParams, $timeout, $sce) {

    $scope.somemessage = "Some weather";
    $scope.zip1City = "";
    $scope.zip1Weather = "";

    $scope.zip = function(which) {

        var data = "";
        if(which === 1) {
            data = $scope.zip1m;
        } else if(which === 2) {
            data = $scope.zip2m;
        } else if(which === 3) {
            data = $scope.zip3m;
        } else if(which === 4) {
            data = $scope.zip4m;
        } 

        if(data.length > 0) {
            $http({
                method: "GET",
                url: '/api/v1/getWeather?zip=' + data
            }).then( function(response) {
                if(which === 1) {
                   // $scope.zip1City = response.data.city;
                    $scope.zip1Weather = response.data.weather;
                    url1= new google.maps.LatLng(response.data.lat, response.data.lon);
                    m1.setPosition(url1);
                    $http({method:"Get",
                    url:'/api/v1/updateData?id=2&name=' + data});
                    
                } else if(which === 2) {
                    //$scope.zip2City = response.data.city;
                    $scope.zip2Weather = response.data.weather;
                    url1= new google.maps.LatLng(response.data.lat, response.data.lon);
                     m2.setPosition(url1);
                     @http({method:"Get",
                     url:'/api/v1/updateData?id=2&name' + data});
                     
                } else if(which === 3) {
                    //$scope.zip3City = response.data.city;
                    $scope.zip3Weather = response.data.weather;
                     url1= new google.maps.LatLng(response.data.lat, response.data.lon);
                    m3.setPosition(url1);
                    $http({method:"Get",
                    url:'/api/v1/updateData?id=2&name=' + data});
                    
                } else if(which === 4) {
                    //$scope.zip4City = response.data.city;
                    $scope.zip4Weather = response.data.weather;
                     url1= new google.maps.LatLng(response.data.lat, response.data.lon);
                    m4.setPosition(url1);
                    $http({method:"Get",
                    url:'/api/v1/updateData?id=2&name=' + data});
                } 
            });
        } else {
            if(which === 1) {
                    //$scope.zip1City = "";
                    $scope.zip1Weather = "";
                } else if(which === 2) {
                    //$scope.zip2City = "";
                    $scope.zip2Weather = "";
                } else if(which === 3) {
                    //$scope.zip3City = "";
                    $scope.zip3Weather = "";
                } else if(which === 4) {
                    //$scope.zip4City = "";
                    $scope.zip4Weather = "";
                } 
        }
    };
    
    $scope.dosearch=function(which,data){
    	$http({
    		method:"Get",
    		url:'/api/v1/getWeather?zip'+data}).then(function(response){
    			if(which===1){
    				$scope.zip1City=response.data.city;
    				$scope.zip1Weather=response.data.weather;
    				url1=new google.maps.LatLng(response.data.lat, response.data.lon);
    				m1.setPosition(url1);
    			}
    			else if(which===2){
    				$scope.zip2City=response.data.city;
    				$scope.zip2Weather=response.data.weather;
    				url1=new google.maps.LatLng(response.data.lat, response.data.lon);
    				m2.setPosition(url1);
    			}
    			else if(which===3){
    				$scope.zip3City=response.data.city;
    				$scope.zip3Weather=response.data.weather;
    				url1=new google.maps.LatLng(response.data.lat, response.data.lon);
    				m3.setPosition(url1);
    			}
    			else if(which===4){
    				$scope.zip4City=response.data.city;
    				$scope.zip4Weather=response.data.weather;
    				url1=new google.maps.LatLng(response.data.lat, response.data.lon);
    				m4.setPosition(url1);
    			}
    		})
    	
    }
    
}]);