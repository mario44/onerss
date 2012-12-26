/*
function korekta_link(link,content)
function szukaj_img(link,content)
*/
   function zgas() {document.getElementById("feeddiv").style.opacity='0.5';}
   	function zapal(){document.getElementById("feeddiv").style.opacity='1.0';}
   	function kasuj(){document.getElementById("feeddiv").innerHTML='';}
   	function scroll() {window.scrollTo(0,0)}
   	function koniec() {window.scrollTo(0,0)}
	
	
	
	function viewInfoKorki(raw){
		document.getElementById('feeddiv').innerHTML+=raw;
	}
    
    
 	function viewInfo(){
 		zgas();
		var html='<div class="auto">';
			html+='<img src="http://www.yr.no/place/Poland/West_Pomerania/Szczecin~7530840/avansert_meteogram.png" /><br />';
		html+='</div>';
		kasuj();
		document.getElementById("feeddiv").innerHTML=html;
		zapal();
var script=document.createElement('SCRIPT');
script.type='text/javascript';
script.src='http://www.wi.zut.edu.pl/cdn/json/korki.json.php?callback=viewInfoKorki&co=czas&jak=tabela&format=joomla';
document.getElementsByTagName('head')[0].appendChild(script);
		
 	}   	
	
	
function popup_open(ten) {
	return false;
}	


function toDate(date,sep){
	if  (!date) return '';
	if  (!sep) sep='<br />';
	
	var d = new Date(date);
	var miesiac = d.getMonth()+1;  if (miesiac<10) miesiac = '0'+miesiac;
	var dzien   = d.getDate();     if (dzien<10)   dzien   = '0'+dzien;
	var godzina = d.getHours();    if (godzina<10) godzina = '0'+godzina;
	var minuta  = d.getMinutes();  if (minuta<10)  minuta  = '0'+minuta;
	//var pldata=d.getFullYear()+':'+miesiac+':'+dzien+'<br />'+godzina+':'+minuta;
	var pldata=dzien+'-'+miesiac+sep+'<b>'+godzina+':'+minuta+'</b>';
	return pldata;
}	

function deltaCzas(date){
	if  (!date) return '';
	var teraz = new Date();
	var kiedy = new Date(date);
	var mteraz=Date.parse(teraz);
	var mkiedy=Date.parse(kiedy);			
	var delta=mteraz-mkiedy;
	//if (delta<0) console.log(date+' DELTA= '+mteraz+' - '+mkiedy+' = '+delta);
	delta=Math.round(delta/3600000);
	return delta; // w godzinach
}	




function korekta_link(link,content){
	var agora=link.match(/gazeta|wyborcza/);
	if (agora){
		var szukaj_link=content.match(/(<a href.*?>)/gi);
		if (szukaj_link) {
			var linkarr=(szukaj_link[1].match(/;link=(.*?)">/));
			if (linkarr) {
				link=decodeURIComponent(linkarr[1]);
				} 
			link=link.replace(/http:\/\//,'http://m.');  
			}	
	}
	return link;
}


function szukaj_img(link,content){
	var dzikie_obrazki=content.match(/(dzone|advertisement)/gi);
	var image='';
	var szukaj_img=content.match(/(<img.*?>)/gi);
	if (szukaj_img && szukaj_img[0] && !dzikie_obrazki){
		var feedburner=szukaj_img[0].match(/(feedburner)/gi) || '';
		var zut=link.match(/(\/\/zut.)/gi) || '';
		if (!feedburner) image=szukaj_img[0];
		//if (zut) image='http://zut.edu.pl/'+image;
		if (zut) {
			image=image.replace('<img src="','<img src="http://zut.edu.pl/');
			image=image.replace(/width=\"\d\d\d\"/,'');
			image=image.replace(/height=\"\d\d\d\"/,'');
			image=image.replace(' alt="">',' />');
		}
	}
	return image;
}

  	function deviceInfo() {
   		window.scrollTo(0,0)
		var element = document.getElementById('feeddiv');
		element.innerHTML = 'Device Name: '     + device.name     + '<br />' + 
		'Device Platform: ' + device.platform + '<br />' + 
		'Device UUID: '     + device.uuid     + '<br />' + 
		'Device Version: '  + device.version  + '<br />'; 
		}
