function ser_ea_dataMiner(manager, instanceName) {

	/// 
	/// <param name="namespace"></param>
	this.getModule = function(namespace){

		// Perform module imports
		namespace.include(ser_ea_base);
	
		// Local synonyms
		let EaNativeObjectWrapper = namespace.ser.ea.base.EaNativeObjectWrapper;
	
		// Module Classes
		class DataMinerManagerWrapper extends EaNativeObjectWrapper {
	
		    constructor() {
				super();
				this.actions = null;
				this.connections = null;
				this.dataMiners = null;
				this.scripts = null;
		    }
		}
	
		class DataMinerWrapper extends EaNativeObjectWrapper {
	
		    constructor() {
				super();
				this.connections = null;
				this.scripts = null;
		    }
		}
	
		let DataSetWrapper = EaNativeObjectWrapper.createBasicExtendedWrapperClass();
	
		let DMArrayWrapper = EaNativeObjectWrapper.createBasicExtendedWrapperClass();
	
		class DMActionWrapper extends EaNativeObjectWrapper {
	
		    constructor() {
				super();
				this.dataMiners = null;
		    }
		}
	
		class DMScriptWrapper extends EaNativeObjectWrapper {
	
		    constructor() {
				super();
				this.actions = null;
		    }
		}
	
		let DMConnectionWrapper = EaNativeObjectWrapper.createBasicExtendedWrapperClass();
	
		class Factory {
		
			constructor() {
			}
		
			newDataMinerManagerWrapper(eaDataMinerManager) {
	
				var self = this;
			
				var actionsCollectionWrapper = this.baseFactory.newCollectionWrapper(
					eaDataMinerManager.Actions,
					dma => { return self.newDMActionWrapper(dma);}
				);
				var connectionsCollectionWrapper = this.baseFactory.newCollectionWrapper(
					eaDataMinerManager.Connections,
					dmc => { return self.newDMConnectionWrapper(dmc);}
				);
				var dataMinersCollectionWrapper = this.baseFactory.newCollectionWrapper(
					eaDataMinerManager.DataMiners,
					dmm => { return self.newDataMinerWrapper(dmm);}
				);
				var scriptsCollectionWrapper = this.baseFactory.newCollectionWrapper(
					eaDataMinerManager.Scripts,
					dms => { return self.newDMScriptWrapper(dms);}
				);
			
				var wrapper = new DataMinerManagerWrapper();
				wrapper.actions = actionsCollectionWrapper;
				wrapper.connections = connectionsCollectionWrapper;
				wrapper.dataMiners = dataMinersCollectionWrapper;
				wrapper.scripts = scriptsCollectionWrapper;
				wrapper.wrappedObject = eaDataMinerManager;
				return wrapper;
			}
		
			newDataMinerWrapper(eaDataMiner) {
	
				var self = this;
			
				var connectionsCollectionWrapper = this.baseFactory.newCollectionWrapper(
					eaDataMiner.Connections,
					dmc => { return self.newDMConnectionWrapper(dmc);}
				);
				var scriptsCollectionWrapper = this.baseFactory.newCollectionWrapper(
					eaDataMiner.Scripts,
					dms => { return self.newDMScriptWrapper(dms);}
				);
			
				var wrapper = new DataMinerWrapper();
				wrapper.actions = actionsCollectionWrapper;
				wrapper.connections = connectionsCollectionWrapper;
				wrapper.dataMiners = dataMinersCollectionWrapper;
				wrapper.scripts = scriptsCollectionWrapper;
				wrapper.wrappedObject = eaDataMiner;
				return wrapper;
			}
		
			newDMActionWrapper(eaDMAction) {
	
				var self = this;
			
				var dataMinersCollectionWrapper = this.baseFactory.newCollectionWrapper(
					eaDMAction.DataMiners,
					dmm => { return self.newDataMinerWrapper(dmm);}
				);
			
				var wrapper = new DataMinerManagerWrapper();
				wrapper.dataMiners = dataMinersCollectionWrapper;
				wrapper.wrappedObject = eaDMAction;
				return wrapper;
			}
		
			newDMScriptWrapper(eaDMScript) {
	
				var self = this;
			
				var actionsCollectionWrapper = this.baseFactory.newCollectionWrapper(
					eaDMScript.Actions,
					dma => { return self.newDMActionWrapper(dma);}
				);
			
				var wrapper = new DataMinerManagerWrapper();
				wrapper.actions = actionsCollectionWrapper;
				wrapper.wrappedObject = eaDMScript;
				return wrapper;
			}
		}
		EaNativeObjectWrapper.addBasicExtendedWrapperFactoryMethods(Factory, [
			{ factoryMethod: 'newDataSetWrapper', wrapperClass: DataSetWrapper}, 
			{ factoryMethod: 'newDMArrayWrapper', wrapperClass: DMArrayWrapper}, 
			{ factoryMethod: 'newDMConnectionWrapper', wrapperClass: DMConnectionWrapper}
		]);
	
	
		// Module Export
		var module = {};
		module.Factory = Factory;
		namespace.registerModule('ser.ea.dataMiner', module);
		return module
	
	};

}//end ser_ea_dataMiner

