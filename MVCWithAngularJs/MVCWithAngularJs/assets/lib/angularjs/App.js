angular.module("LibApp", [])
    .controller("ProjectNgCtrl", function ($scope, $interval, $timeout, $http) {
        $scope.projects = [];
        $scope.current = null;
        $scope.isEdit = false;
        $scope.em = "em data";
        //timer
        $scope.countDown = 5;
        $interval(function () {
            $scope.counter = $scope.countDown--;
        }, 1000, 0);

        $scope.getHead = function () {
            return $scope.isEdit ? "Update" : "Add New";
        }

        //for user,ticket count
        function userTicketCount() {
            $http.get("http://localhost:3963/api/UserApi")
                .then(function (response) {
                    $scope.users = response.data;
                    //console.log(response.data);
                })
        }
        userTicketCount();

        //for getting tickets
        function allTickets() {
            $http.get("http://localhost:3963/api/TicketApi")
                .then(function (response1) {
                    $scope.tickets = response1.data;
                    console.log($scope.tickets);
                })
        }
        allTickets();

        //do login
        $scope.doLogin = function () {
            var newLogin = angular.copy($scope.current);

            $http({
                url: 'http://localhost:3963/api/UserApi',
                method: 'GET',
                params: { "email": newLogin.email, "password": newLogin.password }
            }).then(function (response) {
                $scope.errVisible = null;
                $scope.user = response.data;
                //console.log(response.status);
                if (response.status == 200) {
                    $timeout(function () {
                        Swal.fire({ text: "You have successfully logged in!", icon: "success", buttonsStyling: !1, confirmButtonText: "Dashboard", customClass: { confirmButton: "btn btn-primary" } }).then((function (e) { window.location.replace("/Dashboard"), e.isConfirmed && (t.querySelector('[name="email"]').value = "", t.querySelector('[name="password"]').value = "") }))
                    }, 2000);
                } else if (response.status == 204) {
                    $timeout(function () {
                        $scope.errDivClass = "alert alert-dismissible bg-light-danger border border-danger border-dashed d-flex flex-column flex-sm-row w-100 p-5 mb-10";
                        $scope.errMsg = "Invalid Username or Password";
                        $scope.errIconClass = "bi bi-x fs-1 text-danger";
                    }, 2000);
                }
                
            })
        }

        //for registration
        $scope.insert = function () {
            var newProj = angular.copy($scope.current);

            $http.post("http://localhost:3963/api/UserApi", newProj).then(function (data) {
                $scope.projects.push(data);
                $scope.current = null;
                $timeout(function () {
                    window.location.href = "/Home/RegisterSuccess";
                }, 2500);

            });
        }

        //// isEdit
        //$scope.edit = function (bk) {
        //    $scope.current = bk;
        //    $scope.isEdit = true;
        //}
        ////updata
        //$scope.update = function () {
        //    var newBook = angular.copy($scope.current);
        //    $http.put("/api/Books/" + newBook.bookId, newBook)
        //        .then(function (res) {
        //            console.log(res.data);
        //            $scope.isEdit = false;
        //            $scope.current = null;
        //        })
        //}
        ////delete
        //$scope.delete = function (bk) {
        //    if (confirm("Are you sure to delete?")) {
        //        $http.delete("/api/Books/" + bk.bookId)
        //            .then(function () {
        //                $scope.books.splice($scope.indexOf(bk), 1);
        //                showFn();
        //            })
        //    }
        //}
    })