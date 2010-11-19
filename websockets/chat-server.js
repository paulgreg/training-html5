/*
 * The following code is intended to run on nodejs (>=0.2.4).
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
		for (var i in this.clients) {
			if (this.clients[i] != null)
				this.clients[i].write(msg);
		}
	}
};

var pool = new Pool();

ws.createServer(function (websocket) {
 websocket.addListener("connect", function (resource) { 
   sys.debug("client connected: " + websocket.remoteAddress);
	pool.add(websocket);
 }).addListener("data", function (data) { 
   sys.debug('data received from ' + websocket.remoteAddress + ': ' + data);
	pool.writeToAll(data);
 }).addListener("close", function () { 
   sys.debug("client disconnected: " + websocket.remoteAddress);
	pool.remove(websocket);
 });
}).listen(8000);

