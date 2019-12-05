function ser_context(manager, instanceName) {

	this.getModule = function(){

		// Declare namespace
		const NAMESPACE = 'ser.context';
	
		// Perform module imports
		namespace.include(ser_js);
		namespace.include(ser_base);
	
		// Module Export
		var module = {};
		namespace.registerModule(NAMESPACE, module);
		return module;
	};

}//end ser_context

