"use strict";
const spawn = require('child_process').spawn;
const exec 		= require("child_process").exec;
const execSync 		= require("child_process").execSync;
const fs 		= require('fs');
const express  	= require("express");
const bodyParser= require('body-parser');
const request 	= require('request');
const os = require('os');
const ifaces = os.networkInterfaces();

const app = express();
const server  = require("http").createServer(app);

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies


app.use(express.static(__dirname + '/sos'));

app.get("/sos", function(req, res){
	console.log("...Ajax")
	testPingPS(res,opisz)
});


	let getOSinfo = function(){
		let ret={}
		Object.keys(ifaces).forEach(function (ifname) {
			var alias = 0;
			ifaces[ifname].forEach(function (iface) {
				if ('IPv4' !== iface.family || iface.internal !== false) {return;}
				if (alias >= 1) {ret.net=ifname; ret.ip=iface.address;} 
				else {ret.net=ifname; ret.ip=iface.address;}
				++alias;
			});
		});
		return ret;
	}
	
function testPingPS(res,callback){
		let resout = {}
		resout.config={};
			let configTVjson = fs.readFileSync('C:/nodejs/app/config.tv.json', "utf8");
			if (configTVjson) {
				let co= JSON.parse(configTVjson);	
				if (co.port)	resout.port 	= co.port;
				if (co.budynek)	resout.budynek 	= co.budynek;
				if (co.plan)	resout.plan 	= co.plan;
			}
			//console.log('###...=',configTV)	
			
		let osinfo = getOSinfo();
		
		if (osinfo.net) resout.net = osinfo.net;
		if (osinfo.ip) resout.ip = osinfo.ip;		
		resout.time = (new Date()).getTime();
		
		let commarr = execSync("WMIC PROCESS where name='node.exe' get CommandLine").toString().trim().split("\n");
		resout.command = [];
		commarr.forEach(function(item){
			item = item.trim();
			if (item != 'CommandLine') {resout.command.push(item.split("/").pop().split(' ').pop());}
		});
		
		resout.name = execSync("WMIC OS get csname").toString().split("\n")[1].trim();
		resout.id   = execSync("WMIC PROCESS where name='node.exe' get ProcessId").toString().trim().match(/(\d+)/g);
		
		let stdout = execSync('PING -n 1 127.0.0.1').toString();
		resout.ping = stdout.split("\n")[2].trim().split(" ")[4].split("<")[1];

		let ifRunning = resout.command.indexOf('index.js');
		//console.log('###62=',ifRunning)
		resout.run = ifRunning != -1 ? true:false;
		
		if(callback) callback(resout);
}


function opisz(r){
	console.log(r);
	let qurl = 'https://www.wi.zut.edu.pl/tvinfo/tv/stan/stan.php?name='+r.name+'&res='+JSON.stringify(r);
	request(qurl, function (error, response, body) {
		//console.log(error, response, body);
		console.log(body);
	});
}

testPingPS(null,opisz);

setInterval(function(){
	console.log("...Interval");
	testPingPS(null,opisz);
},60000)

var port = 8889;
console.log("~~~EXPRESS.JS~~~~~~~~~~~~~~~~~~~~~");
server.listen(port,function(){
	console.log("http://localhost:"+port);
	console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
	
	
		let nod = 'C:/nodejs/app/PLAN/index.js';
		//let nod = '../index.js';
		console.log(nod)
		const child = spawn('node', [nod], {
		  detached: true, 	// odłącz sie od rodzica
		  stdio: 'ignore'	// odlacz wyjscie dziecka aby mogło działać
		});

		child.unref(); 	// rodzic mo		
	
});
