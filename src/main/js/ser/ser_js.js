function ser_js(manager, instanceName) {

	this.getModule = function(){

		// Declare namespace
		const NAMESPACE = 'ser.js';
	
		String.prototype.isCapitalized = function() {
		
			var firstChar = this.charAt(0);
			if (firstChar == firstChar.toUpperCase()) {
				return true;
			}
			return false;
		}
	
		String.prototype.capitalize = function() {
			return this.charAt(0).toUpperCase() + this.slice(1);
		}
	
		Array.prototype.equals = function(other) {
		
			// Obviously different if diffferent lengths
			if (other.length != this.length) {
				return false;
			}
		
			// Check every element
			for (var idx=0; idx<this.length; idx++) {
			
				// Special handling for objects
				if ((typeof other[idx]) == 'object'
				&&  'equals' in other[idx]
				&& !other[idx].equals(this[idx])) {
					return false;
				}
			
				// Otherwise test scalar values
				if (other[idx] != this[idx]) {
					return false;
				}
			}
		
			// Gotten this far -> must be equal
			return true;
		}
	
		Array.prototype.contains = function(item) {
	
			var containsObject = false;
		
			switch (typeof item) {
			
				// For value types - test the value
				case 'boolean':
				case 'number':
				case 'bigint':
				case 'string':
					for (var idx=0; idx<this.length && !containsObject; idx++) {
						var value = this[idx];
						if (item == value) {
							containsObject = true;
						}
					}
					break;
			
				// For objects - can only check if there is an 'equals' method on the object
				case 'object':
					if ('equals' in item && typeof item.equals == 'function') {
						for (var idx=0; idx<this.length && !containsObject; idx++) {
							var obj = this[idx];
							if (item.equals(obj)) {
								containsObject = true;
							}
						}
					}
					break;
			
				case 'symbol':
				case 'undefined':
				case 'function':
				default:
					throw 'Under construction';
					break;
			}
		
			return containsObject;
		}
	
		Object.defineProperty(Object.prototype, 'className', {
			configurable: true,
		    get: function() {
				var matches = /^class\s+(\w+)\b[\s+extends].*/.exec(this.constructor.toString());
				if (matches == null) {
					return 'unknown';
				}
				return matches[1];
		    }
		});
	
		//}
		
		// Module Export
		var module = {};
		namespace.registerModule('ser.js', module);
		return module
	
	};

}//end ser_js

