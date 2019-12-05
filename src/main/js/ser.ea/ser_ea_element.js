function ser_ea_element(manager, instanceName) {

	/// 
	/// <param name="namespace"></param>
	this.getModule = function(namespace){

		// Perform module imports
		namespace.include(ser_ea_constants);
		namespace.include(ser_ea_base);
	
		// Local synonyms
		let ElementType = ser.ea.constants.ElementType;
		let ObjectType = ser.ea.constants.ObjectType;
		let EaNativeObjectWrapper = ser.ea.base.EaNativeObjectWrapper;
	
		// Module Classes
		let ConstraintWrapper = EaNativeObjectWrapper.createBasicExtendedWrapperClass();
		let EffortWrapper = EaNativeObjectWrapper.createBasicExtendedWrapperClass();
	
		class ElementWrapper extends EaNativeObjectWrapper {
	
		    constructor() {
				super();
				this.toStringProperties = this.toStringProperties.concat([
					'abstract', 'actionFlags', 'alias', 'associationClassConnectorID',
					'author', 'classfierID', 'classifierID', 'classifierName',
					'classifierType', 'complexity', 'created', 'difficulty',
					'elementGUID', 'elementID', 'eventFlags', 'extensionPoints',
					'fQName', 'fQStereotype', 'genFile', 'genlinks', 'genType',
					'isActive', 'isComposite', 'isLeaf', 'isNew', 'isRoot', 'isSpec',
					'locked', 'metaType', 'miscData', 'modified', 'multiplicity',
					'name', 'notes', 'objectType', 'packageID', 'parentID',
					'persistence', 'phase', 'priority', 'propertyType',
					'propertyTypeName', 'runState', 'status', 'stereotype',
					'stereotypeEx', 'styleEx', 'subtype', 'tablespace', 'tag',
					'treePos', 'type', 'version', 'visibility'
					// attributes, attributesEx, baseClasses, compositeDiagram, connectors
				    // constraints, customProperties, diagrams, efforts, elements, embeddedElements
					// files, header1, header2, issues, methods, methodsEx, metrics, partitions
					// properties, realizes, requirements, resources, risks, scenarios, stateTransitions
					// taggedValues, taggedValuesEx, templateParameters, tests, typeInfoProperties
				]);
				this.attributes = null;
				this.attributesEx = null;
				// this.baseClasses;
				this.connectors = null;
				this.constraints = null;
				this.constraintsEx = null;
				//this.customProperties = null;
				this.diagrams = null;
				this.efforts = null;
				this.elements = null;
				this.embeddedElements = null;
				this.files = null;
				this.issues = null;
				this.methods = null;
				this.methodsEx = null;
				this.metrics = null;
				this.partitions = null;
				//this.realizes = null;
				this.requirements = null;
				this.requirementsEx = null;
				this.resources = null;
				this.risks = null;
				this.scenarios = null;
				this.stateTransitions = null;
				this.taggedValues = null;
				this.taggedValuesEx = null;
				this.templateParameters = null;
				this.tests = null;
				this.factory = null;
				this.diagramFactory = null;
				this.repository = null;
		    }
	
			get compositeDiagram() {
				return this.diagramFactory.newDiagramWrapper(this.wrappedObject.CompositeDiagram);
			}
		
			get package() {
				return this.repository.getPackage(this.wrappedObject.PackageID);
			}
		
			set package(value) {
				this.wrappedObject.PackageID = value.packageID;
			}
		
			get parent() {
				return this.repository.getElement(this.wrappedObject.ParentID);
			}
		
			set parent(value) {
				this.wrappedObject.ParentID = value.parentID;
			}
		
			get type() {
				return ElementType.fromCode(this.wrappedObject.Type);
			}
		
			set type(value) {
				this.wrappedObject.Type = value.code;
			}
		
			connectTo(item, attributes) {
	
				switch (item.objectType.code) {
				
					case ObjectType.Attribute.code:
						attributes.supplier = item.parent;
			 			if (!('styleEx' in attributes)) {
							attributes.styleEx = '';
						}
						attributes.styleEx += 'LFEP=' + item.guid + 'R;'
						break;
				
					case ObjectType.Element.code:
						attributes.supplier = item;
						break;
				}
			
				return this.connectors.addNew(attributes);
			}
		
			reload() {
				this.wrappedObject = Repository.GetElementByGuid(this.guid);
				this.connectors.eaCollection = this.wrappedObject.Connectors;
			}
	
		}
	
		let ElementGridWrapper = EaNativeObjectWrapper.createBasicExtendedWrapperClass();
		let FileWrapper = EaNativeObjectWrapper.createBasicExtendedWrapperClass();
		let IssueWrapper = EaNativeObjectWrapper.createBasicExtendedWrapperClass();
		let MetricWrapper = EaNativeObjectWrapper.createBasicExtendedWrapperClass();
		let RequirementWrapper = EaNativeObjectWrapper.createBasicExtendedWrapperClass();
		let ResourceWrapper = EaNativeObjectWrapper.createBasicExtendedWrapperClass();
		let RiskWrapper = EaNativeObjectWrapper.createBasicExtendedWrapperClass();
		let ScenarioWrapper = EaNativeObjectWrapper.createBasicExtendedWrapperClass();
		let ScenarioExtensionWrapper = EaNativeObjectWrapper.createBasicExtendedWrapperClass();
	
		class ScenarioStepWrapper extends EaNativeObjectWrapper {
	
		    constructor() {
				super();
				this.extensions = null;
				this.usesElementList
		    }
		}
	
		let TaggedValueWrapper = EaNativeObjectWrapper.createBasicExtendedWrapperClass();
		let TestWrapper = EaNativeObjectWrapper.createBasicExtendedWrapperClass();
	
		class Factory {
		
			constructor() {
				this.connectorFactory = null;
				this.connectorAddNewHelper = null;
				this.elementFeatureFactory = null;
				this.diagramFactory = null;
				this.repository = null;
			}
		
			newElementWrapper(eaElement) {
		
				var self = this;
			
				var attributesCollectionWrapper = this.baseFactory.newCollectionWrapper(
					eaElement.Attributes,
					att => { return self.elementFeatureFactory.newAttributeWrapper(att);}
				);
				var attributesExCollectionWrapper = this.baseFactory.newCollectionWrapper(
					eaElement.AttributesEx,
					att => { return self.elementFeatureFactory.newAttributeWrapper(att);}
				);
				var connectorsCollectionWrapper = this.baseFactory.newCollectionWrapper(
					eaElement.Connectors,
					ctr => { return self.connectorFactory.newConnectorWrapper(ctr)},
					cnt => { return cnt.name},
					self.connectorAddNewHelper.verifyAndAdjustConnectorAttributes
				);
				var constraintsCollectionWrapper = this.baseFactory.newCollectionWrapper(
					eaElement.Constraints,
					cnt => { return self.newConstraintWrapper(cnt);}
				);
				var constraintsExCollectionWrapper = this.baseFactory.newCollectionWrapper(
					eaElement.ConstraintsEx,
					cnt => { return self.newConstraintWrapper(cnt);}
				);
				var diagramsCollectionWrapper = this.baseFactory.newCollectionWrapper(
					eaElement.Diagrams,
					dgm => { return self.diagramFactory.newDiagramWrapper(dgm);}
				);
				var effortsCollectionWrapper = this.baseFactory.newCollectionWrapper(
					eaElement.Efforts,
					eft => { return self.newEffortWrapper(eft);}
				);
				var elementsCollectionWrapper = this.baseFactory.newCollectionWrapper(
					eaElement.Elements,
					elm => { return self.newElementWrapper(elm);}
				);
				var embeddedElementsCollectionWrapper = this.baseFactory.newCollectionWrapper(
					eaElement.EmbeddedElements,
					elm => { return self.newElementWrapper(elm);}
				);
				var filesCollectionWrapper = this.baseFactory.newCollectionWrapper(
					eaElement.Files,
					fle => { return self.newFileWrapper(fle);}
				);
				var issuesCollectionWrapper = this.baseFactory.newCollectionWrapper(
					eaElement.Issues,
					iss => { return self.newIssueWrapper(iss);}
				);
				var methodsCollectionWrapper = this.baseFactory.newCollectionWrapper(
					eaElement.Methods,
					mth => { return self.elementFeatureFactory.newMethodWrapper(mth);}
				);
				var methodsExCollectionWrapper = this.baseFactory.newCollectionWrapper(
					eaElement.MethodsEx,
					mth => { return self.elementFeatureFactory.newMethodWrapper(mth);}
				);
				var metricsCollectionWrapper = this.baseFactory.newCollectionWrapper(
					eaElement.Metrics,
					mtr => { return self.newMetricWrapper(mtr);}
				);
				var partitionsCollectionWrapper = this.baseFactory.newCollectionWrapper(
					eaElement.Partitions,
					ptn => { return self.elementFeatureFactory.newPartitionWrapper(ptn);}
				);
				var requirementsCollectionWrapper = this.baseFactory.newCollectionWrapper(
					eaElement.Requirements,
					req => { return self.newRequirementWrapper(req);}
				);
				var requirementsExCollectionWrapper = this.baseFactory.newCollectionWrapper(
					eaElement.RequirementsEx,
					req => { return self.newRequirementWrapper(req);}
				);
				var resourcesCollectionWrapper = this.baseFactory.newCollectionWrapper(
					eaElement.Resources,
					res => { return self.newResourceWrapper(res);}
				);
				var risksCollectionWrapper = this.baseFactory.newCollectionWrapper(
					eaElement.Risks,
					rsk => { return self.newRiskWrapper(rsk);}
				);
				var scenariosCollectionWrapper = this.baseFactory.newCollectionWrapper(
					eaElement.Scenarios,
					scn => { return self.newScenarioWrapper(scn);}
				);
				var stateTransitionsCollectionWrapper = this.baseFactory.newCollectionWrapper(
					eaElement.StateTransitions,
					tsn => { return self.elementFeatureFactory.newTransitionsWrapper(tsn);}
				);
				var taggedValuesCollectionWrapper = this.baseFactory.newCollectionWrapper(
					eaElement.TaggedValues,
					tgv => { return self.newTaggedValueWrapper(tgv);}
				);
				var taggedValuesExCollectionWrapper = this.baseFactory.newCollectionWrapper(
					eaElement.TaggedValuesEx,
					tgv => { return self.newTaggedValueWrapper(tgv);}
				);
				var templateParametersCollectionWrapper = this.baseFactory.newCollectionWrapper(
					eaElement.TemplateParameters,
					tpm => { return self.elementFeatureFactory.newTemplateParameterWrapper(tpm);}
				);
				var testsCollectionWrapper = this.baseFactory.newCollectionWrapper(
					eaElement.Tests,
					tst => { return self.newTestWrapper(tst);}
				);
	
				var wrapper = new ElementWrapper();
				wrapper.attributes = attributesCollectionWrapper;
				wrapper.attributesEx = attributesCollectionWrapper;
				wrapper.connectors = connectorsCollectionWrapper;
				wrapper.constraints = constraintsCollectionWrapper;
				wrapper.constraintsEx = constraintsExCollectionWrapper;
				wrapper.diagrams = diagramsCollectionWrapper;
				wrapper.efforts = effortsCollectionWrapper;
				wrapper.elements = elementsCollectionWrapper;
				wrapper.embededdedElements = embeddedElementsCollectionWrapper;
				wrapper.files = filesCollectionWrapper;
				wrapper.issues = issuesCollectionWrapper;
				wrapper.methods = methodsCollectionWrapper;
				wrapper.methodsEx = methodsExCollectionWrapper;
				wrapper.metrics = metricsCollectionWrapper;
				wrapper.partitions = partitionsCollectionWrapper;
				wrapper.requirements = requirementsCollectionWrapper;
				wrapper.requirementsEx = requirementsExCollectionWrapper;
				wrapper.resources = resourcesCollectionWrapper;
				wrapper.risks = risksCollectionWrapper;
				wrapper.scenarios = scenariosCollectionWrapper;
				wrapper.stateTransitions = stateTransitionsCollectionWrapper;
				wrapper.taggedValues = taggedValuesCollectionWrapper;
				wrapper.taggedValuesEx = taggedValuesExCollectionWrapper;
				wrapper.templateParameters = templateParametersCollectionWrapper;
				wrapper.tests = testsCollectionWrapper;
				wrapper.factory = this;
				wrapper.diagramFactory = this.diagramFactory;
				wrapper.repository = this.repository;
				wrapper.proxy = wrapper;
				wrapper.wrappedObject = eaElement;	
				return wrapper;
			}
	
			newScenarioStepWrapper(eaScenarioStep) {
		
				var self = this;
			
				var extensionsCollectionWrapper = this.baseFactory.newCollectionWrapper(
					eaScenarioStep.Extensions,
					sce => { return self.Factory.newScenarioExtensionWrapper(sce);}
				);
				var usesElementListCollectionWrapper = this.baseFactory.newCollectionWrapper(
					eaScenarioStep.UsesElementList,
					elm => { return self.Factory.newElementWrapper(elm);}
				);
	
				var wrapper = new ScenarioStepWrapper();
				wrapper.extensions = extensionsCollectionWrapper;
				wrapper.usesElementList = usesElementListCollectionWrapper;
				wrapper.wrappedObject = eaScenarioStep;
				return wrapper;
			}
		}
		EaNativeObjectWrapper.addBasicExtendedWrapperFactoryMethods(Factory, [
			{ factoryMethod: 'newConstraintWrapper', wrapperClass: ConstraintWrapper}, 
			{ factoryMethod: 'newEffortWrapper', wrapperClass: EffortWrapper},
			{ factoryMethod: 'newElementGridWrapper', wrapperClass: ElementGridWrapper},
			{ factoryMethod: 'newFileWrapper', wrapperClass: FileWrapper},
			{ factoryMethod: 'newIssueWrapper', wrapperClass: IssueWrapper},
			{ factoryMethod: 'newMetricWrapper', wrapperClass: MetricWrapper},
			{ factoryMethod: 'newRequirementWrapper', wrapperClass: RequirementWrapper},
			{ factoryMethod: 'newResourceWrapper', wrapperClass: ResourceWrapper},
			{ factoryMethod: 'newRiskWrapper', wrapperClass: RiskWrapper},
			{ factoryMethod: 'newScenarioWrapper', wrapperClass: ScenarioWrapper},
			{ factoryMethod: 'newScenarioExtensionWrapper', wrapperClass: ScenarioExtensionWrapper},
			{ factoryMethod: 'newTaggedValueWrapper', wrapperClass: TaggedValueWrapper},
			{ factoryMethod: 'newTestWrapper', wrapperClass: TestWrapper}
		]);
	
		// Module Export
		var module = {};
		module.ElementWrapper = ElementWrapper;
		module.Factory = Factory;
		namespace.registerModule('ser.ea.element', module);
		return module
	
	};

}//end ser_ea_element

