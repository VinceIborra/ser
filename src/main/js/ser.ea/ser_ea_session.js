function ser_ea_session(manager, instanceName) {

	this.getModule = function(){

		// Perform module imports
		namespace.include(ser_ea_base);
	
		// Local synonyms
		let EaNativeObjectWrapper = ser.ea.base.EaNativeObjectWrapper;
	
		var PromptType = ser.base.factory.newEnumType([
			{ code: 1, label: 'Ok'},
			{ code: 2, label: 'YesNo'},
			{ code: 3, label: 'YesNoCancel'},
			{ code: 4, label: 'OkCancel'}
		]);
	
		var PromptResult = ser.base.factory.newEnumType([
			{ code: 1, label: 'Ok'},
			{ code: 2, label: 'Cancel'},
			{ code: 3, label: 'Yes'},
			{ code: 4, label: 'No'}
		]);
		
		class SessionWrapper extends EaNativeObjectWrapper {
		
		    constructor() {
				super();
		    }
		
			prompt(prompt, promptType) {
				return PromptResult.fromCode(
					this.wrappedObject.Prompt(prompt, promptType.code)
				);
			}
		}
	
		class Factory {
		
			constructor() {
			}
		}
		EaNativeObjectWrapper.addBasicExtendedWrapperFactoryMethods(Factory, [
			{ factoryMethod: 'newSessionWrapper', wrapperClass: SessionWrapper}
		]);
	
	
		// Module Export
		var module = {};
		module.PromptType = PromptType;
		module.PromptResult = PromptResult;
		module.SessionWrapper = SessionWrapper;
		module.Factory = Factory;
		namespace.registerModule('ser.ea.session', module);
		return module
	
	};

}//end ser_ea_session

