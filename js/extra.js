/**
 * @author René Geuze
 * TODO clean code below
 */
(function($, YAOC){
	"use strict";
	var UI = YAOC.namespace('UI'),
		Widgets = YAOC.namespace('UI.Widgets'),
		User = YAOC.namespace('User');
	// Set default settings
	UI.settings = {
		frame: $("#orkfia").attr('data-src')
	};
	Widgets.settings = {
		// savekey(id), display, x, y
		"construction": ["construction", 1, 40, 30],
		"attack": ["attack", 0, 60, 60],
		"mibbit": ['mibbit', 0, "center", "center"],
		"settings": ['settings', 0, 'center', 'center'],
		"feature_request": ['feature_request', 0, 'center', 'center']
	};
	User.settings = {
		nick: localStorage.getItem('nick') || false,
		username: localStorage.getItem('username') || false,
		password: localStorage.getItem('password') || false,
		channels: localStorage.getItem('channels') || '#orkfia',
		autoconnect: localStorage.getItem('autoconnect') || '0'
	};

	// JS settings to settings menu
	$('#settings [name=channels]').val((User.settings.channels || ''));
	$('#settings [name=nick]').val((User.settings.nick || ''));
	$('#settings [name=username]').val((User.settings.username || ''));
	$('#settings [name=password]').val((User.settings.password || ''));
	
	if(User.settings.autoconnect == '1') {
		$('#settings [name=autoconnect]').attr('checked', 'checked');
	}
	if(!User.settings.username || !User.settings.password) {
		$('#orkfia').attr('src',UI.settings.frame).removeAttr('data-src');
	} else {///json/auth-login/?input=qs&username
		$.getJSON(UI.settings.frame + "/api/json/auth-login/?input=qs&action=both&username="+User.settings.username+"&password="+User.settings.password+"&callback=?",
			function(data) {
				if (data.error) {
					alert(data.error);
				}
		
				// Force reload of AatW
				$("#orkfia").attr('src', UI.settings.frame).removeAttr('data-src');
		});
	}
	
	// Start dragging and resizing of all widgets.
	$(".widget").draggable({
		handle: "header"
		,containment: "body"
		,cancel: "a"
		,iframeFix: true
		,stack: ".widget,#orkfia"
		,stop: function(event, ui){
			saveWidgetStatus($(event.target).attr('id'));
		}
	});
	
	// Find highest z-index of all widgets
	function findHighestWidget() {
		var z = 0;
		$(".widget").each(function() {
			var wz = $(this).css('z-index');
			if(wz > z) {
				z = wz;
			}
		});
		return z * 1;
	}
	// EVENT Get widget on top as soon as you start clicking
	$(".widget").on('mousedown', function() {
		$(this).css('z-index', findHighestWidget() + 1);
	});
	
	// EVENT Toggle widget visibility
	$("[data-action]").on('click', function() {
		var target = $(this).attr('data-target'),
			action = $(this).attr('data-action');
		if(action === 'toggle'){
			action = ($("#" + target).css('display') === 'none') ? 'open' : 'close';
		}
		if (action === 'open') {
			openWidget(target);
		} else if (action === 'close') {
			closeWidget(target);
		}
	});
	
	function openWidget(target) {
		if(target === 'mibbit'){
			loadMibbit();
		}
		$("#" + target).show().css('z-index', findHighestWidget() + 1);
		$("nav [data-target='" + target + "']").addClass('active');
		saveWidgetStatus(target);
	}
	
	function closeWidget(target) {
		$("#" + target).hide();
		$("nav [data-target='" + target + "']").removeClass('active');
		saveWidgetStatus(target);
	}
	
	function loadMibbit() {
		$('#mibbit').find('[data-src]').each(function() {
			"use strict";
			var src = $(this).attr('data-src');
			
			src += '&amp;channel=' + encodeURIComponent(User.settings.channels);
			src += '&amp;nick=' + encodeURIComponent(User.settings.nick);
			if (User.settings.autoconnect == '1') {
				src += '&amp;autoConnect=true';
			}
			
			$(this).attr('src', src).removeAttr('data-src');
		});
	}
	function saveWidgetStatus(id) {
		var $e = $("#" + id),
			display = ($e.css("display") !== "none") ? 1 : 0,
			x = $e.css("left").replace("px",""),
			y = $e.css("top").replace("px","");
		localStorage.setItem(id, '"'+id+'",'+display+','+x+','+y);
	}
	/*
	 * Loads and applies saved widget settings
	 */
	(function() {
		var val, display, i;
		for (i in Widgets.settings) {
			val = false;
			
			try {val = localStorage.getItem(i)} catch (err) {};
			
			if (val) {
				Widgets.settings[i] = val.split(',');
			}
			display = (Widgets.settings[i][1] == 0) ? "none" : "block";
			if(display === 'block'){
				$("nav [data-target='" + i + "']").addClass('active');
				if(i === 'mibbit'){
					loadMibbit();
				}
			}
			$("#menu [data-target='"+Widgets.settings[i][0]+"']").addClass("active");
			
			if (Widgets.settings[i][2] === "center") {
				Widgets.settings[i][2] = $("body").width() / 2 - $("#" + i).width() / 2;
			} else if (Widgets.settings[i][2] * 1 + $("#" + i).width() > $("body").width() * 1) {
				Widgets.settings[i][2] = $("body").width() - $("#" + i).width();
			}
			if (Widgets.settings[i][3] === "center") {
				Widgets.settings[i][3] = $("body").height() / 2 - $("#" + i).height() / 2;
			} else if (Widgets.settings[i][3] * 1 + $("#" + i).height() > $("body").height() * 1) {
				Widgets.settings[i][3] = $("body").height() - $("#" + i).height();
			}
			$("#" + i).css({
				"left" : Widgets.settings[i][2] + "px",
				"top" : Widgets.settings[i][3] + "px",
				"display" : display
			});
		};
	})()
	
	// EVENT Login
	$('#login').on('click', function() {
		if(!User.settings.username || !User.settings.password){
			alert("Fill in your username and password in settings.");
			openWidget('settings');
			return false;
		}
		$.getJSON(UI.settings.frame + "/api/json/auth-login/?input=qs&action=both&username="+User.settings.username+"&password="+User.settings.password+"&callback=?",
			function(data) {
				if (data.error){
					alert(data.error);
				} else {
					// Force reload of AatW
					$("#orkfia").attr('src', UI.settings.frame + '/tribe/').removeAttr('data-src');
				}
			});
		return false;
	});
	
	
	// EVENT Update settings - fields
	$('#settings input[name][type="text"], #settings input[name][type="password"]').on('keyup change', function() {
		if($(this).val() && $(this).val() != ""){
			localStorage.setItem($(this).attr('name'), $(this).val());
			settings[$(this).attr('name')] = $(this).val();
		} else {
			localStorage.removeItem($(this).attr('name'));
			settings[$(this).attr('name')] = false;
		}
	});
	// EVENT Update settings - checkboxes
	$('#settings input[name][type="checkbox"]').on('change', function() {
		if($(this).attr('checked') == 'checked'){
			localStorage.setItem($(this).attr('name'), '1');
			settings[$(this).attr('name')] = '1';
		} else {
			localStorage.removeItem($(this).attr('name'));
			settings[$(this).attr('name')] = false;
		}
	});
	
	/**
	 * Feature request. Omg, more work?
	 */
	// EVENT
	$('form', '#feature_request').on('submit', function(event) {
		$.post("./o2/widgets/feature_request.php?request=true", $(this).serialize(), function(data) {
			"use strict";
			if (!data.message) {
				data.message = 'Fail';
			}
			$('h3', '#feature_request').siblings('p').hide('slow');
			$('h3', '#feature_request').after('<p>' + data.message + '</p>');
		});
		this.reset();
		return false;
	});
	// EVENT Make f5 only reload orkfia frame when possible
	$(window).on('keyup keydown', function(event) {
		if(event.which === 116 && event.ctrlKey === false) {
			document.getElementById('orkfia').src += '';
			return false;
		}
	});
})(jQuery, YAOC);
