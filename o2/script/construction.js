if (typeof window.YAOC.namespace('Selectors').getByClass === 'undefined') {
	window.YAOC.Selectors.getByClass = function(searchClass, node) {
		"use strict";
		var found = [],
			els, i;
		if (!node) {
			node = document;
		}
		// Find using the modern way
		if (typeof document.getElementsByClassName !== 'undefined') {
			return node.getElementsByClassName(searchClass);
		}
		// Find using the old way
		searchClass = ' ' + searchClass + ' ';
		els = node.getElementsByTagName('*');
		for (i in els) {
			if ((' ' + els[i].className + ' ').indexOf(searchClass) > -1) {
				found.push(els[i]);
			}
		}
		return found;
	};
}
(function($, YAOC) {
	"use strict";
	var getElementsByClass = YAOC.namespace('Selectors').getByClass,
		tribe = YAOC.namespace('Construction'),
		Construction = YAOC.namespace('Construction'),
		buildings = YAOC.namespace('Construction.buildings'),
		$base = $('#construction');
	
	tribe = tribe.tribedata = {
		race : "unknown",
		netTotal : 0,
		totalToBuild : 0,
		totalTarget : 0
	};
	
	/* 
	 * Containing the used regex in the parser.
	 */
	Construction.regex = new RegExp(/^([a-z]+?):?.+?([0-9,]+).+?\(([0-9]+)%\)([0-9 \s\t]+)/gim);
	
	/**
	 * @author René Geuze
	 */
	Construction.calculate = function() {
		tribe.totalTarget = 0;
		tribe.totalToBuild = 0;
		
		$(".target", $base).each(function() {
			var val = $(this).val();
			if (val.match(/[^0-9\.]+/) || val.match(/^0/)) {
				val = val.replace(/[^0-9\.]+/, "").replace(/^0+([0-9\.]+)/,"$1");
				$(this).val(val);
			}
			if (!val) {
				$(this).val(0);
			}
		});
		
		$("tbody tr", $base).each(function() {
			var target   = parseFloat($('.target', this).val().replace(/[^0-9\.]/, "")),
				current  = parseInt($('.current', this).text().replace(/[^0-9]/, ""), 10),
				incoming = parseInt($('.incoming', this).text().replace(/[^0-9]/, ""), 10),
				toBuild  = Math.round(target / 100 * tribe.netTotal - current - incoming),
				cls      = "",
				name     = $('.name', this).text();
	
			if (toBuild > 0) {
				cls = "positive";
				tribe.totalToBuild += toBuild;
			} else if (toBuild < 0) {
				cls = "negative";
			}
			$('.to_build', this).html('<b class="' + cls + '">' + toBuild + '</b>');
			tribe.totalTarget += target;
			
			buildings[name] = {
				target: target,
				current: current,
				incoming: incoming,
				toBuild: toBuild
			};
			// Localstorage setting
			localStorage.setItem(name, target);
			
		});
		
		tribe.totalTarget = Math.round(tribe.totalTarget * 100) / 100;
		$('tfoot .target', $base).text(tribe.totalTarget + '%');
		$('tfoot .to_build', $base).text(tribe.totalToBuild);
	};
	
	/**
	 * @author René Geuze
	 * @param object sourceElement Textarea or other content holding field
	 */
	Construction.parse = function(sourceElement) {
		var data = sourceElement.value,
			total_current = 0,
			total_incoming = 0,
			i = 0,
			j, len, rows, lines, current, progress, incoming, currentRow;
		if(!data) {
			return false;
		}
		
		rows = document.getElementById("construction_data").getElementsByTagName("tr");
		while (true) {
			lines = Construction.regex.exec(data);
			if (!lines) {
				break;
			}
			if (lines[0].match("Constructed")) {
				continue;
			}
			currentRow = rows[i];
			
			current = parseInt(lines[2].replace(',',''), 10);
			total_current += current;
			
			getElementsByClass('current', currentRow)[0].innerHTML = current;
			getElementsByClass('percentage', currentRow)[0].innerHTML = lines[3] + "%";
			progress = lines[4].split(/[^0-9]+/);
			incoming = 0.0;
			for (j=0, len=progress.length; j < len; j++){
				if (!isNaN(parseInt(progress[j].replace(',',''), 10))){
					incoming += parseInt(progress[j].replace(',',''), 10);
				}
			}
			total_incoming += incoming;
			getElementsByClass('incoming', currentRow)[0].innerHTML = incoming;
			i++;
		}
		
		getElementsByClass('current', document.getElementById("totals"))[0].innerHTML = total_current;
		getElementsByClass('incoming', document.getElementById("totals"))[0].innerHTML = total_incoming;
		
		tribe.total_current = total_current;
		tribe.total_incoming = total_incoming;
		tribe.netTotal = total_current + total_incoming;
		
		// Empty source element
		sourceElement.value = "";
		
		return true;
	};
	
	/**
	 * New function to parse construction data
	 * This time we only want pure data returned
	 * @author René Geuze
	 * @param string data Messy stuff
	 */
	Construction.parseData = function(data) {
		var cleanData = {
				buildings: {},
				totals: {
					current: 0,
					incoming: 0,
					percentage: 0,
					percentageStr: '0%'
				}
			},
			j, len, lines, progress, incoming,
			regex = new RegExp(/^([a-z ]+):?.+?([0-9,]+).+?\(([0-9]+)%\)([0-9 \s\t]+)/gim);
		if(!data) {
			return cleanData;
		}
		
		while (true) {
			lines = regex.exec(data);
			if (!lines) {
				break;
			}
			// Skip Constructed line
			if (lines[0].match("Constructed")) {
				continue;
			}
			
			progress = lines[4].split(/[^0-9]+/);
			incoming = 0.0;
			for (j=0, len=progress.length; j < len; j++){
				if (!isNaN(parseInt(progress[j].replace(',',''), 10))){
					incoming += parseInt(progress[j].replace(',',''), 10);
				}
			}
			
			cleanData.buildings[lines[1]] = {
				current: parseInt(lines[2].replace(',',''), 10),
				incoming: incoming,
				percentage: parseInt(lines[3], 10),
				percentageStr: lines[3] + "%"
			};
			cleanData.totals.current += cleanData.buildings[lines[1]].current;
			cleanData.totals.incoming += incoming;
			cleanData.totals.percentage += cleanData.buildings[lines[1]].percentage;
		}
		cleanData.totals.percentageStr = cleanData.totals.percentageStr + '%';
		
		return cleanData;
	};
	
	
	// Get local data
	Construction.init = (function() {
		var rows = document.getElementById("construction_data").getElementsByTagName("tr"),
			len, i, name, target;
		
		for (i=0, len=rows.length; i < len; i++) {
			name = getElementsByClass('name', rows[i])[0].innerHTML;
			target = localStorage.getItem(name);
			if (typeof buildings[name] === 'undefined') {
				buildings[name] = {};
			}
			buildings[name].target = target;
			if (target !== null) {
				getElementsByClass('target',rows[i])[0].value = target;
			}
			
		}
		Construction.calculate();
	})();
	
	// EVENT Start parse on paste
	$('textarea', $base).on('paste', function() {
		var area = this;
		// Add timeout, just how the paste event works.
		setTimeout(function() {
			Construction.parse(area);
			// Handle actual calculation
			Construction.calculate();
		}, 1);
		
	});
	
	// EVENT Update calculation
	$(".target", $base).on('change keyup', function() {
		var val = $(this).val();
		if (val.match(/[^0-9\.]+/,"") || val.match(/^0/)) {
			val = val.replace(/[^0-9\.]+/,"").replace(/^0+([0-9\.]+)/,"$1");
			$(this).val(val);
		}
		if(!val) {
			$(this).val(0);
		}
		Construction.calculate();
	});
})(window.jQuery, window.YAOC);