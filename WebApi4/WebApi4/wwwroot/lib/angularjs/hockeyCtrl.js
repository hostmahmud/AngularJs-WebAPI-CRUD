angular.module('hockey').controller('hockeyCtrl', ['$scope', '$http', '$log', '$location', 'myJson',
    function ($scope, $http, $log, $location, myJson) {

        // count
        myJson.allCount().then(function (count) {
            $scope.counts = count;
        });
        // tickets
        myJson.allTickets().then(function (ticket) {
            $scope.tickets = ticket;
            $scope.OnlyOpenTickets = function (prop, val) {
                return function (tick) {
                    return tick[prop] == val;
                }
            };
        });

        // ticket details
        myJson.tDetails().then(function (td) {
            $scope.tdetail = td;
            
        });


    }]);