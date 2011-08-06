/**
 * team-popup-links.js
 * Foxtrick show Team Popup
 * @author bummerland, convinced, ryanli
 */
////////////////////////////////////////////////////////////////////////////////
var FoxtrickTeamPopupLinks = {
	MODULE_NAME : "TeamPopupLinks",
	MODULE_CATEGORY : Foxtrick.moduleCategories.SHORTCUTS_AND_TWEAKS,
	PAGES : ["all"],
	NICE : 10, // after anythings that works on team/manager links
	CSS : Foxtrick.ResourcePath + "resources/css/popup-links.css",

	OPTIONS : [ "TeamLinks", "UserLinks", "CustomLink" ],
	OPTION_TEXTS : true,
	OPTION_TEXTS_DISABLED_LIST : [ true, true, false],

	LINKS : {
		"Team" :
			{
				linkByUser : "/Club/Manager/?userId=[userid]&redir_to_team=true"
			},
		"Manager" :
			{
				linkByTeam : "/Club/Manager/?teamId=[teamid]"
			},
		"TeamAtAlltid" :
			{
				linkByTeam : "http://alltid.org/team/[teamid]",
				linkByUser : "/Club/Manager/?userId=[userid]&redir_to_team_at_alltid=true"
			},
		"Matches" :
			{
				ownLink : "/Club/Matches/",
				linkByTeam : "/Club/Matches/?TeamID=[teamid]",
				linkByUser : "/Club/Manager/?userId=[userid]&redir_to_matches=true"
			},
		"Players" :
			{
				ownLink : "/Club/Players/",
				linkByTeam : "/Club/Players/?TeamID=[teamid]",
				linkByUser : "/Club/Manager/?userId=[userid]&redir_to_players=true"
			},
		"last_5_ips" :
			{
				linkByTeam : "/Club/Manager/?teamId=[teamid]&ShowOldConnections=true",
				linkByUser : "/Club/Manager/?userId=[userid]&ShowOldConnections=true"
			},
		"Guestbook" :
			{
				linkByTeam : "/Club/Manager/Guestbook.aspx?teamid=[teamid]",
				linkByUser : "/Club/Manager/?userId=[userid]&redir_to_guestbook=true"
			},
		"SendMessage" :
			{
				linkByTeam : "/Club/?TeamID=[teamid]&redir_to_mail=true",
				linkByUserName : "/MyHattrick/Inbox/Default.aspx?actionType=newMail&mailto=[username]"
			},
		"Challenge" :
			{
				linkByTeam : "/Club/Challenges/?TeamID=[teamid]&challenge=true",
				linkByUser : "/Club/Manager/?userId=[userid]&redir_to_challenge=true"
			},
		"Achievements" :
			{
				linkByTeam : "/Club/Manager/?teamId=[teamid]&redir_to_achievements=true",
				linkByUser : "/Club/Manager/?userId=[userid]&redir_to_achievements=true"
			},
		"Coach" :
			{
				ownLink : "/Club/Training/?redir_to_coach=true",
				linkByTeam : "/Club/Players/?TeamID=[teamid]&redir_to_coach=true",
				linkByUser : "/Club/Manager/?userId=[userid]&redir_to_coach=true"
			},
		"TransferHistory" :
			{
				linkByTeam : "/Club/Transfers/transfersTeam.aspx?teamId=[teamid]",
				linkByUser : "/Club/Manager/?userId=[userid]&redir_to_transferhistory=true"
			},
		"TeamHistory" :
			{
				linkByTeam : "/Club/History/?teamId=[teamid]",
				linkByUser : "/Club/Manager/?userId=[userid]&redir_to_teamhistory=true"
			},
		"LastLineup" :
			{
				linkByTeam : "/Club/Matches/MatchLineup.aspx?TeamID=[teamid]&useArchive=True",
				linkByUser : "/Club/Manager/?userId=[userid]&redir_to_lastlineup=true"
			},
		"NextMatch" :
			{
				linkByTeam : "/Club/Matches/?TeamID=[teamid]&redir_to_nextmatch=true",
				linkByUser : "/Club/Manager/?userId=[userid]&redir_to_nextmatch=true"
			},
		"AddNextMatch" :
			{
				linkByTeam : "/Club/Matches/?TeamID=[teamid]&redir_to_addnextmatch=true",
				linkByUser : "/Club/Manager/?userId=[userid]&redir_to_addnextmatch=true"
			},
		"YouthMatches" :
			{
				linkByTeam : "/Club/Matches/?TeamID=[teamid]&redir_to_youthmatches=true",
				linkByUser : "/Club/Manager/?userId=[userid]&redir_to_youthmatches=true"
			}
	},

	OPTION_FUNC : function(doc) {
		var table = doc.createElement("table");
		table.className = "bordered center";

		var caption = doc.createElement("caption");
		caption.setAttribute("text-key", "TeamPopupLinks.prefsCaption");
		table.appendChild(caption);

		var headerRow = doc.createElement("tr");
		table.appendChild(headerRow);

		var placeHolder = doc.createElement("th");
		headerRow.appendChild(placeHolder);
		var enableDefault = doc.createElement("th");
		enableDefault.setAttribute("text-key", "TeamPopupLinks.ShowByDefault");
		headerRow.appendChild(enableDefault);
		var enableMore = doc.createElement("th");
		enableMore.setAttribute("text-key", "TeamPopupLinks.ShowOnMore");
		headerRow.appendChild(enableMore);

		for (var i in this.LINKS) {
			var row = doc.createElement("tr");
			table.appendChild(row);

			var title = doc.createElement("th");
			title.textContent = FoxtrickPrefs.getModuleElementDescription(this.MODULE_NAME, i);
			row.appendChild(title);

			var defaultCell = doc.createElement("td");
			row.appendChild(defaultCell);
			var defaultCheck = doc.createElement("input");
			defaultCheck.type = "checkbox";
			defaultCheck.setAttribute("pref", "module." + this.MODULE_NAME + "." + i + ".default");
			defaultCell.appendChild(defaultCheck);

			var moreCell = doc.createElement("td");
			row.appendChild(moreCell);
			var moreCheck = doc.createElement("input");
			moreCheck.type = "checkbox";
			moreCheck.setAttribute("pref", "module." + this.MODULE_NAME + "." + i + ".more");
			moreCell.appendChild(moreCheck);
		}

		return table;
	},

	run : function(doc) {
		var sUrl = Foxtrick.getHref(doc);

		this.userlink = false;
		var redir_from_forum = (sUrl.search(/Forum/i) != -1);
		if (sUrl.search(/ShowOldConnections=true/i) != -1) {
			var a = doc.getElementById("ctl00_ctl00_CPContent_CPMain_lnkShowLogins");
			if (a) {
				var func = a.href;
				if (func) {
					doc.location.href = func;
				}
			}
		}

		this.ownteamid = Foxtrick.util.id.getOwnTeamId();
		this.hasScroll = Foxtrick.util.layout.mainBodyHasScroll(doc);

		// team links
		var aLink = doc.getElementById('teamLinks').getElementsByTagName('a')[0];
		if (aLink)
			this._addSpan(doc, aLink);

		// all in mainWrapper (ie. not left boxes)
		if (sUrl.search(/Forum\/Default/i)!=-1) return; // not in forum overview
		var aLinks = doc.getElementById('mainBody').getElementsByTagName('a');
		var i = 0, aLink;
		while (aLink = aLinks[i++]) {
			if (aLink.getElementsByTagName('img')[0] != null || aLink.parentNode.className=='liveTabText')
				continue; // don't add to buttons, and htlive tabs
			this._addSpan(doc, aLink);
		}

		var sidebar = doc.getElementById('sidebar');
		if (sidebar) {
			aLinks = sidebar.getElementsByTagName('a');
			var i = 0, aLink;
			while (aLink = aLinks[i++]) {
				if (aLink.getElementsByTagName('img')[0] != null)
					continue; // don't add to buttons
				this._addSpan(doc, aLink);
			}
		}
	},

	_addSpan : function (doc, aLink) {
		if ((aLink.href.search(/Club\/\?TeamID=/i) > -1 && aLink.href.search(/redir_to/i)===-1 && FoxtrickPrefs.isModuleOptionEnabled("TeamPopupLinks", "TeamLinks"))
			|| (aLink.href.search(/Club\/Manager\/\?UserID=/i) !=-1 && FoxtrickPrefs.isModuleOptionEnabled("TeamPopupLinks", "UserLinks"))) {
			var par = aLink.parentNode;
			var span = doc.createElement("span");
			span.setAttribute('class', 'myht1');
			par.insertBefore(span, aLink);
			aLink.addEventListener("mouseover", function(ev) { FoxtrickTeamPopupLinks.popupshow(ev); } ,false);
			span.appendChild(aLink);
		}
	},

	isEnabledWithinContext : function(option, more) {
		if (!more)
			return FoxtrickPrefs.getBool("module." + this.MODULE_NAME + "." + option + ".default");
		else
			return FoxtrickPrefs.getBool("module." + this.MODULE_NAME + "." + option + ".more");
	},

	popupshow : function(evt) {
		try {
			var findLink = function(node) {
				if (node.nodeName.toLowerCase() == "a")
					return node;
				if (!node.parentNode)
					return null;
				return findLink(node.parentNode);
			}
			// need to find <a> recursively as <a> may have children
			// like <bdo>
			var org_link = findLink(evt.target);
			if (org_link === null)
				return; // no link found
			var show_more = false;
			if (org_link.getAttribute('more')) {
				org_link.removeEventListener('click',FoxtrickTeamPopupLinks.popupshow,true);
				if (org_link.getAttribute('more')=='true')
					show_more=true;
				org_link = org_link.parentNode.parentNode.previousSibling;
			}
			var doc = evt.target.ownerDocument;
			evt.target.parentNode.removeEventListener("mouseover",FoxtrickTeamPopupLinks.popupshow,false);

			var teamid = Foxtrick.util.id.getTeamIdFromUrl(org_link.href);
			if (teamid)
				var teamname = org_link.textContent;
			var userid = Foxtrick.util.id.getUserIdFromUrl(org_link.href);
			if (userid)
				var username = org_link.textContent;

			var owntopteamlinks = (org_link.parentNode.parentNode.tagName == "DIV" && org_link.parentNode.parentNode.id == "teamLinks");

			var list = doc.createElement("ul");
			list.className = "ft-popup-list";

			function addItem(key, isOwnTeam, teamId, userId, userName, ownLink, linkByTeam, linkByUser, linkByUserName) {
				var item = doc.createElement("li");
				var link = doc.createElement("a");
				if (isOwnTeam && ownLink)
					link.href = ownLink;
				else if (teamId && linkByTeam)
					link.href = linkByTeam.replace(/\[teamid\]/i, teamId);
				else if (userId && linkByUser)
					link.href = linkByUser.replace(/\[userid\]/i, userId);
				else if (userName && linkByUserName)
					link.href = linkByUserName.replace(/\[username\]/i, userName);
				else
					return;
				link.textContent = Foxtrickl10n.getString(key);
				item.appendChild(link);
				list.appendChild(item);
			}

			// own team's link at the top of the page
			if (owntopteamlinks) {
				const ownLinks = [ "Matches", "Players" ];
				for (var item in ownLinks) {
					var link = ownLinks[item];
					if (FoxtrickTeamPopupLinks.LINKS[link]) {
						addItem(link, true,
							null, null, null,
							FoxtrickTeamPopupLinks.LINKS[link].ownLink,
							null, null, null);
					}
				}
			}
			else {
				for (var link in FoxtrickTeamPopupLinks.LINKS) {
					if (FoxtrickTeamPopupLinks.isEnabledWithinContext(link, show_more)) {
						addItem(link,
							(teamid == FoxtrickTeamPopupLinks.ownteamid),
							teamid, userid, username,
							FoxtrickTeamPopupLinks.LINKS[link].ownLink,
							FoxtrickTeamPopupLinks.LINKS[link].linkByTeam,
							FoxtrickTeamPopupLinks.LINKS[link].linkByUser,
							FoxtrickTeamPopupLinks.LINKS[link].linkByUserName);
					}
				}

				if (FoxtrickPrefs.isModuleOptionEnabled("TeamPopupLinks", "CustomLink")) {
					var ownlinks = FoxtrickPrefs.getString("module." + this.MODULE_NAME + "." + "CustomLink_text");
					ownlinks = ownlinks.split(/<\/a>\s+/);
					var i=0,ownlink;
					while (ownlink=ownlinks[i++]) {
						ownlink+='</a>';
						var item = doc.createElement("li");
						var redir_to_custom = false;
						var a6inner = ownlink;
						if (a6inner.search(/\[teamid\]/) != -1) {
							if (teamid) a6inner = a6inner.replace(/\[teamid\]/i, teamid);
							else redir_to_custom = true;
						}
						if (a6inner.search(/\[userid\]/) != -1) {
							if (userid) a6inner = a6inner.replace(/\[userid\]/i, userid);
							else redir_to_custom = true;
						}

						if (redir_to_custom) {
							item.innerHTML = a6inner;
							var a6 = item.getElementsByTagName('a')[0];
							if (teamid==null) a6.href = '/Club/Manager/?userId='+userid+'&redir_to_custom=true'+'&'+a6.href;
							else a6.href = '/Club/Manager/?teamId='+teamid+'&redir_to_custom=true'+'&'+a6.href;
						}
						else {
							item.innerHTML = a6inner;
							var a6 = item.getElementsByTagName('a')[0];
						}
						list.appendChild(item);
					}
				}

				var item = doc.createElement("li");
				var link = doc.createElement("a");
				if (!show_more) {
					link.setAttribute('more', 'true');
					link.textContent = Foxtrickl10n.getString('more');
				}
				else {
					link.setAttribute('more', 'false');
					link.textContent = Foxtrickl10n.getString('less');
				}
				link.addEventListener('click', function(ev) { FoxtrickTeamPopupLinks.popupshow(ev); },true);
				item.appendChild(link);
				list.appendChild(item);
			}

			var mainBody = doc.getElementById('mainBody');

			if (FoxtrickTeamPopupLinks.hasScroll) {
				var pT = Foxtrick.GetElementPosition(org_link,mainBody)['top'] - mainBody.scrollTop;
				if (pT < mainBody.offsetHeight/2) {// = popdown
					var more = list.removeChild(list.lastChild);
					list.insertBefore(more, list.firstChild);
					var down=true;
				}
			}

			if (!down)
				Foxtrick.addClass(list, "ft-popup-list-up");
			else
				Foxtrick.addClass(list, "ft-popup-list-down");

			if (Foxtrick.hasClass(org_link.parentNode.lastChild, "ft-popup-list"))
				org_link.parentNode.removeChild(org_link.parentNode.lastChild);
			org_link.parentNode.appendChild(list);
			org_link.removeEventListener("mouseover",FoxtrickTeamPopupLinks.popupshow,false);
		}
		catch (e) {
			Foxtrick.log(e);
		}
	}
};
Foxtrick.util.module.register(FoxtrickTeamPopupLinks);
