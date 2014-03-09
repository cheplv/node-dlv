var apiUrl = "http://api.draugiem.lv/json/";

function DraugiemAPI(appId, appKey) {
	this.appId = appId;
	this.appKey = appKey;
	this.apiKey = '';
}

DraugiemAPI.prototype.setApiKey = function(apiKey) {
	this.apiKey = apiKey;
};

DraugiemAPI.prototype.getSession = function(session, callback) {
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
	return new DraugiemAPI(appId, appKey);
};

