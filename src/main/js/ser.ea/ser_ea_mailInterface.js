function ser_ea_mailInterface(manager, instanceName) {

	/// 
	/// <param name="namespace"></param>
	this.getModule = function(namespace){

		// Perform module imports
		namespace.include(ser_ea_base);
	
		// Local synonyms
		let EaNativeObjectWrapper = namespace.ser.ea.base.EaNativeObjectWrapper;
	
		// Module Classes
		let MailInterfaceWrapper = EaNativeObjectWrapper.createBasicExtendedWrapperClass();
	
		class Factory {
		
			constructor() {
			}
		}
		EaNativeObjectWrapper.addBasicExtendedWrapperFactoryMethods(Factory, [
			{ factoryMethod: 'newMailInterfaceWrapper', wrapperClass: MailInterfaceWrapper}, 
		]);
	
	
		// Module Export
		var module = {};
		module.Factory = Factory;
		namespace.registerModule('ser.ea.mailInterface', module);
		return module
	
	};

}//end ser_ea_mailInterface

