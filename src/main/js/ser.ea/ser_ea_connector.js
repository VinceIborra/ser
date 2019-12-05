function ser_ea_connector(manager, instanceName) {

	/// 
	/// <param name="namespace"></param>
	this.getModule = function(namespace){

		// Perform module imports
		namespace.include(ser_ea_base);
	
		// Local synonyms
		let EaNativeObjectWrapper = ser.ea.base.EaNativeObjectWrapper;
		let ConnectorType = ser.ea.constants.ConnectorType;
	
		// Module Classes
		class ConnectorWrapper extends EaNativeObjectWrapper {
	
		    constructor() {
				super();
				this.factory = null;
				this.elementFactory = null;
				this.repository = null;
				this.constraints = null;
				this.conveyedItems = null;
				this.customProperties = null;
				this.taggedValues = null;
				this.templateBindings = null;
		    }
		
			get client() {
				return this.repository.getElement(this.wrappedObject.ClientID);
			}
	
			get clientEnd() {
				return this.factory.newConnectorEndWrapper(this.wrappedObject.ClientEnd);
			}
	
			get diagram() {
				return this.repository.getDiagram(this.wrappedObject.DiagramID);
			}
		
			get supplier() {
				return this.repository.getElement(this.wrappedObject.SupplierID);
			}
	
			get supplierEnd() {
				return this.factory.newConnectorEndWrapper(this.wrappedObject.SupplierEnd);
			}
		
			get type() {
				return ConnectorType.fromCode(this.wrappedObject.Type);
			}
		}
	
		let ConnectorConstraintWrapper = EaNativeObjectWrapper.createBasicExtendedWrapperClass();
	
		class ConnectorEndWrapper extends EaNativeObjectWrapper {
	
		    constructor() {
				super();
				this.taggedValues = null;
		    }
		}
	
	
		let ConnectorTagWrapper = EaNativeObjectWrapper.createBasicExtendedWrapperClass();
	
		let RoleTagWrapper = EaNativeObjectWrapper.createBasicExtendedWrapperClass();
	
		let TemplateBindingWrapper = EaNativeObjectWrapper.createBasicExtendedWrapperClass();
	
	
	
		class AddNewHelper {
		
			verifyAndAdjustConnectorAttributes(attributes) {
			
				// Verify
				attributes.assertAttributePresent('type');
				attributes.assertAtLeastOneAttributePresent(['supplier', 'supplierID', 'supplierGUID']);
			
				// Name
				var name = attributes.name || '';
			
				// Type
				var type = attributes.type.label;
			
				// Supplier/SupplierID
				var supplier = null;
				if ('supplier' in attributes)
					supplier = attributes.supplier;
				else if ('supplierID' in attributes)
					supplier = this.repository.getElement(attributes.supplierID);
				else if ('supplierGUID' in attributes)
					supplier = this.repository.getElement(attributes.supplierGUID);
	
				// Return adjusted attributes
				return {
					attributes: attributes.adjust({
						delete: ['type', 'supplier', 'supplierID', 'supplierGUID'],
						add: [{attribute: 'supplierID', value: supplier.id}]
					}),
					name: attributes.name || '',
					type: attributes.type.label,
					postAddNewAction: () => { supplier.connectors.refresh() }
				};
			}
		}
	
		class Context {
			constructor() {
				this.factory = null;
				this.addNewHelper = null;
			}
		}
	
		class Factory {
		
			constructor() {
				this.baseFactory = null;
				this.elementFactory = null;
				this.elementFeatureFactory = null;
				this.repository = null;
			}
		
			newAddNewHelper() {
				var addNewHelper = new AddNewHelper();
				return addNewHelper;
			}
	
			newContext() {
				var ctx = new Context();
				ctx.factory = this;
				ctx.addNewHelper = ctx.factory.newAddNewHelper();
				return ctx;
			}
	
			newConnectorWrapper(eaConnector) {
		
				var self = this;
			
				var constraintsCollectionWrapper = this.baseFactory.newCollectionWrapper(
					eaConnector.Constraints,
					cnt => { return self.Factory.newConnectorConstraintWrapper(cnt);}
				);
				var conveyedItemsCollectionWrapper = this.baseFactory.newCollectionWrapper(
					eaConnector.Conveyeditems,
					elm => { return self.elementFactory.newElementWrapper(elm);}
				);
				var customPropertiesCollectionWrapper = this.baseFactory.newCollectionWrapper(
					eaConnector.CustomProperties,
					cps => { return self.elementFeatureFactory.newCustomPropertiesWrapper(cps);}
				);
				var taggedValuesCollectionWrapper = this.baseFactory.newCollectionWrapper(
					eaConnector.TaggedValues,
					tgv => { return self.newConnectorTagWrapper(tgv);}
				);
				var templateBindingsCollectionWrapper = this.baseFactory.newCollectionWrapper(
					eaConnector.TemplateBindings,
					tbd => { return self.newTemplateBindingWrapper(tbd);}
				);
	
				var wrapper = new ConnectorWrapper();
				wrapper.factory = this;
				wrapper.elementFactory = this.elementFactory;
				wrapper.repository = this.repository;
				wrapper.constraints = constraintsCollectionWrapper;
				wrapper.conveyedItems = conveyedItemsCollectionWrapper;
				wrapper.custoProperties = customPropertiesCollectionWrapper;
				wrapper.taggedValues = taggedValuesCollectionWrapper;
				wrapper.templageBindings = templateBindingsCollectionWrapper;
				wrapper.wrappedObject = eaConnector;
				return wrapper;
			}
		
			newConnectorEndWrapper(eaConnectorEnd) {
			
				if (eaConnectorEnd == null) { return null; }
		
				var self = this;
			
				var taggedValuesCollectionWrapper = this.baseFactory.newCollectionWrapper(
					eaConnectorEnd.TaggedValues,
					tgv => { return self.newRoleTagWrapper(tgv);}
				);
	
				var wrapper = new ConnectorEndWrapper();
				wrapper.taggedValues = taggedValuesCollectionWrapper;
				wrapper.wrappedObject = eaConnectorEnd;
				return wrapper;
			}
	
		}
		EaNativeObjectWrapper.addBasicExtendedWrapperFactoryMethods(Factory, [
			{ factoryMethod: 'newConnectorConstraintWrapper', wrapperClass: ConnectorConstraintWrapper},
			{ factoryMethod: 'newConnectorTagWrapper', wrapperClass: ConnectorTagWrapper},
			{ factoryMethod: 'newRoleTagWrapper', wrapperClass: RoleTagWrapper},
			{ factoryMethod: 'newTemplateBindingWrapper', wrapperClass: TemplateBindingWrapper}
		]);
	
		// Module Export
		var module = {};
		module.ConnectorWrapper = ConnectorWrapper;
		module.ConnectorEndWrapper = ConnectorEndWrapper;
		module.context = (new Factory()).newContext();
		namespace.registerModule('ser.ea.connector', module);
		return module;
	};

}//end ser_ea_connector

