var https = require('https'),
    fs    = require('fs'),
    udp   = require('dgram').createSocket('udp4');

var ACCES_TOKEN = fs.readFileSync('./ACCESS_TOKEN').toString().trim();

var opts = {
	hostname: 'api.particle.io',
	port: 443,
	path: '/v1/devices/events',
	method: 'GET',
	headers: {
		'Authorization': 'Bearer '+ACCESS_TOKEN
	}
};

var req;

loop();

setInterval(loop, 60*60*1000);


function loop() {
	console.log('.');
	if(req!=undefined)
		req.end();

	req = https.request(opts, function(res) {
		var event = undefined;
		var data = undefined;
	
		res.on('data', function(d) {
			d = d.toString().trim();
		
			// Skip empty lines
			if(d.length==0)
				return;
			
			// Ignore "ok:"
			if(d==':ok')
				return;
			
			if(d.substring(0, 7) =='event: ')
				event = d.substr(7);
		
			if(d.substring(0, 6)=='data: ')
				data = d.substr(6);
		
			if(event!=undefined && data!=undefined) {
				if(event.substr(0,6)=='statsd') //{
					doStats(data);
			
				event = undefined;
				data = undefined;
			}
		});
	});

	req.end();
}


function doStats(data) {
	var msg, device_name;
	
	console.log(">>>", data);
	
	data = JSON.parse(data);

	if(data.data.indexOf(";")>0) {
		var semicolon_split = data.data.split(";");
		device_name = semicolon_split[0];
		data.data = semicolon_split[1];
	} else
		device_name = data.coreid;
	
	if(data.data.indexOf(",")<0) {
		doSend("particle."+device_name+"."+data.data);
	} else {
		var data_arr = data.data.split(",");
		
		for(var i=0; i<data_arr.length; i++)
			doSend("particle."+device_name+"."+data_arr[i]);
	}
}


function doSend(msg) {
	msg = new Buffer(msg);
	udp.send(msg, 0, msg.length, 8125, "127.0.0.1");
	console.log("<<<", msg.toString());
}
