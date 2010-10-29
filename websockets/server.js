/*
 * The following code is intended to be run from nodejs.
 */
var sys = require("sys"),
	ws = require("./lib/ws");

var Pool = function() { 
	this.clients = [];
};
Pool.prototype = {
	add: function(websocket) {
		this.clients.push(websocket);
	},
	remove: function(websocket) {
		for (var i in this.clients) {
			if (this.clients[i] == websocket) {
				this.clients[i] = null;
				return;
			}
		}
	},
	writeToAll: function(msg) {
		for (var i in this.clients)
			this.clients[i].write(msg);
	}
};

var pool = new Pool();

ws.createServer(function (websocket) {
 websocket.addListener("connect", function (resource) { 
   sys.debug("client connected: " + websocket);
	pool.add(websocket);
 }).addListener("data", function (data) { 
   sys.debug('data receivre from ' + websocket + ':' + data);
	pool.writeToAll(data);
 }).addListener("close", function () { 
   sys.debug("client disconnected: " + websocket);
	pool.remove(websocket);
 });
}).listen(8080);

