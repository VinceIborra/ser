function ser_addin_peso_script(manager, instanceName) {

	this.repository = null;
	this.session = null;

	this.run = function(){

		dbg('Nothing to run.');
	};

	this.changeLanguageToJavaScript = function(){

		// Imports
		const ObjectType = ser.ea.constants.ObjectType;
		const PromptType = ser.ea.session.PromptType;
	
		// Let user know what is going on
		this.session.prompt('Setting GenType to JavaScript.  Please select a package for processing.', PromptType.Ok);
	
		// Get user to select a package to process
		var pkg = this.repository.invokeConstructPicker("IncludedTypes=Package");
	
		dbg('Setting GenType to JavaScript. Processing...');
	
		pkg
		.traverseDepthFirst()
		.where(itm => ObjectType.Element.equals(itm.objectType))
		.where(itm => itm.gentype != 'JavaScript')
		.forEach(itm => {
			dbg('Modifying ' + itm.name + ': ' + itm.gentype + ' -> JavaScript');
			itm.gentype = 'JavaScript';
		});
	
		dbg('Done.');
	};

}//end ser_addin_peso_script

