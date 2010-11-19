window.addEventListener("load", function(e) { 
	document.getElementById('networkStatus').innerHTML = 'navigator.onLine=' + navigator.onLine;

	window.applicationCache.update(); // Try to update cache
	if (window.applicationCache.status = window.UPDATEREADY)
		window.applicationCache.swapCache(); // Swap cache !

}, false);


window.addEventListener("online", function(e) { 
	document.getElementById('networkStatus').innerHTML = 'online';
}, false);

window.addEventListener("offline", function(e) { 
	document.getElementById('networkStatus').innerHTML = 'offline';
}, false);

