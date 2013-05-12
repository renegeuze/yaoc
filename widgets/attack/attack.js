function info(){
	this.offRace = "unknown";
	this.defRace = "unknown";
	this.maxWeaps = 0.25;
	this.maxWalls = 0.25;
}
info = new info();
function calc(){
	var i = 0;
	while(i < document.getElementsByTagName("input").length){
		if(document.getElementsByTagName("input")[i].value.match(/[^0-9]+/,"") || document.getElementsByTagName("input")[i].value.match(/^0/)){
			document.getElementsByTagName("input")[i].value = document.getElementsByTagName("input")[i].value.replace(/[^0-9]+/,"").replace(/^0+([0-9]+)/,"$1");
		}
		if(!document.getElementsByTagName("input")[i].value) document.getElementsByTagName("input")[i].value = 0;
		i++;
	}
	var attack = document.getElementById('attacktype').value;
	// Off is for attackers and def is for defenders.
	// The attacker
	var offTable = document.getElementById('attacker');
	var basicOff = getElementsByClass('off',offTable)[0].innerHTML * getElementsByClass('amount',offTable)[0].value;
	var offOff = getElementsByClass('off',offTable)[1].innerHTML * getElementsByClass('amount',offTable)[1].value;
	var defOff = getElementsByClass('off',offTable)[2].innerHTML * getElementsByClass('amount',offTable)[2].value;
	var eliteOff = getElementsByClass('off',offTable)[3].innerHTML  * getElementsByClass('amount',offTable)[3].value;
	var thieveOff = getElementsByClass('off',offTable)[4].innerHTML * getElementsByClass('amount',offTable)[4].value;
	// And now the defender
	var defTable = document.getElementById('defender');
	var basicDef = getElementsByClass('def',defTable)[0].innerHTML * getElementsByClass('amount',defTable)[0].value;
	var offDef = getElementsByClass('def',defTable)[1].innerHTML * getElementsByClass('amount',defTable)[1].value;
	var defDef = getElementsByClass('def',defTable)[2].innerHTML * getElementsByClass('amount',defTable)[2].value;
	var eliteDef = getElementsByClass('def',defTable)[3].innerHTML * getElementsByClass('amount',defTable)[3].value;
	var thieveDef = getElementsByClass('def',defTable)[4].innerHTML * getElementsByClass('amount',defTable)[4].value;

	// The raws
	var rawOff = basicOff + offOff + defOff + eliteOff + thieveOff;
	var rawDef = basicDef + offDef + defDef + eliteDef + thieveDef;

	// Puttin the raws up for display
	document.getElementById('rawOff').innerHTML = rawOff;
	document.getElementById('rawDef').innerHTML = rawDef;

	// Offense bonuses
	var offBonus = 0;
	if(document.getElementById('cb').checked){
		offBonus += parseInt(getElementsByClass('cb',offTable)[0].innerHTML)/100;
	}
	if(document.getElementById('mort').checked){
		offBonus += parseInt(getElementsByClass('mort',offTable)[0].innerHTML)/100;
	}
	if(document.getElementById('pest').checked){
		offBonus += parseInt(getElementsByClass('pest',offTable)[0].innerHTML)/100;
	}
	if(document.getElementById('general').checked){
		offBonus += parseInt(getElementsByClass('general',offTable)[0].innerHTML)/100;
	}
	
	if(info.offRace == "High Elf") {
		offBonus += parseInt(getElementsByClass('fame',offTable)[0].value)/100000;
	}
	
	if(parseInt(getElementsByClass('weaponries',offTable)[0].value) > 1 && parseInt(getElementsByClass('acres',offTable)[0].value) > 100){
		var weapsBonus = parseInt(getElementsByClass('weaponries',offTable)[0].value) / parseInt(getElementsByClass('acres',offTable)[0].value);
		weapsBonus = Math.min(weapsBonus, info.maxWeaps);
		var combatBonus = parseInt(getElementsByClass('combat',offTable)[0].value)/100;
        combatBonus = Math.min(combatBonus, 0.25);
		offBonus += weapsBonus*(combatBonus*2+1);
	}

	// Defense bonuses
	var defBonus = 0;
	if(document.getElementById('dh').checked){
		defBonus += parseInt(getElementsByClass('dh',defTable)[0].innerHTML)/100;
	}
	if(document.getElementById('df').checked){
		defBonus += parseInt(getElementsByClass('df',defTable)[0].innerHTML)/100;
	}
	if(parseInt(getElementsByClass('walls',defTable)[0].value) > 1 && parseInt(getElementsByClass('acres',defTable)[0].value) > 100){
		var wallsBonus = parseInt(getElementsByClass('walls',defTable)[0].value) / parseInt(getElementsByClass('acres',defTable)[0].value);
		wallsBonus = Math.min(wallsBonus, info.maxWalls);
		var combatBonus = parseInt(getElementsByClass('combat',defTable)[0].value)/100;
		combatBonus = Math.min(combatBonus, 0.25);
		defBonus += wallsBonus*(combatBonus*2+1);
	}
	if(attack == "raid"){
		defBonus += 0.15;
	}

	// The mods
	var modOff = Math.floor(rawOff*(offBonus+1));
	var modDef = Math.ceil(rawDef*(defBonus+1));
	
	// Putting the mods up for display
	document.getElementById('modOff').innerHTML = modOff;
	document.getElementById('modDef').innerHTML = modDef;

	// Show if the battle will be won
	document.getElementById('percentage').innerHTML = Math.round((modOff+0.0000001)/modDef*100);
	var win = false;
	if(modOff>modDef) win = true;
	else if((attack == "hnr" || attack == "raze") && modOff*2 > modDef) win = true;
	if(win) {
		document.getElementById('winner').innerHTML = "<span class='win'>Win</span>";
	} else {
		document.getElementById('winner').innerHTML = "<span class='lose'>Lose</span>";
	}

	// Land gain calculations // Even shows when losing
	var offLand = parseInt(getElementsByClass('acres',offTable)[0].value);
	var defLand = parseInt(getElementsByClass('acres',defTable)[0].value);
	if(offLand == 0 || defLand == 0) return false;
	var landGain = 0.0;
	var modifier = 0;

	// Find the type of attack
	if(attack == "standard"){
		modifier = Math.pow((defLand / offLand ), 2) + (defLand / (offLand * 3));
		if(modifier > 1) modifier = 1;
		modifier *= 0.115;

		// Size optimalizations
		if (modifier * defLand > offLand * 1.3 * modifier) modifier *= offLand * 1.3 / defLand;
		if (defLand > offLand * 3) modifier /= 2;

		// Size penalties
		var penalty = 0;
		if (defLand / offLand < 0.8 && defLand < 1500){
			penalty = defLand / offLand;
			penalty = (0.8 - penalty) / 10;
			modifier -= (5 * penalty);
		}else if (defLand / offLand < 0.8 && defLand > 1499){
			penalty = defLand / offLand;
			penalty = (0.85 - penalty) / 10;
			modifier -= (5 * penalty);
		}
		// War effects
		if(document.getElementById('war').value == "attacker"){
			modifier *= 1.2;
		}else if(document.getElementById('war').value == "third"){
			modifier *= 0.95;
		}
		
		//Racial
		// Added: 1 fame gives a 0.001% bonus to offence and a 0.002% bonus to land gains and damage done on attacks
		if(this.offRace == "High Elf"){
			modifier *= (1+ parseInt(getElementsByClass('fame',offTable)[0].value) * 0.00002);
		}
		
		// Both Generals
		if(document.getElementById('general').checked){
			modifier *= 1.25;
		}

		// Minimum
		if (modifier < 0.01) modifier = 0.01;
		
		// Actual gaining
		landGain = modifier * (defLand - parseInt(getElementsByClass('barren',defTable)[0].value));
	} else if(attack == "barren"){
		modifier = Math.pow((defLand / offLand ), 2) + (defLand / (offLand * 3));
		if(modifier > 1) modifier = 1;
		modifier *= 0.135;

		// Gain
		landGain = defLand * modifier;

		// Check for max acres that can be grabbed
		if (landGain <= 0) {
			landGain = 0;
		} else if (landGain > parseInt(getElementsByClass('barren',defTable)[0].value)){
			landGain = parseInt(getElementsByClass('barren',defTable)[0].value);
		}

		// Size penalties
		if (defLand / offLand < 0.75 || defLand / offLand > 3){
			landGain /= 2;
			if (defLand / offLand < 0.5 || defLand / offLand > 5){
				landGain /= 2;
			}
		}
		landGain = Math.round(landGain);
	} else if(attack == "commandeer"){
		modifier = Math.pow((defLand / offLand ), 2) + (defLand / (offLand * 3));
		if(modifier > 1) modifier = 1;
		modifier *= 0.135;

		// Gain
		landGain = defLand * modifier;

		// Minimum based on land
		if(landGain < defLand * 0.1) landGain = defLand * 0.1;

		// Check for max acres that can be grabbed
		if (landGain <= 0) {
			landGain = 0;
		} else if (landGain > parseInt(getElementsByClass('incoming',defTable)[0].value)){
			landGain = parseInt(getElementsByClass('incoming',defTable)[0].value);
		}

		// Size penalties
		if (defLand / offLand < 0.75 || defLand / offLand > 3){
			landGain /= 2;
			if (defLand / offLand < 0.5 || defLand / offLand > 5){
				landGain /= 2;
			}
		}
		landGain = Math.round(landGain);
	}
	// HE Land gain
	if (info.offRace == "High Elf") {
	    landGain *= (1 + (parseInt(getElementsByClass('fame',offTable)[0].value) * 0.00002));
	}
	document.getElementById('gain').innerHTML = Math.round(landGain);// + " (" + Math.round(defLand / offLand * 100) + ")";
	document.getElementById('explored').innerHTML = Math.round(landGain*0.35);
	document.getElementById('total').innerHTML = Math.round(landGain*0.35)+Math.round(landGain);
}
function parsefield(side, parser) {
	YAOC.namespace('Attack');
	var table = document.getElementById(side),
		data = parser.value,
		race = 'unknown',
		i, regexMilitary, lines, name, regexConstruction, regexScience;
	if(!data) return false;
	
	
	// Military regex
	regexMilitary = new RegExp(/(\b[a-z ]*) \(([0-9]+)\/([0-9]+)\)[ \s\t]*([0-9,]+)/gim);
	i = 0;
	while(lines = regexMilitary.exec(data)){
		if(i>4) break;
		name = lines[1];
		getElementsByClass('name',table)[i].innerHTML = name;
		getElementsByClass('off',table)[i].innerHTML = lines[2];
		getElementsByClass('def',table)[i].innerHTML = lines[3];
		getElementsByClass('amount',table)[i].value = lines[4].replace(",","");

		// For where race matters(just work with some unique unit names)
		if (name === "Hammer Smashers") {
			race = "Dwarf";
			
		} else if (name === "Longbowmen") {
			race = "High Elf";
		}
		i++;
	}
	// Alter settings based on race
	if(side === "attacker") {
		info.offRace = race;
		if (race === 'Dwarf') {
			info.maxWeaps = 0.3;
		}
	} else {
		info.defRace = race;
		if (race === 'Dwarf') {
			info.maxWalls = 0.3;
		}
	}

	// Construction Calculations - Now includes Incoming Barren land.
	// Calculate incoming barren acres by adding 'In 1' through 'In 4'
	regexConstruction = YAOC.namespace('Construction').regex;
	while(lines = regexConstruction.exec(data)){
		if(lines[0].match("Barren")){
			var barren = lines[2].replace(",","");
			if(getElementsByClass('barren',table).length) {
				getElementsByClass('barren',table)[0].value=barren;
			}

			// Calculate Incoming Barren land for defender only.
			if(side=="defender"){
				var progress = lines[4].split(/[^0-9]+/);
				var incoming = 0.0;
				for(var j=0;j<progress.length;j++){
					if(!isNaN(parseInt(progress[j].replace(',','')))){
						incoming += parseInt(progress[j].replace(',',''));
					}
				}
				if(getElementsByClass('incoming',table).length) {
					getElementsByClass('incoming',table)[0].value=incoming;
				}
			}
		}
		else if(lines[0].match("Walls")){
			var walls = lines[2].replace(",","");
			if(getElementsByClass('walls',table).length)
				getElementsByClass('walls',table)[0].value=walls;
		}
		else if(lines[0].match("Weaponries")){
			var weaponries = lines[2].replace(",","");
			if(getElementsByClass('weaponries',table).length)
				getElementsByClass('weaponries',table)[0].value=weaponries;
		}
		else if(lines[0].match("Constructed")){
			var constructed = lines[2].replace(",","");
			if(getElementsByClass('acres',table).length)
				getElementsByClass('acres',table)[0].value=parseInt(constructed)+parseInt(barren); // Constructed + Barren = Total Acres :D
		}
	}
	
	// Science calculations
	regexScience = new RegExp(/^(Combat)([\s\t]+)([0-9]+)([\s\t]+)%/gim);
	while(lines = regexScience.exec(data))
	{
		if(lines[1].match("Combat"))
		{
			if(getElementsByClass('combat',table).length) 
			{
				getElementsByClass('combat',table)[0].value = lines[3];
			}
		}
	}

	// Finishing this
	parser.value="";
	calc();
	return true;
}
function getElementsByClass(searchClass,node) {
	var found = [],
		els;
	if (!node) {
		node = document;
	}
	if(typeof document.getElementsByClassName !== 'undefined') {
		return node.getElementsByClassName(searchClass);
	}
	searchClass = ' ' + searchClass + ' ';
	els = node.getElementsByTagName('*');
	for (i in els) {
		if ((' ' + els[i].className + ' ').indexOf(searchClass) > -1) {
			found.push(els[i]);
		}
	}
	return found;
}