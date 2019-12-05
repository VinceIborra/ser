function ser_ea_projectInterface(manager, instanceName) {

	/// 
	/// <param name="namespace"></param>
	this.getModule = function(namespace){

		// Perform module imports
		namespace.include(ser_ea_base);
	
		// Local synonyms
		let EaNativeObjectWrapper = namespace.ser.ea.base.EaNativeObjectWrapper;
	
		// Module Classes
		let ProjectWrapper = EaNativeObjectWrapper.createBasicExtendedWrapperClass();
	
		class Factory {
		
			constructor() {
			}
		}
		EaNativeObjectWrapper.addBasicExtendedWrapperFactoryMethods(Factory, [
			{ factoryMethod: 'newProjectWrapper', wrapperClass: ProjectWrapper}, 
		]);
	
	
		// Module Export
		var module = {};
		module.Factory = Factory;
		namespace.registerModule('ser.ea.projectInterface', module);
		return module
	
	};

}//end ser_ea_projectInterface

