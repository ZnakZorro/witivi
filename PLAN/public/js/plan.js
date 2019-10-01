/*
*/
var cacheName = '_plan_TV_cache';
var cache = null;


function storeToCache(ret){
	localStorage.setItem(cacheName, JSON.stringify(ret));
	//if(!test) cache = localStorage.getItem(cacheName);
	//console.log(cacheName,cache);
	//localStorage.removeItem(cacheName);	
}









var ileDanych = 0;
var successData = function(ret){
	console.log('#316===successData()');
	if(typeof(ret)==="string") ret = JSON.parse(ret);
	console.log('#315= ',typeof(ret), ret.length);
	console.log(ret);
	storeToCache(ret);
	var dataczas = toDate();
	console.log(getURLParameter('dateFrom'))
	if(test==true && getURLParameter('dateFrom')) dataczas = getURLParameter('dateFrom');
	//qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq1
	ret.forEach(function(day){
		console.log('#324=== test='+test,'dataczas='+dataczas,'day.date='+day.date,dataczas===day.date)
		if (dataczas===day.date)
		{
			console.log(dataczas,day.date,dataczas===day.date);
			var lessons = day.lessons;
			_$("#planTV").innerHTML ='';
			var godziny = {}
			lessons.forEach(function(lesson){
				if (lesson.room.indexOf(tv) >-1){
					var oddo = lesson.timeRange.from+' - '+lesson.timeRange.to;
					if (!godziny[oddo]) godziny[oddo]=[];
					godziny[oddo].push(lesson);
				}
			});
		}
		var nr=0;
		for (h in godziny){
			var godz = godziny[h];
			var HTML = '';
			HTML += '<h3>'+h+', '+tv+', '+toDate("dw")+', '+dataczas+'</h3>';
			HTML += '<div class="lekcje">';
			var pietro = 'x';
			godz.forEach(function(g,i){
				var teacher   = g.teacher.academicTitle+' '+g.teacher.name+' '+g.teacher.surname;
					if (teacher.length>30) teacher   = g.teacher.academicTitle+' '+g.teacher.name[0]+'. '+g.teacher.surname;
				var subject   = g.subject;
				var group     = g.group;
				var room      = g.room;
				var roo = room.match(/\d*.$/);
				if (roo[0]) room= roo[0];
				pietro = (((room).toString())[0])
				 HTML += '<div class="lekcja p'+pietro+'">';
					HTML += '<p class="sala">'+room+'</p>';
					HTML += '<p class="grupa">'+group+'</p>';
					HTML += '<p class="opis">'+teacher+'<br />'+subject+'</p>';
				HTML += '</div>';
				 
			});
			HTML += '</div>';
			var klasa = '';
			if (nr++===0) klasa = 'blask';
			_$("#planTV").innerHTML += '<div class="godzina '+tv+' '+klasa+'">'+HTML+'</div>';
			//console.log(nr,godziny.length,godziny);
			ileDanych++;
		}
		//_$("#planTV").innerHTML += '<div id="koniec">.</div>';
		
	});
	
	console.log('#372===',ileDanych);
	//qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq2
		
		if (ileDanych>0){
			// blask +++++++++++++++++++++++++
			setTimeout(function(){
				setBlask();
				checkView();
				document.getElementById("czas").textContent=(toDate('time'));
			},333);
		} else {
			// brak danych
			brakDanych();
			
		}

}







/***********************/
function toDate(co){
	//console.log('#374 toDate=',typeof(co));
	//if (typeof(co)==='object'){
		//console.log('#376 =',co);
	//}
	var weekdays = ["Niedziela", "Poniedziałek", "Wtorek", "Środa", "Czwartek", "Piątek", "Sobota"];
	var d = new Date();
	if (typeof(co)==='object') d = new Date(co);
	var rok     = d.getFullYear(); 
	var miesiac = d.getMonth()+1;  if (miesiac<10) miesiac = '0'+miesiac;
	var dzien   = d.getDate();     if (dzien<10)   dzien   = '0'+dzien;
	var dw      = d.getDay();
	var godzina = d.getHours();    if (godzina<10) godzina = '0'+godzina;
	var minuta  = d.getMinutes();  if (minuta<10)  minuta  = '0'+minuta;
	var sekunda = d.getSeconds();  if (sekunda<10) sekunda = '0'+sekunda;
	if      (co==="minuty")  return (parseInt(godzina)*60) + parseInt(minuta);
	else if (co==="dw")      return weekdays[dw];
	else if (co==="time")    return dzien+'.'+miesiac+'.'+rok+', '+godzina+':'+minuta;//+':'+sekunda;
	else                     return dzien+'-'+miesiac+'-'+rok;
}
/*
function jutro(dateFrom){
	var arr = dateFrom.split('-');
	dateFrom = arr[2]+'-'+arr[1]+'-'+arr[0]
	//console.log(arr,dateFrom,Date.parse(dateFrom))
	var tomorrow = new Date(Date.parse(dateFrom));
	tomorrow = new Date(tomorrow.getTime() + (24 * 60 * 60 * 1000));
	return toDate(tomorrow);
}
function pojutrze(dateFrom){
	var arr = dateFrom.split('-');
	dateFrom = arr[2]+'-'+arr[1]+'-'+arr[0]
	//console.log(arr,dateFrom,Date.parse(dateFrom))
	var tomorrow = new Date(Date.parse(dateFrom));
	tomorrow = new Date(tomorrow.getTime() + (2*24 * 60 * 60 * 1000));
	return toDate(tomorrow);
}
*/
function jutro(dateFrom,skok){
	var arr = dateFrom.split('-');
	dateFrom = arr[2]+'-'+arr[1]+'-'+arr[0]
	//console.log(arr,dateFrom,Date.parse(dateFrom))
	var tomorrow = new Date(Date.parse(dateFrom));
	tomorrow = new Date(tomorrow.getTime() + (skok*24 * 60 * 60 * 1000));
	return toDate(tomorrow);
}

	
let instalScript = function(src){
		var script = document.createElement('script');
		script.type = 'text/javascript';
		script.async = true;
		script.src = src;
		var s = document.getElementsByTagName('script')[0];
		s.parentNode.insertBefore(script, s);
}


let stylplus =  function(styles){
	let css = document.createElement('style'); css.type = 'text/css'; 
	if (css.styleSheet) css.styleSheet.cssText = styles; 
	else  css.appendChild(document.createTextNode(styles)); 
	document.getElementsByTagName("head")[0].appendChild(css); 
}

