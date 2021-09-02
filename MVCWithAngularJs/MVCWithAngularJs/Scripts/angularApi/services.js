(function () {
	/* Services */

	angular.module('MyApp')
		.factory('myJson', ['$http', function ($http) {
			var myJson = {};
			myJson.getCount = $http.get('http://localhost:3963/api/UserApi').then(function (count) {
				//console.log(count.data);
				return count.data;
			});
			myJson.allCount = function () {
				return myJson.getCount;
			};

			//tickets
			myJson.getTickets = $http.get('http://localhost:3963/api/TicketApi').then(function (ticket) {
				//console.log(ticket.data);
				return ticket.data;
			});
			myJson.allTickets = function () {
				return myJson.getTickets;
			};

			//ticket details
			myJson.getTicketDetails = $http.get('http://localhost:3963/api/TicketApi/').then(function (ticketDetails) {
				//console.log(ticketDetails.data);
				return ticketDetails.data;
			});
			myJson.tDetails = function () {
				return myJson.getTicketDetails;
			};

			//get ticket replies
			myJson.getTicketReplies = $http.get('http://localhost:3963/api/TicketReplies/').then(function (ticketReplies) {
				//console.log(ticketReplies.data);
				return ticketReplies.data;
			});
			myJson.tReplies = function () {
				return myJson.getTicketReplies;
			};

			//get users list
			myJson.getUsers = $http.get('http://localhost:3963/api/UserApi2').then(function (users) {
				//console.log(users.data);
				return users.data;
			});
			myJson.allUsers = function () {
				return myJson.getUsers;
			};


			return myJson;
		}])

}());