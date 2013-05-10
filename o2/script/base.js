/**
 * @author René Geuze
 * YAOC is our only name space. It first only contains a helper function to define name spaces
 * Usage as: YAOC.namespace('AttackCalculator.Offender');
 *           YAOC.AttackCalculator.Offender.race = 'Uruk Hai';
 */
var YAOC = {
	namespace: function(ns) {
		var parts = ns.split('.'),
			object = this,
			i, len;
		for (i=0, len=parts.length; i < len; i++) {
			if (!object[parts[i]]) {
				object[parts[i]] = {};
			}
			object = object[parts[i]];
		}
		return object;
	}
};

/*
 * Keep IE from dying on console messages 
 */
if (typeof window.console === 'undefined') {
	window.console = {
		info: function(s){
			
		},
		log: function(s){
			
		}
	}
}