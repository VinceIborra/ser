function ser_ea_diagram(manager, instanceName) {

	/// 
	/// <param name="namespace"></param>
	this.getModule = function(namespace){

		// Perform module imports
		namespace.include(ser_ea_base);
	
		// Local synonyms
		let EaNativeObjectWrapper = namespace.ser.ea.base.EaNativeObjectWrapper;
	
		// Module Classes
		class DiagramWrapper extends EaNativeObjectWrapper {
	
		    constructor() {
				super();
				this.diagramLinks = null;
				this.diagramObjects = null;
				this.selectedObjects = null;
				this.repository = null;
		    }
		
			activate() {
				this.repository.activateDiagram(this);
			}
	
			close() {
				this.repository.closeDiagram(this);
			}
		
			open() {
				this.repository.openDiagram(this);
			}
	
			reload() {
				this.wrappedObject = Repository.GetDiagramByGuid(this.guid);
				this.selectedObjects.eaCollection = this.wrappedObject.SelectedObjects;
			}
		}
	
		let DiagramLinksWrapper = EaNativeObjectWrapper.createBasicExtendedWrapperClass();
	
		class DiagramObjectWrapper extends EaNativeObjectWrapper {
		
			constructor() {
				super();
				this.repository = null;
			}
		
			get element() {
				return this.repository.getElement(this.wrappedObject.ElementID);
			}
		}
	
		let SwimlaneDefWrapper = EaNativeObjectWrapper.createBasicExtendedWrapperClass();
	
		let SwimlanesWrapper = EaNativeObjectWrapper.createBasicExtendedWrapperClass();
	
		let SwimlaneWrapper = EaNativeObjectWrapper.createBasicExtendedWrapperClass();
	
		class AddNewHelper {
		
			verifyAndAdjustSelectedObjectAttributes(attributes) {
			
				// Verify
				attributes.assertAttributePresent('element');
			
				// Name
				var name = attributes.element.elementID;
			
				// Type
				var type = '';
			
				// Return adjusted attributes
				return {
					attributes: attributes.adjust({
						delete: ['element'],
					}),
					name: name,
					type: type
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
				this.repository = null;
				this.repository = null;
				this.addNewHelper = this.newAddNewHelper();
			}
	
			newAddNewHelper() {
				var addNewHelper = new AddNewHelper();
				return addNewHelper;
			}
	
			newDiagramWrapper(eaDiagram) {
	
				var self = this;
			
				var diagramLinksCollectionWrapper = this.baseFactory.newCollectionWrapper(
					eaDiagram.DiagramLinks,
					dlk => { return self.newDiagramLinkWrapper(dlk);}
				);
				var diagramObjectsCollectionWrapper = this.baseFactory.newCollectionWrapper(
					eaDiagram.DiagramObjects,
					dob => { return self.newDiagramObjectWrapper(dob);}
				);
				var selectedObjectsCollectionWrapper = this.baseFactory.newCollectionWrapper(
					eaDiagram.SelectedObjects,
					dob => { return self.newDiagramObjectWrapper(dob);},
					null,
					self.addNewHelper.verifyAndAdjustSelectedObjectAttributes
				);
			
				var wrapper = new DiagramWrapper();
				wrapper.diagramLinks = diagramLinksCollectionWrapper;
				wrapper.diagramObjects = diagramObjectsCollectionWrapper;
				wrapper.selectedObjects = selectedObjectsCollectionWrapper;
				wrapper.repository = this.repository;
				wrapper.proxy = wrapper;
				wrapper.wrappedObject = eaDiagram;
				return wrapper;
			}
		
			newDiagramObjectWrapper(eaDiagramObject) {
	
				var wrapper = new DiagramObjectWrapper();
				wrapper.repository = this.repository;
				wrapper.wrappedObject = eaDiagramObject;
				return wrapper;
			}
		}
		EaNativeObjectWrapper.addBasicExtendedWrapperFactoryMethods(Factory, [
			{ factoryMethod: 'newDiagramLinksWrapper', wrapperClass: DiagramLinksWrapper},
			{ factoryMethod: 'newSwimlaneDefWrapper', wrapperClass: SwimlaneDefWrapper},
			{ factoryMethod: 'newSwimlanesWrapper', wrapperClass: SwimlanesWrapper},
			{ factoryMethod: 'newSwimlaneWrapperr', wrapperClass: SwimlaneWrapper}
		]);
	
		// Module Export
		var module = {};
		module.DiagramWrapper = DiagramWrapper;
		module.Factory = Factory;
		namespace.registerModule('ser.ea.diagram', module);
		return module
	};

}//end ser_ea_diagram

