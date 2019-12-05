function ser_ea_searchWindow(manager, instanceName) {

	/// 
	/// <param name="namespace"></param>
	this.getModule = function(namespace){

		// Perform module imports
		namespace.include(ser_ea_base);
	
		// Local synonyms
		let EaNativeObjectWrapper = namespace.ser.ea.base.EaNativeObjectWrapper;
		let ObjectType = ser.ea.constants.ObjectType;
	
		// Module Classes
		class EAContextWrapper extends EaNativeObjectWrapper {
		
		    constructor() {
				super();
				this.toStringProperties = this.toStringProperties.concat([
					'alias', 'baseType', 'contextType', 'elementGUID', 'elementID',
				    'locked', 'metaType', 'name', 'objectType'
				]);
				this.repository = null;
		    }
	
			get contextType() {
				return ObjectType.fromCode(this.wrappedObject.ContextType);
			}
		
			get item() {
				switch(this.proxy.contextType.code) {
					case ObjectType.Attribute.code:
						return this.repository.getAttribute(this.proxy.elementGUID);
						break;
				
					case ObjectType.Connector.code:
						return this.repository.getConnector(this.proxy.elementGUID);
						break;
	
		            case ObjectType.Diagram.code: // But doesn't fall through here
						return this.repository.getDiagram(this.proxy.elementGUID);
						break;
	
					case ObjectType.Element.code:
						return this.repository.getElement(this.proxy.elementGUID);
						break;
	
					case ObjectType.Method.code:
						return this.repository.getMethod(this.proxy.elementGUID);
						break;
	
					case ObjectType.None.code:
						switch(this.proxy.baseType) {
							case 'Diagram':
								return this.repository.getDiagram(this.proxy.elementGUID);
								break;
							default:
								throw 'Do not know how to create a wrapper for a ' + this.proxy.baseType + ' item.';
						}
						break;
	
					default:
						throw 'Do not know how to create a wrapper for a ' + this.proxy.contextType.label + ' item.';
						break;
				}
			}
		
		//	toString() {
		//		return '{\n' +
		//		    'alias: ' + this.proxy.alias + ',\n' +
		//		    'baseType: ' + this.proxy.baseType  + ',\n' +
		//		    'contextType: ' + this.proxy.contextType.label + ',\n' +
		//			'elementGUID: ' + this.proxy.elementGUID + ',\n' +
		//			'elementID: ' + this.proxy.elementID + ',\n' +
		//			'locked: ' + this.proxy.locked + ',\n' +
		//			'metaType: ' + this.proxy.metaType + ',\n' +
		//			'name: ' + this.proxy.name + ',\n' +
		//			'objectType: ' + this.proxy.objectType.label + ',\n' +
		//		'}';
		//	}
		}
	
		class EASelectionWrapper extends EaNativeObjectWrapper {
	
		    constructor() {
				super();
				this.elementSet = null;
				this.list = null;
				//this.items = null;
		    }
		
			get items() {
				return this.proxy.list.select(eac => eac.item);
			}
		}
	
		let SearchWindowWrapper = EaNativeObjectWrapper.createBasicExtendedWrapperClass();
	
		class Factory {
		
			constructor() {
				this.baseFactory = null;
				this.elementFactory = null;
				this.repository = null;
			}
		
			newEAContextWrapper(eaEAContext) {
	
				var wrapper = new EAContextWrapper();
				wrapper.proxy = wrapper;
				wrapper.repository = this.repository;
				wrapper.wrappedObject = eaEAContext;
				return wrapper;
			}
		
			newEASelectionWrapper(eaEASelection) {
	
				var self = this;
			
				var elementSetCollectionWrapper = this.baseFactory.newCollectionWrapper(
					eaEASelection.ElementSet,
					elm => { return self.elementFactory.newElementWrapper(elm);}
				);
				var listCollectionWrapper = this.baseFactory.newCollectionWrapper(
					eaEASelection.List,
					eac => { return self.newEAContextWrapper(eac);},
					eac => eac.ElementGUID,
					null
				);
		//		var itemsCollectionWrapper = this.baseFactory.newCollectionWrapper(
		//			eaEASelection.List,
		//			eac => { self.newEAContextWrapper(eac).item	},
		//			eac => eac.ElementGUID,
		//			null
		//		);
			
				var wrapper = new EASelectionWrapper();
				wrapper.proxy = wrapper;
				wrapper.elementSet = elementSetCollectionWrapper;
				wrapper.list = listCollectionWrapper;
		//		wrapper.items = itemsCollectionWrapper;
				wrapper.wrappedObject = eaEASelection;
				return wrapper;
			}
		}
		EaNativeObjectWrapper.addBasicExtendedWrapperFactoryMethods(Factory, [
			{ factoryMethod: 'newSearchWindowWrapper', wrapperClass: SearchWindowWrapper}
		]);
	
	
		// Module Export
		var module = {};
		module.EASelectionWrapper = EASelectionWrapper;
		module.Factory = Factory;
		namespace.registerModule('ser.ea.searchWindow', module);
		return module
	
	};

}//end ser_ea_searchWindow

