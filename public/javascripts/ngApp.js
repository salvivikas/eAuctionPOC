
var app = angular.module('myApp', ['smart-table']);

app.controller('loginController', ['$scope', '$http', '$window', function ($scope, $http, $window) {
    $scope.username = '';
    $scope.password = '';

    $scope.authenticate = function () {
        $http.post('/users/authenticate', { username: $scope.username, password: $scope.password }).then(function (response) {
            if (response.data.success) {
                $window.localStorage['userinfo'] = angular.toJson(response.data.userinfo);
                $window.location.href = '/catalog.html';
            }
            else {
                alert('Invalid username or password.');
                $scope.username = '';
                $scope.password = '';
            }
        },
            function (response) {
                alert('Invalid username or password.');
                $scope.username = '';
                $scope.password = '';
            });
    }
}]);

app.controller('catalogController', ['$scope', '$http', '$window', '$interval', 'socket', function ($scope, $http, $window, $interval, socket) {

    $scope.userinfo = {};
    $scope.catalogs = [];
    $scope.activeCatalogs = [];
    $scope.upcomingCatalogs = [];
    $scope.activeLotIndex = 0;
    $scope.sessionStarted = false;
    $scope.message = '';
    $scope.notification = '';
    $scope.showNotification = false;

    $scope.lotDuration = 0;
    var interval;

    getUserInfo = function () {
        var user = $window.localStorage['userinfo'];
        if (user) {
            $scope.userinfo = JSON.parse(user);
        }
        else {
            $window.location.href = '/login.html';
        }
    };

    loadCatalog = function () {
        $http.get('/catalog/getallcatalog').then(function (response) {
            $scope.catalogs = response.data;
        },
            function (response) {
                alert('error in fetching data.');
            });
    };

    getUserInfo();
    loadCatalog();

    $scope.placeBid = function (lot) {
        //alert(JSON.stringify(lotDetail));
        if (lot.bidqty <=lot.quantityoffered) {
            $http.post('/catalog/insertbid', { userid: $scope.userinfo.id, bidqty: lot.bidqty, catalogid: lot.catalogid }).then(
                function (response) {
                    // Update bid status
                    for (var i = 0; i < 50; i++) {
                        if (i == (lot.catalogid - 1)) {
                            $scope.catalogs[i].bidqty += lot.bidqty;
                            $scope.catalogs[i].bidstatus = 1; // Bid placed
                        }
                    }
                    $scope.showNotification = true;
                    $scope.notification = 'Bid placed successfully.';
                },
                function (response) {
                    alert('failure');
                }
            );
        }
        else{
            $scope.showNotification = true;
            $scope.notification = 'Invalid Bid Quantity.';
        }
    };

    socket.on('init', function (data) {
        //alert('socket connected ' + data);
    });

    socket.on('send:startsession', function (data) {
        $scope.lotDuration = 30;
        $scope.sessionStarted = true;
        $scope.message = 'Session Started';
        var i = 0;
        for (i = 0; i < 5; i++) {
            $scope.activeCatalogs.push(JSON.parse(JSON.stringify($scope.catalogs[i])));
        }
        for (; i < $scope.catalogs.length; i++) {
            $scope.upcomingCatalogs.push(JSON.parse(JSON.stringify($scope.catalogs[i])));
        }

        interval = $interval(function () {
            $scope.lotDuration--
        }, 1000);
    });

    socket.on('send:stopsession', function (data) {
        $interval.cancel(interval);
        $scope.activeCatalogs = [];
        $scope.upcomingCatalogs = [];
        $scope.sessionStarted = false;
        $scope.message = 'Session End';
    });

    socket.on('send:changelot', function (data) {
        $scope.lotDuration = 30;
        $scope.activeCatalogs = [];
        $scope.upcomingCatalogs = [];
        $scope.showNotification = false;
        $scope.notification = '';

        var activeLotCount = data.length > 5 ? 5 : data.length;
        var pendingLotCount = data.length - activeLotCount;

        var i = 0;
        for (i = 0; i < activeLotCount; i++) {
            $scope.activeCatalogs.push(data[i]);
        }
        for (; i < data.length; i++) {
            $scope.upcomingCatalogs.push(data[i]);
        }
    });



}]);

app.factory('socket', function ($rootScope) {
    var socket = io.connect();
    return {
        on: function (eventName, callback) {
            socket.on(eventName, function () {
                var args = arguments;
                $rootScope.$apply(function () {
                    callback.apply(socket, args);
                });
            });
        },
        emit: function (eventName, data, callback) {
            socket.emit(eventName, data, function () {
                var args = arguments;
                $rootScope.$apply(function () {
                    if (callback) {
                        callback.apply(socket, args);
                    }
                });
            })
        }
    };
});