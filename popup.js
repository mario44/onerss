function loadXMLDoc(xurl,myDiv){
var xmlhttp;
if   (window.XMLHttpRequest){xmlhttp=new XMLHttpRequest();}
else {xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");}
xmlhttp.onreadystatechange=function(){
if (xmlhttp.readyState==4 && xmlhttp.status==200){
document.getElementById(myDiv).innerHTML=xmlhttp.responseText;
}
}
xmlhttp.open("GET",xurl,true);
xmlhttp.send();
}



	// popup 	open
	function popup_open(ten) {
		var title=ten.getAttribute('rel-title');
		var link=ten.getAttribute('rel-link');
		var lokalizacja=ten.getAttribute('rel-lokalizacja');
		var sekcja=ten.getAttribute('rel-sekcja');
		
		var	html_btn ='<div class="well">';
			html_btn+='<a href="javascript:void(0)" class="btn btn-danger" onClick="zapisz_LS_link(this);" id="popup_zapisz_LS_link">Zapisz moje linki</a> ';
			//<!-- moje swoje -->
			html_btn+='<a href="javascript:void(0)" class="btn btn-primary" onClick="zapisz_link(this);" id="popup_zapisz_link">Udostępnij URL </a> ';	
			html_btn+='</div>';
		document.getElementById('popup_body').innerHTML=html_btn;
		document.getElementById('popup').style.display='block';
		document.getElementById('popup_title').innerHTML=title;
		document.getElementById('popup_zapisz_LS_link').setAttribute('rel-title',title);
		document.getElementById('popup_zapisz_LS_link').setAttribute('rel-link',link);
		document.getElementById('popup_zapisz_link').setAttribute('rel-title',title);
		document.getElementById('popup_zapisz_link').setAttribute('rel-link',link);
		document.getElementById('popup_zapisz_link').setAttribute('rel-lokalizacja',lokalizacja);
		document.getElementById('popup_zapisz_link').setAttribute('rel-sekcja',sekcja);
		//document.getElementById('popup_info').innerText='Mobile='+mobile+' | '+navigator.userAgent.toLowerCase();

	}
	// popup 	close
	function popup_close() {
		document.getElementById('popup_info').innerHTML='';
		document.getElementById('popup_menu').innerHTML='';
		
		document.getElementById('popup').style.display='none';
	}
	
	// popup	zapisz link
	function zapisz_link(ten) {
		var title=ten.getAttribute('rel-title');
		var url=ten.getAttribute('rel-link');
		var lokalizacja=ten.getAttribute('rel-lokalizacja');
		var sekcja=ten.getAttribute('rel-sekcja');
		var xurl='http://zszczech.zut.edu.pl/rss/_/ajax_zapisz.php?s='+sekcja+'&l='+lokalizacja+'&t='+title+'&u='+url;
		loadXMLDoc(xurl,'popup_info')
		popup_close();
		zapiszLSlinki(title,url);
	}
	function zapisz_LS_link(ten) {
		var title=ten.getAttribute('rel-title');
		var url=ten.getAttribute('rel-link');
		popup_close();
		zapiszLSlinki(title,url);
	}	

//if (last) $('#zaznacz_czas').addClass('active'); else $('#kasuj_czas').addClass('active');
	function zapiszLSlinki(title,link){
		var max_links=14;
		var get_linki=localStorage.getItem('_rss_linki');
		if (get_linki) {
			var arr=JSON.parse(get_linki);
			var ile=arr.length;
			if (ile>max_links) {arr.shift();arr.shift();}
			} else arr=[];
		var store_linki=arr;	
		arr.push({'title':title, 'link':link})
		store_linki=JSON.stringify(store_linki);
		localStorage.setItem('_rss_linki',store_linki);
	}
	
	function viewLSlinki(){
		var get_linki = localStorage.getItem('_rss_linki');
		var arr=JSON.parse(get_linki);
		if (!arr) return false;
		var html='<ol>';
		arr.reverse();
		for(var i in arr) {
			html+='<li><a href="'+arr[i].link+'">'+arr[i].title+'</a></li>';
		}
		html+='</ol>';
		document.getElementById('popup').style.display='block';
		document.getElementById('popup_title').innerHTML='Lokalne linki';
		document.getElementById('popup_body').innerHTML=html;
	}
	

function viewConfig(){
		var font = localStorage.getItem('_font_');
		var font_size = localStorage.getItem('_font_size_');
		//console.log(font_size+' '+font);
		var ff=[];
		var fs=[];
		ff[font]='active';
		fs[font_size]='active';
		//console.log(ff);
		//console.log(fs);
		
		var html='';
		html+='<div>';
		html+='<b>Font-family: </b>';
		html+='<a href="javascript:void(0)" class="btn btn-info '+ff['Arial']+'" onClick="configFont(\'\',\'\');">Arial</a> ';
		html+='<a href="javascript:void(0)" class="btn btn-info '+ff['Georgia']+'" onClick="configFont(\'Georgia\',\'\');">Georgia</a> ';
		html+='<a href="javascript:void(0)" class="btn btn-info '+ff['PT Sans Narrow']+'" onClick="configFont(\'PT Sans Narrow\',\'\');">PT Sans Narrow</a> ';
		html+='<hr />';
		html+='<b>Font-size: </b>';
		html+='<a href="javascript:void(0)" class="btn btn-info '+fs[14]+'" onClick="configFont(\'*\',\'14\');">14</a> ';
		html+='<a href="javascript:void(0)" class="btn btn-info '+fs[15]+'" onClick="configFont(\'*\',\'15\');">15</a> ';
		html+='<a href="javascript:void(0)" class="btn btn-info '+fs[16]+'" onClick="configFont(\'*\',\'16\');">16</a> ';
		html+='<a href="javascript:void(0)" class="btn btn-info '+fs[17]+'" onClick="configFont(\'*\',\'17\');">17</a> ';
		html+='<a href="javascript:void(0)" class="btn btn-info '+fs[18]+'" onClick="configFont(\'*\',\'18\');">18</a> ';
		html+=' px</div>';
		document.getElementById('popup').style.display='block';
		document.getElementById('popup_title').innerHTML='Config - <small>Ustaw font i jego rozmiar.</small>';
		document.getElementById('popup_body').innerHTML=html;
		//document.getElementById('popup_info').innerText='';
		document.getElementById('popup_menu').innerHTML=document.getElementById('strefa_czasu').innerHTML;
		
		
	}

	function configFont(font,size){
		if (!font) font='Arial';
		//if (!size) size=15;
		if (font != '*') {
			//if (!font) localStorage.removeItem('_font_');
			if (font)  localStorage.setItem('_font_',font);
		}
		if (size) {localStorage.setItem('_font_size_',size);}
		//location.reload();
	}

	
	
	
	function ustawCzas(ten){
		
		document.getElementById(ten.id).style.color="red";
		var czas=ten.getAttribute('rel');
		if (czas==0) czas=9999;
		if (czas) {
		//console.log(czas);
			localStorage.setItem('czas',czas);
			//location.reload();
		}
	}
	

	function zaznacz_czas() {
		var teraz = new Date();
		var mteraz=Date.parse(teraz);
		localStorage.setItem('last',mteraz);
		//location.reload();
	}
	
	function kasuj_czas() {
		localStorage.removeItem('last');
		//location.reload();
	}
	