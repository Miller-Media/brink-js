Javascript Brink API Wrapper
----------------------------

.. code-block:: javascript
	
	var Brink_API = new Brink_API();
	
	// Login to the api to receive a jwt token that can be used in future requests without the need to reauthenticate
	
	var user_data = {
		"username" : "username",
		"password" : "password"
	};
	
	Brink_API.login(user_data, function(response) {
		console.log('returned: ',response);
		Brink_API.access_token = JSON.parse(response).jwt_token;
	});

	// After logging in using the Brink.login() method, the token is already set 
	// so additional requests can be handled correctly
	
	Brink_API.get_all_flights(function(response){
		console.log('returned: ',response);
	});
	
	var parameters = {"flight_id" : 12};
	Brink_API.get_flight(parameters, function(response) {
		console.log('returned: ',response);
	});
	
	parameters = {
		"flight_id" : 15, 
		"prop" : {
			"page" : 1, 
			"per_page" : 5
		}
	};
	Brink_API.get_flight_data(parameters, function(response){
		console.log('returned: ',response);
	});