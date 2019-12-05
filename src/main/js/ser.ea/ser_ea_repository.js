function ser_ea_repository(manager, instanceName) {

	/// 
	/// <param name="namespace"></param>
	this.getModule = function(namespace){

		// Perform module imports
		namespace.include(ser_base);
		namespace.include(ser_ea_constants);
		namespace.include(ser_ea_base);
		namespace.include(ser_ea_element);
		namespace.include(ser_ea_connector);
	
		// Local synonyms
		let Types = ser.base.Types;
		let EaNativeObjectWrapper = namespace.ser.ea.base.EaNativeObjectWrapper;
		let Enumerable = namespace.ser.external.linq.Enumerable;
		let ObjectType = namespace.ser.ea.constants.ObjectType;
		let ElementType = namespace.ser.ea.constants.ElementType;
		let RepositoryType = ser.ea.constants.RepositoryType;
	
		// Module Classes
		let AuthorWrapper = EaNativeObjectWrapper.createBasicExtendedWrapperClass();
		let ClientWrapper = EaNativeObjectWrapper.createBasicExtendedWrapperClass();
		let DatatypeWrapper = EaNativeObjectWrapper.createBasicExtendedWrapperClass();
		let EventPropertiesWrapper = EaNativeObjectWrapper.createBasicExtendedWrapperClass();
		let EventPropertyWrapper = EaNativeObjectWrapper.createBasicExtendedWrapperClass();
		let ModelWatcherWrapper = EaNativeObjectWrapper.createBasicExtendedWrapperClass();
	
		class TraversalUtil {
		
			static traversePackagesOnly(item) {
				var pkgs = item.packages;
				if (pkgs != null) {
					return pkgs;
				}
				return null;
			}
		
			static traversePackagesAndElements(item) {
				if (item == null) { return null; }
				var items = Enumerable.empty();
				var pkgs = item.packages;
				if (pkgs != null) {
					items = items.concat(pkgs);
				}
				var elms = item.elements;
				if (elms != null) {
					items = items.concat(elms);
				}
				if (items.count() > 0) {
					return items;
				}
				return null;
			}
		}
	
		class PackageWrapper extends EaNativeObjectWrapper {
		
		    constructor() {
				super();
				this.factory = null;
				this.elementFactory = null;
				this.connectors = null;
				this.diagrams = null;
				this.elements = null;
				this.diagrams = null;
		    }
		
			get element() {
				return this.elementFactory.newElementWrapper(this.wrappedObject.Element);
			}
		
			get parent() {
				var parentID = this.wrappedObject.ParentID;
				if (parentID == 0) {
					return null;
				}
				return this.factory.newPackageWrapper(
					Repository.GetPackageByID(parentID)
				);
			}
		
			get taggedValues() {
				return this.element.taggedValues;
			}
		
			traverseDepthFirst(traversal) {
			
				// Makes sure we at least have one traversal function to use
				var traversalFunction = TraversalUtil.traversePackagesAndElements;
				if (traversal != null) {
					traversalFunction = traversal;
				}
			
				return Enumerable.from([this]).traverseDepthFirst(traversalFunction);
			}
		}
	
		let ProjectIssueWrapper = EaNativeObjectWrapper.createBasicExtendedWrapperClass();
		let ProjectResourceWrapper = EaNativeObjectWrapper.createBasicExtendedWrapperClass();
		let ProjectRoleWrapper = EaNativeObjectWrapper.createBasicExtendedWrapperClass();
		let PropertyTypeWrapper = EaNativeObjectWrapper.createBasicExtendedWrapperClass();
		let ReferenceWrapper = EaNativeObjectWrapper.createBasicExtendedWrapperClass();
	
		class RepositoryWrapper extends EaNativeObjectWrapper {
	
		    constructor() {
				super();
				this.factory = null;
				this.elementFactory = null;
				this.elementFeatureFactory = null;
				this.connectorFactory = null;
				this.diagramFactory = null;
				this.projectInterfaceFactory = null;
				this.searchWindowFactory = null;
				this.authors = null;
				this.clients = null;
				this.datatypes = null;
				this.issues = null;
				this.models = null;
				this.projectRoles = null;
				this.projectTypes = null;
				this.propertyTypes = null;
				this.resources = null;
				this.stereotypes = null;
				this.tasks = null;
				this.terms = null;
		    }
		
			get currentSelection() {
				return this.searchWindowFactory.newEASelectionWrapper(this.wrappedObject.CurrentSelection);
			}
		
			get searchWindow() {
				return this.searchWindowFactory.newSearchWindowWrapper(this.wrappedObject.SearchWindow);
			}
		
			get repositoryType() {
				return RepositoryType.fromCode(this.wrappedObject.RepositoryType());
			}
		
			activateDiagram(dgm) {
				if (typeof dgm === Types.Number.code)
					Repository.ActivateDiagram(dgm);
				else if (dgm instanceof EaNativeObjectWrapper)
					Repository.ActivateDiagram(dgm.diagramID);
				else
					Repository.ActivateDiagram(dgm.DiagramID);
			}
		
			closeDiagram(dgm) {
				if (typeof dgm === Types.Number.code)
					Repository.CloseDiagram(dgm);
				else if (dgm instanceof EaNativeObjectWrapper) {
					Repository.CloseDiagram(dgm.diagramID);
					dgm.reload();
				}
				else
					Repository.CloseDiagram(dgm.DiagramID);
			}
	
			determineWrapperFactory(type) {
				switch(type) {
					case 'Attribute': return this.elementFeatureFactory; break;
					case 'Connector': return this.connectorFactory; break;
					case 'Diagram': return this.diagramFactory; break;
					case 'Element': return this.elementFactory; break;
					case 'Method': return this.elementFeatureFactory; break;
					case 'Package': return this.factory; break;
				}
				return null;
			}
		
			getAttribute(identifier) { return this.getItem('Attribute', identifier); }
			getAttributeByGuid(guid) { return this.getItemByGuid('Attribute', this.elementFeatureFactory, guid); }
			getAttributeByID(id) { return this.getItemByID('Attribute', id); }
	
			getConnector(identifier) { return this.getItem('Connector', identifier); }
			getConnectorByGuid(guid) { return this.getItemByGuid('Connector', this.connectorFactory, guid); }
			getConnectorByID(id) { return this.getItemByID('Connector', id); }
	
			getCurrentDiagram() {
				return this.diagramFactory.newDiagramWrapper(
					Repository.GetCurrentDiagram()
				);
			}
		
			getDiagram(identifier) { return this.getItem('Diagram', identifier); }
			getDiagramByGuid(guid) { return this.getItemByGuid('Diagram', this.diagramFactory, guid); }
			getDiagramByID(id) { return this.getItemByID('Diagram', id); } 
	
			getElement(identifier) { return this.getItem('Element', identifier); }
			getElementByGuid(guid) { return this.getItemByGuid('Element', this.elementFactory, guid); }
			getElementByID(id) { return this.getItemByID('Element', id); }
	
			getItem(itemType, identifier) {
				switch(typeof identifier) {
					case Types.String.code:
						return this['get' + itemType + 'ByGuid'](identifier);
						break;
					case Types.Number.code:
						return this['get' + itemType + 'ByID'](identifier);
						break;
				}
				return null;
			}
	
			getItemByGuid(itemType, wrappingFactory, guid) {
			
				// Retrieve the EA item using proxied object
				var itm = this.wrappedObject['Get' + itemType + 'ByGuid'](guid);
				if (!itm) {
					return null;
				}
			
				// And return a wrapped version of it
				return wrappingFactory['new' + itemType + 'Wrapper'](itm);	
			}
	
			getItemByID(type, id) {
			
				// Retrieve the EA object using proxied object
				var itm = this.wrappedObject['Get' + type + 'ByID'](id);
				if (!itm) {
					return null;
				}
			
				// And return a wrapped version
				return this.determineWrapperFactory(type)['new' + type + 'Wrapper'](itm);
			}
	
			getMethod(identifier) { return this.getItem('Method', identifier); }
			getMethodByGuid(guid) { return this.getItemByGuid('Method', this.elementFeatureFactory, guid); }
			getMethodByID(id) { return this.getItemByID('Method', id); }
	
			getPackage(identifier) { return this.getItem('Package', identifier); }
			getPackageByGuid(guid) { return this.getItemByGuid('Package', this.factory, guid); }
			getPackageByID(id) { return this.getItemByID('Package', id); }
		
			getProjectInterface() {
				return this.projectInterfaceFactory.newProjectWrapper(
					Repository.GetProjectInterface()
				);
			}
		
			getTreeSelectedItem() {
				return this.getTreeSelectedObject();
			}
		
			getTreeSelectedObject() {
				var wrappedObject = Repository.GetTreeSelectedObject();
				switch(wrappedObject.ObjectType) {
					case ObjectType.Attribute.code: return this.elementFeatureFactory.newAttributeWrapper(wrappedObject); break;
					case ObjectType.Diagram.code: return this.diagramFactory.newDiagramWrapper(wrappedObject); break;
					case ObjectType.Element.code: return this.elementFactory.newElementWrapper(wrappedObject); break;
					case ObjectType.Method.code: return this.elementFeatureFactory.newMethodWrapper(wrappedObject); break;
					case ObjectType.Package.code: return this.factory.newPackageWrapper(wrappedObject); break;
				}
				return null;
			}
		
			getTreeSelectedItemType() {
				return ObjectType.fromCode(Repository.GetTreeSelectedItemType());
			}
		
			getTreeSelectedPackage() {
				return this.factory.newPackageWrapper(
					Repository.GetTreeSelectedPackage()
				);
			}
		
			invokeConstructPicker(elementFilter) {
	
				// Call the native method
				var elementId = Repository.InvokeConstructPicker(elementFilter);
				if (elementId == 0) {
					return null;
				}
			
				// Get the corresponding element wrapper
				var elm = this.getElement(elementId);
			
				// But make sure we return the appropriate wrapper
				switch(elm.type.code) {
				
					case ElementType.Package.code:
						return this.getPackage(elm.guid);
						break;
				
					default:
						return elm;
						break;
				}
			}
	
			openDiagram(dgm) {
				if (typeof dgm === Types.Number.code)
					Repository.OpenDiagram(dgm);
				else if (dgm instanceof EaNativeObjectWrapper) {
					Repository.OpenDiagram(dgm.diagramID);
					dgm.reload();
				}
				else
					Repository.OpenDiagram(dgm.DiagramID);
			}
	
			showInProjectView(item) {
			
				// Assume given object is a native ea object	
				var nativeItem = item;
			
				// If it is a wrapper use the wrapped object
				if (item instanceof EaNativeObjectWrapper) {
					nativeItem = item.wrappedObject;
				}
	
				// Use native functionality 
				Repository.ShowInProjectView(nativeItem);
			}
		}
	
		let SecurityUserWrapper = EaNativeObjectWrapper.createBasicExtendedWrapperClass();
		let StereotypeWrapper = EaNativeObjectWrapper.createBasicExtendedWrapperClass();
		let TaskWrapper = EaNativeObjectWrapper.createBasicExtendedWrapperClass();
		let TermWrapper = EaNativeObjectWrapper.createBasicExtendedWrapperClass();
	
		class Factory {
		
			constructor() {
				this.factory = this;
				this.baseFactory = null;
				this.elementFactory = null;
				this.elementFeatureFactory = null;
				this.connectorFactory = null;
				this.connectorAddNewHelper = null;
				this.diagramFactory = null;
				this.elementFactory = null;
				this.projectInterfaceFactory = null;
				this.searchWindowFactory = null;
			}
	
			newPackageWrapper(eaPackage) {
			
				var self = this;
			
				var connectorsCollectionWrapper = this.baseFactory.newCollectionWrapper(
					eaPackage.Connectors,
					cnt => { return self.connectorFactory.newConnectorWrapper(cnt);},
					cnt => { return cnt.name},
					self.connectorAddNewHelper.verifyAndAdjustConnectorAttributes
				);
	
				var diagramsCollectionWrapper = this.baseFactory.newCollectionWrapper(
					eaPackage.Diagrams,
					dgm => { return self.diagramFactory.newDiagramWrapper(dgm)},
					dgm => { return dgm.name},
					attributes => { return {
						name: attributes.name,
						type: attributes.type,
						attributes: attributes
					}}
				);
	
				var elementsCollectionWrapper = this.baseFactory.newCollectionWrapper(
					eaPackage.Elements,
					elm => { return self.elementFactory.newElementWrapper(elm)},
					elm => { return elm.name},
					attributes => { return {
						name: attributes.name,
						type: attributes.type.label,
						attributes: attributes.adjust({delete: 'type'})
					}}
				);
	
				var packagesCollectionWrapper = this.baseFactory.newCollectionWrapper(
					eaPackage.Packages,
					pkg => { return self.factory.newPackageWrapper(pkg)},
					pkg => { return pkg.name },
					attributes => { return {
						name: attributes.name,
						type: '',
						attributes: attributes
					}}
				);
			
				var wrapper = new PackageWrapper();
				wrapper.factory = this.factory;
				wrapper.elementFactory = this.elementFactory;
				wrapper.connectors = connectorsCollectionWrapper;
				wrapper.diagrams = diagramsCollectionWrapper;
				wrapper.elements = elementsCollectionWrapper;
				wrapper.packages = packagesCollectionWrapper;
				wrapper.proxy = wrapper;
				wrapper.wrappedObject = eaPackage;
				return wrapper;
			}
	
			newRepositoryWrapper(eaRepository) {
			
				var self = this;
			
				var authorsCollectionWrapper = this.baseFactory.newCollectionWrapper(
					eaRepository.Authors,
					author => { return self.factory.newAuthorWrapper(author);}
				);
	
				var clientsCollectionWrapper = this.baseFactory.newCollectionWrapper(
					eaRepository.Clients,
					client => { return self.factory.newClientWrapper(client);}
				);
			
				var datatypesCollectionWrapper = this.baseFactory.newCollectionWrapper(
					eaRepository.Datatypes,
					datatype => { return self.factory.newDatatypeWrapper(datatype);}
				);
				
				var issuesCollectionWrapper = this.baseFactory.newCollectionWrapper(
					eaRepository.Issues,
					issue => { return self.factory.newProjectIssueWrapper(issue);}
				);
	
				var modelsCollectionWrapper = this.baseFactory.newCollectionWrapper(
					eaRepository.Models,
					model => { return self.factory.newPackageWrapper(model);}
				);
	
				var projectRolesCollectionWrapper = this.baseFactory.newCollectionWrapper(
					eaRepository.ProjectRoles,
					projectRole => { return self.factory.newProjectRoleWrapper(projectRole);}
				);
	
				var propertyTypesCollectionWrapper = this.baseFactory.newCollectionWrapper(
					eaRepository.PropertyTypes,
					propertyType => { return self.factory.newPropertyTypeWrapper(propertyType);}
				);
	
				var resourcesCollectionWrapper = this.baseFactory.newCollectionWrapper(
					eaRepository.Resources,
					projectResource => { return self.factory.newProjectResourceWrapper(projectResource);}
				);
	
				var stereotypesCollectionWrapper = this.baseFactory.newCollectionWrapper(
					eaRepository.Stereotypes,
					stereotype => { return self.factory.newStereotypeWrapper(stereotype);}
				);
	
				var tasksCollectionWrapper = this.baseFactory.newCollectionWrapper(
					eaRepository.Tasks,
					task => { return self.factory.newTaskWrapper(task);}
				);
				
				var termsCollectionWrapper = this.baseFactory.newCollectionWrapper(
					eaRepository.Terms,
					term => { return self.factory.newTermWrapper(term);}
				);
			
				var wrapper = new RepositoryWrapper();
				wrapper.factory = this;
				wrapper.elementFactory = this.elementFactory;
				wrapper.elementFeatureFactory = this.elementFeatureFactory;
				wrapper.connectorFactory = this.connectorFactory;
				wrapper.diagramFactory = this.diagramFactory;
				wrapper.projectInterfaceFactory = this.projectInterfaceFactory;
				wrapper.searchWindowFactory = this.searchWindowFactory;
				wrapper.authors = authorsCollectionWrapper;
				wrapper.clients = clientsCollectionWrapper;
				wrapper.datatypes = datatypesCollectionWrapper;
				wrapper.issues = issuesCollectionWrapper;
				wrapper.models = modelsCollectionWrapper;
				wrapper.projectRoles = projectRolesCollectionWrapper;
				wrapper.propertyTypes = propertyTypesCollectionWrapper;
				wrapper.resources = resourcesCollectionWrapper;
				wrapper.stereotypes = stereotypesCollectionWrapper;
				wrapper.tasks = tasksCollectionWrapper;
				wrapper.terms = termsCollectionWrapper;
				wrapper.wrappedObject = eaRepository;
				return wrapper;
			}
		}
		EaNativeObjectWrapper.addBasicExtendedWrapperFactoryMethods(Factory, [
			{ factoryMethod: 'newAuthorWrapper', wrapperClass: AuthorWrapper}, 
			{ factoryMethod: 'newClientWrapper', wrapperClass: ClientWrapper},
			{ factoryMethod: 'newDatatypeWrapper',  wrapperClass: DatatypeWrapper},
			{ factoryMethod: 'newEventPropertiesWrapper', wrapperClass: EventPropertiesWrapper},
			{ factoryMethod: 'newEventPropertyWrapper', wrapperClass: EventPropertyWrapper},
			{ factoryMethod: 'newModelWatcherWrapper', wrapperClass: ModelWatcherWrapper},
			{ factoryMethod: 'newProjectIssueWrapper', wrapperClass: ProjectIssueWrapper},
			{ factoryMethod: 'newProjectResourceWrapper', wrapperClass: ProjectResourceWrapper},
			{ factoryMethod: 'newProjectRoleWrapper', wrapperClass: ProjectRoleWrapper},
			{ factoryMethod: 'newPropertyTypeWrapper', wrapperClass: PropertyTypeWrapper},
			{ factoryMethod: 'newReferenceWrapper', wrapperClass: ReferenceWrapper},
			{ factoryMethod: 'newSecurityUserWrapper', wrapperClass: SecurityUserWrapper},
			{ factoryMethod: 'newStereotypeWrapper', wrapperClass: StereotypeWrapper},
			{ factoryMethod: 'newTaskWrapper', wrapperClass: TaskWrapper},
			{ factoryMethod: 'newTermWrapper', wrapperClass: TermWrapper}
		]);
	
		// Module Export
		var module = {};
		module.PackageWrapper = PackageWrapper;
		module.TraversalUtil = TraversalUtil;
		module.Factory = Factory;
		namespace.registerModule('ser.ea.repository', module);
		return module
	
	};

}//end ser_ea_repository

