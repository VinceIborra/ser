function ser_ea_typeInfoProperties(manager, instanceName) {

	/// 
	/// <param name="namespace"></param>
	this.getModule = function(namespace){

		// Perform module imports
		namespace.include(ser_ea_base);
	
		// Local synonyms
		let EaNativeObjectWrapper = namespace.ser.ea.base.EaNativeObjectWrapper;
	
		// Module Classes
		let TypeInfoPropertiesWrapper = EaNativeObjectWrapper.createBasicExtendedWrapperClass();
		let TypeInfoPropertyWrapper = EaNativeObjectWrapper.createBasicExtendedWrapperClass();
	
		class Factory {
		
			constructor() {
			}
		}
		EaNativeObjectWrapper.addBasicExtendedWrapperFactoryMethods(Factory, [
			{ factoryMethod: 'newTypeInfoPropertiesWrapper', wrapperClass: TypeInfoPropertiesWrapper}, 
			{ factoryMethod: 'newTypeInfoPropertyWrapper', wrapperClass: TypeInfoPropertyWrapper}
		]);
	
	
		// Module Export
		var module = {};
		module.Factory = Factory;
		namespace.registerModule('ser.ea.typeInfoProperties', module);
		return module
	
	};

}//end ser_ea_typeInfoProperties

