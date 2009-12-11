/**
* addhtlivetoongoing.js
* Foxtrick Copies post id to clipboard
* @author convinced
*/

var FoxtrickAddHtLiveToOngoing = {

	MODULE_NAME : "AddHtLiveToOngoing",
	MODULE_CATEGORY : Foxtrick.moduleCategories.SHORTCUTS_AND_TWEAKS,
	PAGES : new Array('league','youthleague','match'), 
	DEFAULT_ENABLED : false,
	

	init : function() {
	},
	
	run : function( page, doc ) {  
		try { 
		if (page=='league' || page=='youthleague') {
			var tables=doc.getElementsByTagName('table');
			for (var i=0;i<tables.length;i++) { 
				if (tables[i].className=='indent right thin') { 
					var trs=tables[i].getElementsByTagName('tr');
					for (var k=1;k<trs.length-1;k++) { 
						var tds=trs[k].getElementsByTagName('td');
						var matchlink =tds[0].getElementsByTagName('a')[0];
						if (!Foxtrick.isStandardLayout(doc)) matchlink.innerHTML=matchlink.innerHTML.substr(0,30);
						if (trs[k].innerHTML.search(/matchHTLive/)==-1) {
								tds[0].setAttribute('class','nowrap');
								//tds[0].setAttribute('style','width:100px; overflow:hidden;');
								tds[tds.length-1].className='middle nowrap right';
								var matchID=FoxtrickHelper.findMatchId(trs[k])
								var a=doc.createElement('a');
								a.href="/Club/Matches/Live.aspx?actionType=addMatch&amp;matchID="+matchID;
								a.innerHTML='<img class="matchHTLive" title="HT Live" alt="HT Live" src="/Img/Icons/transparent.gif"/>';
								tds[tds.length-1].appendChild(a);							
						}
					}	
					break;
				}
			}
		}
		
		if (page=='match' && doc.getElementById('ctl00_CPMain_pnlPreMatch')==null
				&& doc.getElementById('mainBody').getElementsByTagName('table').length==0 
				&& doc.getElementById('mainBody').innerHTML.search(/addMatch/)==-1) {
			var imgs=doc.getElementById('mainBody').getElementsByTagName('img'); 
			var img=null,i=0;
			while (img=imgs[i++])  {if (img.src.search(/weather/i)!=-1) break;}
			if (img!=null) {
				var matchID=FoxtrickHelper.findMatchId(doc.getElementById('mainWrapper').getElementsByTagName('h2')[0]);								
				var a=doc.createElement('a');
				a.href="/Club/Matches/Live.aspx?actionType=addMatch&matchID="+matchID;
				a.innerHTML='<img style="position:absolute; right:10px;" class="matchHTLive" title="HT Live" alt="HT Live" src="/Img/Icons/transparent.gif"/>';
				img.parentNode.appendChild(a);
			}
		}
		} catch(e) {Foxtrick.dump('FoxtrickAddHtLiveToOngoing: '+e+'\n');}
	},
	
	change : function( page, doc ) {
	},	
};