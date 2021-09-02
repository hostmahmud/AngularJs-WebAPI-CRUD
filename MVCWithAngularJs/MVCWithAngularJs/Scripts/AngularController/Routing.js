angular.module('MyApp', ['ngRoute', 'ngResource']) //extending from previously created angularjs module in part1
    // here ['ngRoute'] is not required, I have just added to make you understand in a single place
    .config(function ($routeProvider, $locationProvider) {
        //here we will write code for implement routing 
        $routeProvider
            .when('/', { // This is for reditect to another route
                redirectTo: function () {
                    return '/home';
                }
            })
            .when('/home', {
                templateUrl: '/Template/Home.html',
                controller: 'HomeController'
            })
            .when('/tickets', {
                templateUrl: '/Template/Tickets.html',
                controller: 'TicketsController'
            })
            .when('/about', {
                templateUrl: '/Template/About.html',
                controller: 'AboutController'
            })
            .when('/team', {
                templateUrl: '/Template/Team.html',
                controller: 'TeamController'
            })
            .when('/ticketDetails/:id', {
                templateUrl: '/Template/ticketDetails.html',
                controller: 'ticketDetailsController'
            })
            .when('/teamDetails/:id', {
                templateUrl: '/Template/teamDetails.html',
                controller: 'teamDetailsController'
            })
            .otherwise({   // This is when any route not matched
                templateUrl: '/Template/Error.html',
                controller: 'ErrorController'
            })

        $locationProvider.html5Mode(false).hashPrefix('!'); // This is for Hashbang Mode
    })
    .controller('HomeController', ['$scope', '$http', '$log', '$location', 'myJson',
        function ($scope, $http, $log, $location, myJson) {

            $scope.Message = "This is HOME page mahmud";
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
                $scope.TicketById = function (prop, val) {
                    return function (tick) {
                        return tick[prop] == val;
                    }
                };

            });


        }])
    .controller('ticketDetailsController', ['$scope', '$routeParams', '$http', '$log', '$location', 'myJson', function ($scope, $routeParams, $http, $log, $location, myJson) {
        $scope.ticketReply = [];
        $scope.current = null;
        $scope.Message = "This is details page " + $routeParams.id;
        
        //get users assigned to
        myJson.allUsers().then(function (list) {
            $scope.UsersList = list;
            $scope.userById20 = function (prop20, val20) {
                return function (tick20) {
                    return tick20[prop20] == val20;
                }
            };
        });

        // ticket details tReplies
        myJson.tDetails().then(function (td) {
            $scope.tdetail = td;
            $scope.st = td.status;
            $scope.asu = td.assignedUser;
            $scope.tid = $routeParams.id;
            $scope.TicketById = function (prop, val) {
                return function (tick) {
                    return tick[prop] == val;
                }
            };

        });

        // get ticket replies
        myJson.tReplies().then(function (tr) {
            $scope.tReply = tr;
            $scope.tid2 = $routeParams.id;
            $scope.tReplyById = function (prop2, val2) {
                return function (tick2) {
                    return tick2[prop2] == val2;
                }
            };
        });

        //insert ticket reply
        $scope.replyTicket = function () {
            var newTicketReply = angular.copy($scope.t);
            $http.post("http://localhost:3963/api/TicketReplies/", newTicketReply).then(function (rData) {
                $scope.ticketReply.push(rData);
                $scope.current = null;
                window.location.reload();
                console.log("Data saved successfully");
            });
            $http.put("http://localhost:3963/api/TicketApi/" + $routeParams.id, newTicketReply).then(function (tData) {
                $scope.ticketReply.push(tData);
                $scope.current = null;
                console.log("Status updated successfully");
            });
        }
    }])
    .controller('CreateTicketController', ['$scope', '$routeParams', '$http', '$log', '$location', 'myJson', function ($scope, $routeParams, $http, $log, $location, myJson) {
        $scope.NewlyCreatedTicket = [];
        // get users list
        myJson.allUsers().then(function (list) {
            $scope.UsersList = list;
            $scope.userByType = function (prop3, val3) {
                return function (tick3) {
                    return tick3[prop3] == val3;
                }
            };
        });
        //create new ticket
        $scope.createNewTicket = function () {
            var newTicket = angular.copy($scope.tick);
            $http.post("http://localhost:3963/api/TicketApi/", newTicket).then(function (tData) {
                $scope.NewlyCreatedTicket.push(tData);
                $scope.tick = null;
                Swal.fire({ text: "Ticket created successfully", icon: "success", buttonsStyling: !1, confirmButtonText: "Ok, got it!", customClass: { confirmButton: "btn btn-primary" } }).then(function () {
                    window.location.reload();
                });
            });
        }

    }])
    .controller('TicketsController', ['$scope', '$routeParams', '$http', '$log', '$location', 'myJson', function ($scope, $routeParams, $http, $log, $location, myJson) {
        $scope.Message = "This is ticket page";

        // tickets list
        myJson.allTickets().then(function (allTicket) {
            $scope.tickets = allTicket;
        });
    }])
    .controller('AboutController', ['$scope', '$routeParams', '$http', '$log', '$location', 'myJson', function ($scope, $routeParams, $http, $log, $location, myJson) {
        $scope.Message = "This is ABOUT page";
    }])
    .controller('TeamController', function ($scope, $routeParams) {
        // $routeParams used for get query string value
        $scope.Message = "This is ORDER Page with query string id value " + $routeParams.id;
    })
    .controller('teamDetailsController', ['$scope', '$routeParams', '$http', '$log', '$location', 'myJson', function ($scope, $routeParams, $http, $log, $location, myJson) {
        $scope.UpdateNewTeamMember = [];
        // get users list
        myJson.allUsers().then(function (list) {
            $scope.UsersList = list;
            $scope.tid2 = $routeParams.id;
            $scope.userById = function (prop2, val2) {
                return function (tick2) {
                    return tick2[prop2] == val2;
                }
            };
        });

        //updata user
        $scope.updateUser = function () {
            var updateData = angular.copy($scope.u2);
            $http.put("http://localhost:3963/api/UserApi2/" + $routeParams.id, updateData)
                .then(function (res) {
                    $scope.u2 = null;
                    Swal.fire({ text: "User updated successfully", icon: "success", buttonsStyling: !1, confirmButtonText: "Ok, got it!", customClass: { confirmButton: "btn btn-primary" } }).then(function () {
                        window.location.reload();
                    });
                })
        }

        //delete user
        $scope.deleteTeam = function () {
            Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            }).then((result) => {
                if (result.isConfirmed) {
                    $http.delete('http://localhost:3963/api/UserApi2/' + $routeParams.id).success(function (data) {

                    }).error(function (data) {
                        $scope.error = "An error has occured while deleting team member! " + data;
                    });
                    Swal.fire(
                        'Deleted!',
                        'Your file has been deleted.',
                        'success'
                    );
                    window.location.replace("/Dashboard#!/team");
                }
            })


            $http.delete('http://localhost:3963/api/UserApi2/' + $routeParams.id).success(function (data) {

            }).error(function (data) {
                $scope.error = "An error has occured while deleting team member! " + data;
            });
        }

    }])
    .controller('ErrorController', function ($scope) {
        $scope.Message = "404 Not Found!";
    })

