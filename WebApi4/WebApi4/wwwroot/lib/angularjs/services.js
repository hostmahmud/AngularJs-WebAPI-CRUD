(function () {
	/* Services */

	angular.module('hockey')
		.factory('myJson', ['$http', function ($http) {
			var myJson = {};
			myJson.getCount = $http.get('/api/UserApi').then(function (count) {
				console.log(count.data);
				return count.data;
			});
			myJson.allCount = function () {
				return myJson.getCount;
			};

			//tickets
			myJson.getTickets = $http.get('/api/TicketApi').then(function (ticket) {
				console.log(ticket.data);
				return ticket.data;
			});
			myJson.allTickets = function () {
				return myJson.getTickets;
			};

			//ticket details
			myJson.getTicketDetails = $http.get('/api/TicketApi/').then(function (ticketDetails) {
				console.log(ticketDetails.data);
				return ticketDetails.data;
			});
			myJson.tDetails = function () {
				return myJson.getTicketDetails;
			};
			

			return myJson;
		}])

}());