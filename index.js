var apiUrl = "http://api.draugiem.lv/json/";

function DraugiemAPI(appId, appKey, session) {
	this.appId = appId;
	this.appKey = appKey;
	this.apiKey = '';
	
	if (typeof session === 'Object') {
		if (typeof session.apikey !== 'undefined') {
			this.apiKey = session.apikey;
		}
	}
}

DraugiemAPI.prototype.setApiKey = function(apiKey) {
	this.apiKey = apiKey;
};

DraugiemAPI.prototype.getSession = function(callback) {
	this.apiCall("authorize", {code: session.dr_auth_code}, function(err, result) {
		callback(err, result);
	});
};

DraugiemAPI.prototype.apiCall = function(action, params, callback) {
	var needle = require('needle');

	params.app = this.appKey;
	params.action = action;
	
	if (this.apiKey !== '') {
		params.apikey = this.apiKey;
	}
	
	console.log(params);
	
	needle.post(apiUrl, params, function(err, resp) {
		if (typeof err === 'undefined') err = null;
		callback(err, resp);
	});
};

exports.createClient = function(appId, appKey, session) {
	var api = new DraugiemAPI(appId, appKey, session);
	return api;
};

