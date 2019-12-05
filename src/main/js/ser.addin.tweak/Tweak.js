function Tweak(manager, instanceName) {

	this.isBootstrapped = false;

	this.initialise = function(){

		// No need to do anything else, if we've already been here
		if (this.isBootstrapped) {
			return;
		}
	
		var ADDIN_NAME = 'Tweak';
	
		// Initialise ser context
		(new ser()).bootstrap({
			debugOutputTab: ADDIN_NAME
		});
	
		// Imports
		namespace.include(ser_ea_context);
	
		this.isBootstrapped = true;
	
	};

}//end Tweak

