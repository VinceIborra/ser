function ser_ea_schemaComposer(manager, instanceName) {

	/// 
	/// <param name="namespace"></param>
	this.getModule = function(namespace){

		// Perform module imports
		namespace.include(ser_ea_base);
	
		// Local synonyms
		let EaNativeObjectWrapper = namespace.ser.ea.base.EaNativeObjectWrapper;
	
		// Module Classes
		let SchemaPropertyWrapper = EaNativeObjectWrapper.createBasicExtendedWrapperClass();
		let SchemaProfileWrapper = EaNativeObjectWrapper.createBasicExtendedWrapperClass();
		let SchemaComposerWrapper = EaNativeObjectWrapper.createBasicExtendedWrapperClass();
		let ModelTypeEnumWrapper = EaNativeObjectWrapper.createBasicExtendedWrapperClass();
		let ModeltypeWrapper = EaNativeObjectWrapper.createBasicExtendedWrapperClass();
		let SchemaTypeEnumWrapper = EaNativeObjectWrapper.createBasicExtendedWrapperClass();
		let SchemaTypeWrapper = EaNativeObjectWrapper.createBasicExtendedWrapperClass();
		let SchemaPropEnumWrapper = EaNativeObjectWrapper.createBasicExtendedWrapperClass();
		let SearchTypeWrapper = EaNativeObjectWrapper.createBasicExtendedWrapperClass();
		let SchemaNamespaceWrapper = EaNativeObjectWrapper.createBasicExtendedWrapperClass();
		let SchemaNamespaceEnumWrapper = EaNativeObjectWrapper.createBasicExtendedWrapperClass();
	
		class Factory {
		
			constructor() {
			}
		}
		EaNativeObjectWrapper.addBasicExtendedWrapperFactoryMethods(Factory, [
			{ factoryMethod: 'newSchemaPropertyWrapper', wrapperClass: SchemaPropertyWrapper}, 
			{ factoryMethod: 'newSchemaProfileWrapper', wrapperClass: SchemaProfileWrapper}, 
			{ factoryMethod: 'newSchemaComposerWrapper', wrapperClass: SchemaProfileWrapper}, 
			{ factoryMethod: 'newModelTypeEnumWrapper', wrapperClass: ModelTypeEnumWrapper}, 
			{ factoryMethod: 'newModeltypeWrapper', wrapperClass: ModeltypeWrapper}, 
			{ factoryMethod: 'newSchemaTypeEnumWrapper', wrapperClass: SchemaTypeEnumWrapper}, 
			{ factoryMethod: 'newSchemaTypeWrapper', wrapperClass: SchemaTypeWrapper}, 
			{ factoryMethod: 'newSchemaPropEnumWrapper', wrapperClass: SchemaPropEnumWrapper}, 
			{ factoryMethod: 'newSearchTypeWrapper', wrapperClass: SearchTypeWrapper}, 
			{ factoryMethod: 'newSchemaNamespaceWrapper', wrapperClass: SchemaNamespaceWrapper}, 
			{ factoryMethod: 'newSchemaNamespaceEnumWrapper', wrapperClass: SchemaNamespaceEnumWrapper}
		]);
	
		// Module Export
		var module = {};
		module.Factory = Factory;
		namespace.registerModule('ser.ea.schemaCommposer', module);
		return module;
	};

}//end ser_ea_schemaComposer

