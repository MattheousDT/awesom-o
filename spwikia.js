var querystring = require('querystring');
var https = require('https');

var host = "southpark.wikia.com";
var api = "/api/v1"
var search = "/Search/List"
var page = "/Articles/AsSimpleJson"
var detail = "/Articles/Details"

function performRequest(endpoint, method, data, success) {
	var dataString = JSON.stringify(data);
	var headers = {};
  
	if (method == 'GET') {
		endpoint += '?' + querystring.stringify(data);
		
	} else {
		headers = {
			'Content-Type': 'application/json',
			'Content-Length': dataString.length
		
		};
	}
	
	var options = {
		host: host,
		path: endpoint,
		method: method,
		headers: headers
		
	};
	
	var req = https.request(options, function(res) {
		res.setEncoding('utf-8');
		
		var responseString = '';
		
		res.on('data', function(data) {
			responseString += data;
			
		});
		
		res.on('end', function() {
			//console.log(responseString);
			var responseObject = JSON.parse(responseString);
			success(responseObject);
			
		});
	});

	req.write(dataString);
	req.end();
}

module.exports = {
	getPageId: function(query, callback) {
		performRequest(api + search, "GET", {
			query: query,
			limit: 1,
			minArticleQuality: 10,
			batch: 1,
			namespaces: "0,14"
		
		}, function(data) {
			callback(data.items[0].id)
			
		});
	},
	
	getEpTitle: function(id, callback) {
		performRequest(api + page, "GET", {
			id: id,
		
		}, function(data) {
			callback(data.sections[0].title)
			
		});
	},

	getEpDesc: function(id, callback) {
		performRequest(api + page, "GET", {
			id: id,
		
		}, function(data) {
			callback(data.sections[1].content[0].text)
			
		});
	},
	
	getEpImage: function(id, callback) {
		performRequest(api + detail, "GET", {
			ids: id,
		
		}, function(data) {
			var id_str = id.toString();
			//console.log(id_str);
			callback(data.items[id_str].thumbnail);
			
		});
	}
}