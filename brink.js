function Brink_API() {
	
	this.api_baseurl = "http://api.joinbrink.com/v1/";
	this.user_id = 0;
	this.access_token = '';
	
	this.send = function(args, callback) {
		
		var request_type = 'GET';
		var data = '';
		var http_header = {};
		var url = args.url;
		if (args.hasOwnProperty('request_type')) request_type = args.request_type;
		if (args.hasOwnProperty('data')) data = JSON.stringify(args.data);
		if (args.hasOwnProperty('http_header')) http_header = args.http_header;
		var request = new XMLHttpRequest();

		request.onload = function(oEvent) {
			if (request.status == 200) {
				//console.log('Headers:', request.getAllResponseHeaders());
				//console.log('Body:', request.responseText);
				//console.log(request.responseText);
				if( typeof callback === 'function' ) callback(request.responseText);
			} else {
				//console.log("Error: " + request.status);
			}
		}

		/*request.onreadystatechange = function () {
			if (request.readyState == 4 && request.status == 200) {
				if( typeof callback === 'function' ) callback(request.responseText);
			}
		}*/
		
		request.open(request_type, url, true);
		for (var key in http_header) {
			request.setRequestHeader(key, http_header[key]);
		}
		
		request.send(data);

	}
	
	this.get_user = function(callback) {
		
		var args = {
			'url' : this.api_baseurl+"users/"+this.user_id,
			'http_header' : {
				"Content-Type" : "application/json",
				"Authorization" : "JWT "+this.access_token
			}
		};
		
		var response = this.send(args, function(result) {
			if( typeof callback === 'function' ) callback(result);
		});
		
	}
	
	this.create_user(data, callback) {
		
		// data (array) attributes:
		// first_name,
		// last_name,
		// email,
		// username,
		// password
		
		var args = {
			'url' : this.api_baseurl+"users",
			'custom_request' : 'PUT',
			'data' : data,
			'http_header' : {
				"Content-Type" : "application/json"
			}
		};
		
		var response = this.send(args, function(result) {
			if( typeof callback === 'function' ) callback(result);
		});
	}
	
};