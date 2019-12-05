function ser_ea_documentGeneratorInterface(manager, instanceName) {

	/// 
	/// <param name="namespace"></param>
	this.getModule = function(namespace){

		// Perform module imports
		namespace.include(ser_ea_base);
	
		// Local synonyms
		let EaNativeObjectWrapper = namespace.ser.ea.base.EaNativeObjectWrapper;
	
		// Module Classes
		let DocumentGeneratorWrapper = EaNativeObjectWrapper.createBasicExtendedWrapperClass();
	
		class Factory {
		
			constructor() {
			}
		}
		EaNativeObjectWrapper.addBasicExtendedWrapperFactoryMethods(Factory, [
			{ factoryMethod: 'newDocumentGenerator', wrapperClass: DocumentGeneratorWrapper}, 
		]);
	
	
		// Module Export
		var module = {};
		module.Factory = Factory;
		namespace.registerModule('ser.ea.documentGeneratorInterface', module);
		return module
	
	};

}//end ser_ea_documentGeneratorInterface

