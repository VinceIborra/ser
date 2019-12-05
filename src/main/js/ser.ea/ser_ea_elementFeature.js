function ser_ea_elementFeature(manager, instanceName) {

	/// 
	/// <param name="namespace"></param>
	this.getModule = function(namespace){

		// Perform module imports
		namespace.include(ser_ea_base);
	
		// Local synonyms
		let EaNativeObjectWrapper = namespace.ser.ea.base.EaNativeObjectWrapper;
	
		// Module Classes
		class AttributeWrapper extends EaNativeObjectWrapper {
	
		    constructor() {
				super();
				this.constraints = null;
				this.taggedValues = null;
				this.taggedValuesEx = null;
				this.repository = null;
				this.proxy = this;
		    }
	
			get parent() {
				return this.repository.getElement(this.proxy.parentID);
			}
		
			connectTo(item, attributes) {
			
				// Sort out this side of the StyleEx details
				if (!('styleEx' in attributes)) {
					attributes.styleEx = '';
				}
				attributes.styleEx += 'LFSP=' + this.guid + 'L;';
			
				// And then use the enclosing element to perform the rest of the connect to operation
				return this.parent.connectTo(item, attributes);		
			}
		}
	
		let AttributeConstraintWrapper = EaNativeObjectWrapper.createBasicExtendedWrapperClass();
	
		let AttributeTagWrapper = EaNativeObjectWrapper.createBasicExtendedWrapperClass();
	
		let CustomPropertyWrapper = EaNativeObjectWrapper.createBasicExtendedWrapperClass();
	
		class MethodWrapper extends EaNativeObjectWrapper {
	
		    constructor() {
				super();
				this.parameters = null;
				this.postConditions = null;
				this.preConditions = null;
				this.taggedValues = null;
				this.repository = null;
		    }
		
			get parent() {
				return this.repository.getElement(this.proxy.parentID);
			}
		}
	
		let MethodConstraintWrapper = EaNativeObjectWrapper.createBasicExtendedWrapperClass();
	
		let MethodTagWrapper = EaNativeObjectWrapper.createBasicExtendedWrapperClass();
	
		class ParameterWrapper extends EaNativeObjectWrapper {
	
		    constructor() {
				super();
				this.taggedValues = null;
		    }
		}
	
		let ParamTagWrapper = EaNativeObjectWrapper.createBasicExtendedWrapperClass();
	
		let PartitionWrapper = EaNativeObjectWrapper.createBasicExtendedWrapperClass();
	
		let PropertiesWrapper = EaNativeObjectWrapper.createBasicExtendedWrapperClass();
	
		let TemplateParameterWrapper = EaNativeObjectWrapper.createBasicExtendedWrapperClass();
	
		let TransitionWrapper = EaNativeObjectWrapper.createBasicExtendedWrapperClass();
	
		class Factory {
		
			constructor() {
				this.baseFactory = null;
				this.elementFactory = null;
				this.repository = null;
			}
		
			newAttributeWrapper(eaAttribute) {
		
				var self = this;
			
				var constraintsCollectionWrapper = this.baseFactory.newCollectionWrapper(
					eaAttribute.Constraints,
					cnt => { return self.Factory.newAttributeConstraintWrapper(cnt);}
				);
				var taggedValuesCollectionWrapper = this.baseFactory.newCollectionWrapper(
					eaAttribute.TaggedValues,
					tgv => { return self.Factory.newAttributeTagWrapper(tgv);}
				);
				var taggedValuesExCollectionWrapper = this.baseFactory.newCollectionWrapper(
					eaAttribute.TaggedValuesEx,
					tgv => { return self.elementFactory.newTaggedValueWrapper(tgv);}
				);
	
				var wrapper = new AttributeWrapper();
				wrapper.constraints = constraintsCollectionWrapper;
				wrapper.taggedValues = taggedValuesCollectionWrapper;
				wrapper.taggedValuesEx = taggedValuesExCollectionWrapper;
				wrapper.repository = this.repository;
				wrapper.proxy = wrapper;
				wrapper.wrappedObject = eaAttribute;
				return wrapper;
			}
		
			newMethodWrapper(eaMethod) {
		
				var self = this;
			
				var parametersCollectionWrapper = this.baseFactory.newCollectionWrapper(
					eaMethod.Parameters,
					prm => { return self.Factory.newParameterWrapper(prm);}
				);
				var postConditionsCollectionWrapper = this.baseFactory.newCollectionWrapper(
					eaMethod.PostConditions,
					cnt => { return self.Factory.newMethodConstraintWrapper(cnt);}
				);
				var preConditionsCollectionWrapper = this.baseFactory.newCollectionWrapper(
					eaMethod.PreConditions,
					cnt => { return self.Factory.newMethodConstraintWrapper(cnt);}
				);
				var taggedValuesCollectionWrapper = this.baseFactory.newCollectionWrapper(
					eaMethod.TaggedValues,
					tgv => { return self.Factory.newMethodTagWrapper(tgv);}
				);
	
				var wrapper = new MethodWrapper();
				wrapper.parameters = parametersCollectionWrapper;
				wrapper.postConditions = postConditionsCollectionWrapper;
				wrapper.preConditions = preConditionsCollectionWrapper;
				wrapper.taggedValues = taggedValuesCollectionWrapper;
				wrapper.repository = this.repository;
				wrapper.proxy = wrapper;
				wrapper.wrappedObject = eaMethod;
				return wrapper;
			}
	
			newParameterWrapper(eaParameter) {
		
				var self = this;
			
				var taggedValuesCollectionWrapper = this.baseFactory.newCollectionWrapper(
					eaParameter.TaggedValues,
					tgv => { return self.Factory.newParamTagWrapper(tgv);}
				);
	
				var wrapper = new MethodWrapper();
				wrapper.taggedValues = taggedValuesCollectionWrapper;
				wrapper.wrappedObject = eaParameter;
				return wrapper;
			}
		}
		EaNativeObjectWrapper.addBasicExtendedWrapperFactoryMethods(Factory, [
			{ factoryMethod: 'newAttributeConstraint', wrapperClass: AttributeConstraintWrapper}, 
			{ factoryMethod: 'newAttributeTag', wrapperClass: AttributeTagWrapper}, 
			{ factoryMethod: 'newCustomProperty', wrapperClass: CustomPropertyWrapper}, 
			{ factoryMethod: 'newMethodConstraint', wrapperClass: MethodConstraintWrapper}, 
			{ factoryMethod: 'newMethodTag', wrapperClass: MethodTagWrapper}, 
			{ factoryMethod: 'newParamTag', wrapperClass: ParamTagWrapper}, 
			{ factoryMethod: 'newPartition', wrapperClass: PartitionWrapper}, 
			{ factoryMethod: 'newProperties', wrapperClass: PropertiesWrapper}, 
			{ factoryMethod: 'newTemplateParameter', wrapperClass: TemplateParameterWrapper}, 
			{ factoryMethod: 'newTransition', wrapperClass: TransitionWrapper}
		]);
	
	
		// Module Export
		var module = {};
		module.AttributeWrapper = AttributeWrapper;
		module.MethodWrapper = MethodWrapper;
		module.Factory = Factory;
		namespace.registerModule('ser.ea.elementFeature', module);
		return module
	
	};

}//end ser_ea_elementFeature

