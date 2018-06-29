//=============================================================================
// Name: ser
//
// Auth: Vicente Iborra
//
// Desc: This file defines the top of the ser namespace.
//=============================================================================

//-----------------------------------------------------------------------------
// Desc: Definition of root object in the ser namespacing scheme.
//-----------------------------------------------------------------------------
var ser = ser || {};
(function(target) {
	
	//-----------------------------------------------------------------------------
	// Desc: Keep explicit track of the namespaces somewhere
	//-----------------------------------------------------------------------------
	target.namespaces = target.namespaces || {};
	target.namespaces.ser = ser;
		
	//-----------------------------------------------------------------------------
	// Desc: This is a helper routine meant to be used to deter
	//-----------------------------------------------------------------------------
	target.namespaceDefined = function(namespaceString) {
		if (target.namespaces[namespaceString] === undefined
		||  target.namespaces[namespaceString] == null) {
			return false;
		}
		return true;
	}

	//-------------------------------------------------------------------------
	// Desc: This routine is meant to facilitate the establishment of the
	//       namespace for a module.
	//
	// Args: namespaceString (I) A full stop delimited string describing the
	//                           namespace to be used.
	//
	// Retn: The object to be used to contain the required namespace.
	//-------------------------------------------------------------------------
	target.namespace = function (namespaceString) {
		
		// Return the right namespace if already defined
		if (target.namespaceDefined(namespaceString)) {
			return target.namespaces[namespaceString];
		}
		
		// Split namespace string into parts
		var parts = namespaceString.split('.');
		
		// Process each part of the namespace in turn
		var parent = target;
		var currentPart = '';    
		for(var i = 0, length = parts.length; i < length; i++) {
			
			// Get the next/current part
			currentPart = parts[i];
			
			// Dismiss the root if this has been specified by the user
			if (currentPart == "ser") {
				continue;
			}
			
			// Create the next part of the namespace object
			parent[currentPart] = parent[currentPart] || {};
			
			// And set this as the parent for the next part
			parent = parent[currentPart];
		}
		
		// Make sure we keep track of the namespace
		target.namespaces[namespaceString] = parent;
		
		return parent;
	}
		
	//-------------------------------------------------------------------------
	// Desc: This is a helper class meant to be used to assist in the
	//       declaration of inheritance between two classes.  Inspired by
	//       different examples on the web.
	//
	// Args: baseClass (I)   Base class being inherited from
	//       SubClass  (I/O) Class inheriting from the base class
	//
	// Retn: None
	//-------------------------------------------------------------------------
	target.extend = function (baseClass, subClass) {
		subClass.prototype = new baseClass();
		subClass.prototype.constructor = subClass;
	}

	target.debugNamespaces = function(label) {
		Session.Output("\n" + label + ":\n");
		for (var prop in ser.namespaces) {
			Session.Output("ns - " + prop);
		}
	}
	
	//=========================================================================
	// TODO: Copy to ser
	//=========================================================================
	function sleep(ms) {
		Session.Output("Sleeping...");
		var unixtime_ms = new Date().getTime();
		while(new Date().getTime() < unixtime_ms + ms) {}
		Session.Output("done.");
	}

//=============================================================================
// Extending the String object
//=============================================================================
String.prototype.camelize = function() {
	return this.split(" ").join("");
}

String.prototype.uncamelize = function() {
    return this
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/([A-Z])([a-z])/g, ' $1$2')
	.replace(/([a-z])([0-9])/g, '$1 $2')
	.replace(/([0-9])([a-z])/g, ' $1$2')
	.replace(/([A-Z])([0-9])/g, '$1 $2')
	.replace(/([0-9])([A-Z])/g, ' $1$2')
    .replace(/\ +/g, ' ')
	.replace(/^\s+|\s+$/g,'');
}

}(ser));
