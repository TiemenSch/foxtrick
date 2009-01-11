/**
 * repositionedplayers.js
 * Foxtrick colors repositioned Players
 * @author spambot
 */

////////////////////////////////////////////////////////////////////////////////

var FoxtrickRepositionedPlayers = {

	MODULE_NAME : "RepositionedPlayers",
	MODULE_CATEGORY : Foxtrick.moduleCategories.MATCHES,
	DEFAULT_ENABLED : true,


    PLAYERIDS : new Array (
                            "ctl00_CPMain_ucKeeper_pnlbox",
                            "ctl00_CPMain_ucLeftBack_pnlbox",
                            "ctl00_CPMain_ucCentralDefender1_pnlbox",
                            "ctl00_CPMain_ucCentralDefender2_pnlbox",
                            "ctl00_CPMain_ucrightback_pnlbox",
                            "ctl00_CPMain_ucLeftwinger_pnlbox",
                            "ctl00_CPMain_ucInnerMidfield1_pnlbox",
                            "ctl00_CPMain_ucInnerMidfield2_pnlbox",
                            "ctl00_CPMain_ucrightwinger_pnlbox",
                            "ctl00_CPMain_ucForward1_pnlbox",
                            "ctl00_CPMain_ucForward2_pnlbox"
                          ),

	init : function() {
			Foxtrick.registerPageHandler( 'matchLineup',
                                          FoxtrickRepositionedPlayers );
    },

    run : function( page, doc ) {
                var HIGHLIGHT = "#FF4040";
                var playerdivs = getElementsByClass( "position", doc );
				var playerbox = getElementsByClass( "box_lineup", doc );

				var useCode=Foxtrickl10n.isStringAvailableLocal( 'foxtrick.matches.Keeper' );
				dump (FoxtrickRepositionedPlayers+'->locale available: "+useCode+'\n');
    
                for (var i = 0; i < playerdivs.length; i++) {
                    var player_id = playerdivs[i].parentNode.id;
                    var player_pos = Foxtrick.trim(playerdivs[i].innerHTML);
					var player_ypos = playerbox[i]["style"]["top"];
					//dump('#' + i + ': ' + player_pos + ' - ' + player_id + '\n');
                    switch ( player_id ) {
                        case this.PLAYERIDS[0]:
                            if (useCode && player_pos != Foxtrickl10n.getString('foxtrick.matches.Keeper'))
                                playerdivs[i].setAttribute( "style", "color :" + HIGHLIGHT );
							else 
                            break;
                        case this.PLAYERIDS[1]:
                            if (useCode && player_pos != Foxtrickl10n.getString('foxtrick.matches.LeftBack')
								|| (player_ypos>72-20&&player_ypos<72+20))
                                playerdivs[i].setAttribute( "style", "color :" + HIGHLIGHT );
							break;
                        case this.PLAYERIDS[2]:
                            if (useCode && player_pos != Foxtrickl10n.getString('foxtrick.matches.CentralDefender')
								|| (player_ypos>72-20&&player_ypos<72+20))
                                playerdivs[i].setAttribute( "style", "color :" + HIGHLIGHT );
                            break;
                        case this.PLAYERIDS[3]:
                            if (useCode && player_pos != Foxtrickl10n.getString('foxtrick.matches.CentralDefender')
								|| (player_ypos>72-20&&player_ypos<72+20))
                                playerdivs[i].setAttribute( "style", "color :" + HIGHLIGHT );
                            break;
                        case this.PLAYERIDS[4]:
                            if (useCode && player_pos != Foxtrickl10n.getString('foxtrick.matches.RightBack')
								|| (player_ypos>72-20&&player_ypos<72+20))
                                playerdivs[i].setAttribute( "style", "color :" + HIGHLIGHT );
                            break;
                        case this.PLAYERIDS[5]:
                            if (useCode && player_pos != Foxtrickl10n.getString('foxtrick.matches.Leftwinger')
								|| (player_ypos>141-20&&player_ypos<141+20))
                                playerdivs[i].setAttribute( "style", "color :" + HIGHLIGHT );
                            break;
                        case this.PLAYERIDS[6]:
                            if (useCode && player_pos != Foxtrickl10n.getString('foxtrick.matches.InnerMidfield')
								|| (player_ypos>141-20&&player_ypos<141+20))
                                playerdivs[i].setAttribute( "style", "color :" + HIGHLIGHT );
                            break;
                        case this.PLAYERIDS[7]:
                            if (player_pos!= Foxtrickl10n.getString('foxtrick.matches.InnerMidfield')
								|| (player_ypos>141-20&&player_ypos<141+20))
                                playerdivs[i].setAttribute( "style", "color :" + HIGHLIGHT );
                            break;
                        case this.PLAYERIDS[8]:
                            if (player_pos!= Foxtrickl10n.getString('foxtrick.matches.Rightwinger')
								|| (player_ypos>141-20&&player_ypos<141+20))
                                playerdivs[i].setAttribute( "style", "color :" + HIGHLIGHT );
                            break;
                        case this.PLAYERIDS[9]:
                            if (useCode && player_pos != Foxtrickl10n.getString('foxtrick.matches.Forward')
								|| (player_ypos>210-20&&player_ypos<210+20))
                                playerdivs[i].setAttribute( "style", "color :" + HIGHLIGHT );
                            break;
                        case this.PLAYERIDS[10]:
                            if (useCode && player_pos != Foxtrickl10n.getString('foxtrick.matches.Forward')
								|| (player_ypos>210-20&&player_ypos<210+20))
                                playerdivs[i].setAttribute( "style", "color :" + HIGHLIGHT );
                            break;
                    }
                }
	},

	change : function( page, doc ) {

	}
};