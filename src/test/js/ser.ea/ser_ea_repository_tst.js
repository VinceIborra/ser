function ser_ea_repository_tst(manager, instanceName) {

	this.getModule = function(){

		// Perform module imports
		namespace.include(ser_unit);
		namespace.include(ser_ea_context);
	
		// Local synonyms
		let TestClass = ser.unit.TestClass;
		let ObjectType = namespace.ser.ea.constants.ObjectType;
		let ItemIdentifierType = namespace.ser.ea.constants.ItemIdentifierType;
		let RepositoryType = namespace.ser.ea.constants.RepositoryType;
		let BaseWrapper = namespace.ser.ea.base.BaseWrapper;
		let CollectionWrapper = namespace.ser.ea.base.CollectionWrapper;
		let repository = namespace.ser.ea.context.repository;
		let ElementWrapper = namespace.ser.ea.element.ElementWrapper;
		let PackageWrapper = namespace.ser.ea.repository.PackageWrapper;
		let TraversalUtil = ser.ea.repository.TraversalUtil;
		let ElementType = ser.ea.constants.ElementType;
		let ConnectorType = ser.ea.constants.ConnectorType;
	
		let EASelectionWrapper = ser.ea.searchWindow.EASelectionWrapper;
	
		//=========================================================================
		// Desc: This test class tests methods on the va.io.ArrayConsole class.
		//=========================================================================
		class TestRepository extends TestClass {
	
			constructor() {
				super();
			}
	
			//-------------------------------------------------------------------------
			// Desc: This tests the object creation method.
			//-------------------------------------------------------------------------
			testAttributes() {
			
				// Authors
				var authors = repository.authors;
				this.assertInstanceOf(authors, CollectionWrapper);
				this.assertEquals(1, authors.count);
			
				// Clients
				var clients = repository.clients;
				this.assertInstanceOf(clients, CollectionWrapper);
				this.assertEquals(1, clients.count);
	
				// Datatypes
				var datatypes = repository.datatypes;
				this.assertInstanceOf(datatypes, CollectionWrapper);
				this.assertEquals(650, datatypes.count);
	
				// Issues
				var issues = repository.issues;
				this.assertInstanceOf(issues, CollectionWrapper);
				this.assertEquals(1, issues.count);
	
				// Models
				var models = repository.models;
				this.assertInstanceOf(models, CollectionWrapper);
				this.assertEquals(3, models.count, 'Models');
	
		//		// ObjectType
		//		var objectType = repository.objectType;
		//		this.assertNotNull(objectType);
		//		this.assertInstanceOf(objectType, ObjectType);
		//		this.assertTrue(objectType.equals(ObjectType.Repository));
		//
		////		// ProjectRoles - TODO - Seems to have some issue with this
		////		if (Repository.ProjectRoles == null) {
		////			dbg('it is null');
		////		}
		////		else {
		////			dbg('it is not null');
		////		}
		////		dbg('count = ' + Repository.ProjectRoles.Count);
		////		for(var prop in (Repository.ProjectRoles)) {
		////			dbg('prop = ' + prop);
		////		}
		////		var projectRoles = repository.projectRoles;
		////		this.assertInstanceOf(projectRoles, CollectionWrapper);
		////		this.assertEquals(0, projectRoles.count);
		//
		//		// PropertyTypes
		//		var propertyTypes = repository.propertyTypes;
		//		this.assertInstanceOf(propertyTypes, CollectionWrapper);
		//		this.assertEquals(1, propertyTypes.count);
		//
		//		// Resources
		//		var resources = repository.resources;
		//		this.assertInstanceOf(resources, CollectionWrapper);
		//		this.assertEquals(1, resources.count, 'Resources');
			
				// repositoryType / RepositoryType()
				var repositoryType = repository.repositoryType;
				this.assertNotNull(repositoryType);
				this.assertInstanceOf(repositoryType, RepositoryType);
				this.assertTrue(repositoryType.equals(RepositoryType.Jet));
	
		//		// SearchWindow
		//		var searchWindow = repository.searchWindow;
		//		this.assertNotNull(searchWindow);
		//		this.assertInstanceOf(searchWindow, BaseWrapper);
		//
		//		// Stereotypes
		//		var stereotypes = repository.stereotypes;
		//		this.assertInstanceOf(stereotypes, CollectionWrapper);
		//		this.assertEquals(120, stereotypes.count);
		//
		//		// Tasks
		//		var tasks = repository.tasks;
		//		this.assertInstanceOf(tasks, CollectionWrapper);
		//		this.assertEquals(1, tasks.count, 'Tasks');
		//
		//		// Terms
		//		var terms = repository.terms;
		//		this.assertInstanceOf(terms, CollectionWrapper);
		//		this.assertEquals(1, terms.count, 'Terms');
			}
		
			testCurrentSelection() {
			
				const TST_ELM_GUID = '{24D1DD7A-74E8-446f-8DD0-DD588B1C7272}';
			
				var elm = repository.getElement(TST_ELM_GUID);
				repository.showInProjectView(elm);
			
				var currentSelection = repository.currentSelection;
				this.assertNotNull(currentSelection, 'Current selection should not be null');
				this.assertInstanceOf(currentSelection, EASelectionWrapper);
			
				this.assertEquals(1, currentSelection.elementSet.count);
			
				var theElm = currentSelection.elementSet.elementAt(0);
				this.assertEquals(TST_ELM_GUID, theElm.guid);
			
				this.underConstruction('Minimal testing for this method, require more testing');
			}
		/*
			testActivateDiagram() {
	
				const TST_DGM1_GUID = '{40F552A9-7F53-4ba6-BE2D-911AA7DC29D1}';
				const TST_DGM2_GUID = '{0E7989CA-8C3C-4ba8-8B2B-A8B3A2BBCB0A}';
				var dgm1 = repository.getDiagram(TST_DGM1_GUID);
				var dgm2 = repository.getDiagram(TST_DGM1_GUID);
			
				// Open the diagrams
				repository.openDiagram(dgm1);
				repository.openDiagram(dgm2);
			
				// Diagram Wrapper as input
				repository.activateDiagram(dgm1);
				var activeDiagram = repository.getCurrentDiagram();
				this.assertEquals(dgm1.diagramGUID, activeDiagram.diagramGUID);
			
				// Diagram EA Object as input
				repository.activateDiagram(dgm2.wrappedObject);
				var activeDiagram = repository.getCurrentDiagram();
				this.assertEquals(dgm2.diagramGUID, activeDiagram.diagramGUID);
	
				// Diagram ID as input
				repository.activateDiagram(dgm1.diagramID);
				var activeDiagram = repository.getCurrentDiagram();
				this.assertEquals(dgm1.diagramGUID, activeDiagram.diagramGUID);
			
				// Cleanup
				repository.closeDiagram(dgm1);
				repository.closeDiagram(dgm2);
			}
		
			testGetAttributeMethod() {
			
				const TST_ATT_GUID = '{248DABE4-6723-40c2-9B30-6CCE751B358A}';
			
				var att = repository.getAttribute(TST_ATT_GUID);
			
				this.assertNotNull(att);
				this.assertTrue(att.objectType.equals(ObjectType.Attribute));
				this.assertTrue('anAttribute', att.name);
			
				var attributeID = att.attributeID;
				att = null;
				att = repository.getAttribute(attributeID);
			
				this.assertNotNull(att);
				this.assertTrue(att.objectType.equals(ObjectType.Attribute));
				this.assertTrue('anAttribute', att.name);
			}
	
			testGetAttributeByGuidMethod() {
			
				const TST_ATT_GUID = '{E5C0E5E6-4F11-4e5f-BB75-9B2244270E9F}';
			
				var att = repository.getAttributeByGuid(TST_ATT_GUID);
			
				this.assertNotNull(att);
				this.assertTrue(att.objectType.equals(ObjectType.Attribute));
				this.assertTrue('anAttribute', att.name);
			}
	
			testGetAttributeByIDMethod() {
			
				const TST_ATT_GUID = '{C17D7041-DF53-4c3c-9B9B-A879B9424E09}';
			
				var eaAttObject = Repository.GetAttributeByGuid(TST_ATT_GUID);
			
				var att = repository.getAttributeByID(eaAttObject.AttributeID);
			
				this.assertNotNull(att);
				this.assertTrue(att.objectType.equals(ObjectType.Attribute));
				this.assertTrue('anAttribute', att.name);
			}
		
			testCloseDiagramMethod() {
			
				const TST_DGM_GUID = '{0C255C5A-7017-499e-AF86-2B57ECBF9D2E}';
				var dgm = repository.getDiagram(TST_DGM_GUID);
			
				// DiagramWrapper as input
				repository.openDiagram(dgm);
				this.assertEquals(2, Repository.IsTabOpen(dgm.name));
				repository.closeDiagram(dgm);
				this.assertEquals(0, Repository.IsTabOpen(dgm.name));
			
				// Diagram EA Object as input
				repository.openDiagram(dgm);
				this.assertEquals(2, Repository.IsTabOpen(dgm.name));
				repository.closeDiagram(dgm.wrappedObject);
				this.assertEquals(0, Repository.IsTabOpen(dgm.name));
	
				// Diagram ID as input
				repository.openDiagram(dgm);
				this.assertEquals(2, Repository.IsTabOpen(dgm.name));
				repository.closeDiagram(dgm.diagramID);
				this.assertEquals(0, Repository.IsTabOpen(dgm.name));
			}
		
			testGetConnectorMethod() {
			
				const TST_CTR_GUID = '{70BB21B8-FD16-420a-A94E-05F3F281928A}';
			
				var ctr = repository.getConnector(TST_CTR_GUID);
			
				this.assertNotNull(ctr);
				this.assertTrue(ctr.objectType.equals(ObjectType.Connector));
				this.assertTrue('aConnector', ctr.name);
			
				var connectorID = ctr.connectorID;
				ctr = null;
				ctr = repository.getConnector(connectorID);
			
				this.assertNotNull(ctr);
				this.assertTrue(ctr.objectType.equals(ObjectType.Connector));
				this.assertTrue('aConnector', ctr.name);
			}
	
			testGetConnectorByGuidMethod() {
	
				const TST_CTR_GUID = '{E3FEBEE9-D333-41e9-A9C2-8F076757FCD9}';
	
				var ctr = repository.getConnectorByGuid(TST_CTR_GUID);
			
				this.assertNotNull(ctr);
				this.assertTrue(ctr.objectType.equals(ObjectType.Connector));
				this.assertTrue('aConnector', ctr.name);
			}
	
			testGetConnectorByIDMethod() {
			
				const TST_CTR_GUID = '{FA7E9B93-A677-4f9c-952E-C4837F5C059B}';
	
				var eaCtrObject = Repository.GetConnectorByGuid(TST_CTR_GUID);
			
				var ctr = repository.getConnectorByID(eaCtrObject.ConnectorID);
			
				this.assertNotNull(ctr);
				this.assertTrue(ctr.objectType.equals(ObjectType.Connector));
				this.assertTrue('aConnector', ctr.name);
			}
		
			testGetCurrentDiagram() {
			
				const TST_DGM_GUID = '{19EA126C-80FB-41bf-A3D4-50BC48FAB9ED}';
			
				var dgm = repository.getDiagram(TST_DGM_GUID);
				repository.openDiagram(dgm);
				repository.activateDiagram(dgm);
			
				var currentDiagram = repository.getCurrentDiagram();
				this.assertNotNull(currentDiagram);
				this.assertEquals(dgm.diagramGUID, currentDiagram.diagramGUID);
			
				// Cleanup
				repository.closeDiagram(dgm);
			}
			
			testGetDiagramMethod() {
			
				const TST_DGM_GUID = '{F63B726A-7F28-4e5e-9FAF-D775E2A1E4F6}';
			
				var dgm = repository.getDiagram(TST_DGM_GUID);
			
				this.assertNotNull(dgm);
				this.assertTrue(dgm.objectType.equals(ObjectType.Diagram));
				this.assertTrue('aDiagram', dgm.name);
			
				var diagramID = dgm.diagramID;
				dgm = null;
				dgm = repository.getDiagram(diagramID);
			
				this.assertNotNull(dgm);
				this.assertTrue(dgm.objectType.equals(ObjectType.Diagram));
				this.assertTrue('aDiagram', dgm.name);
			}
	
			testGetDiagramByGuidMethod() {
			
				const TST_DGM_GUID = '{F5693114-E85A-4fa9-AAD3-49E8F778079D}';
			
				var dgm = repository.getDiagramByGuid(TST_DGM_GUID);
			
				this.assertNotNull(dgm);
				this.assertTrue(dgm.objectType.equals(ObjectType.Diagram));
				this.assertTrue('aDiagram', dgm.name);
			}
	
			testGetDiagramByIDMethod() {
			
				const TST_DGM_GUID = '{9A1D2F91-9B1B-46ec-9116-B361A87E3FCA}';
			
				var eaDgmObject = Repository.GetDiagramByGuid(TST_DGM_GUID);
			
				var dgm = repository.getDiagramByID(eaDgmObject.DiagramID);
			
				this.assertNotNull(dgm);
				this.assertTrue(dgm.objectType.equals(ObjectType.Diagram));
				this.assertTrue('aDiagram', dgm.name);
			}
	
			testGetElementMethod() {
			
				const TST_ELM_GUID = '{F3C76A1D-4B19-4da1-9CB1-5C518FD242E0}';
			
				var elm = repository.getElement(TST_ELM_GUID);
			
				this.assertNotNull(elm);
				this.assertTrue(elm.objectType.equals(ObjectType.Element));
				this.assertTrue('aElement', elm.name);
			
				var elementID = elm.elementID;
				elm = null;
				elm = repository.getElement(elementID);
			
				this.assertNotNull(elm);
				this.assertTrue(elm.objectType.equals(ObjectType.Element));
				this.assertTrue('aElement', elm.name);
			}
	
			testGetElementByGuidMethod() {
			
				const TST_ELM_GUID = '{92FC0FCA-7ED5-42b8-8263-9087B23124E7}';
			
				var elm = repository.getElementByGuid(TST_ELM_GUID);
			
				this.assertNotNull(elm);
				this.assertTrue(elm.objectType.equals(ObjectType.Element));
				this.assertTrue('anElement', elm.name);
			}
	
			testGetElementByIDMethod() {
			
				const TST_ELM_GUID = '{0B35A076-A6CB-44f1-BA21-32DBFD49D278}';
			
				var eaElmObject = Repository.GetElementByGuid(TST_ELM_GUID);
	
				var elm = repository.getElementByID(eaElmObject.ElementID);
			
				this.assertNotNull(elm);
				this.assertTrue(elm.objectType.equals(ObjectType.Element));
				this.assertTrue('anElement', elm.name);
			}
	
			testGetMethodMethod() {
			
				const TST_MTH_GUID = '{7F0F63D2-8097-4d43-A2D9-85F85CB0D77A}';
			
				var mth = repository.getMethod(TST_MTH_GUID);
			
				this.assertNotNull(mth);
				this.assertTrue(mth.objectType.equals(ObjectType.Method));
				this.assertTrue('aMethod', mth.name);
			
				var methodID = mth.methodID;
				mth = null;
				mth = repository.getMethod(methodID);
			
				this.assertNotNull(mth);
				this.assertTrue(mth.objectType.equals(ObjectType.Method));
				this.assertTrue('aMethod', mth.name);
			}
	
			testGetMethodByGuidMethod() {
			
				const TST_MTH_GUID = '{F66FA61D-F3D9-4963-B34D-841BC09889B1}';
			
				var mth = repository.getMethodByGuid(TST_MTH_GUID);
			
				this.assertNotNull(mth);
				this.assertTrue(mth.objectType.equals(ObjectType.Method));
				this.assertTrue('aMethod', mth.name);
			}
	
			testGetMethodByIDMethod() {
			
				const TST_MTH_GUID = '{B80D664A-2910-4b47-AAD9-AB21A2B710A0}';
			
				var eaMthObject = Repository.GetMethodByGuid(TST_MTH_GUID);
			
				var mth = repository.getMethodByID(eaMthObject.MethodID);
			
				this.assertNotNull(mth);
				this.assertTrue(mth.objectType.equals(ObjectType.Method));
				this.assertTrue('aMethod', mth.name);
			}
	
			testGetPackageMethod() {
			
				const TST_PKG_GUID = '{61CBEC57-7BE3-41fa-A5F6-05A39D9DCE9B}';
			
				var pkg = repository.getPackage(TST_PKG_GUID);
			
				this.assertNotNull(pkg);
				this.assertTrue(pkg.objectType.equals(ObjectType.Package));
				this.assertTrue('aPackage', pkg.name);
			
				var packageID = pkg.packageID;
				pkg = null;
				pkg = repository.getPackage(packageID);
			
				this.assertNotNull(pkg);
				this.assertTrue(pkg.objectType.equals(ObjectType.Package));
				this.assertTrue('aPackage', pkg.name);
			}
		
			testGetPackageByGuidMethod() {
			
				const TST_PKG_GUID = '{D1152CBD-76C8-4a95-8243-B80F08AD9CAF}';
			
				var pkg = repository.getPackageByGuid(TST_PKG_GUID);
			
				this.assertNotNull(pkg);
				this.assertTrue(pkg.objectType.equals(ObjectType.Package));
				this.assertTrue('aPackage', pkg.name);
			}
		
			testGetPackageByIDMethod() {
			
				const TST_PKG_GUID = '{ECFBE515-2BA5-4d17-97CC-4BEF7C635B49}';
			
				var eaPkgObject = Repository.GetPackageByGuid(TST_PKG_GUID);
			
				var pkg = repository.getPackageByID(eaPkgObject.PackageID);
			
				this.assertNotNull(pkg);
				this.assertTrue(pkg.objectType.equals(ObjectType.Package));
				this.assertTrue('aPackage', pkg.name);
			}
		
			testGetProjectInterface() {
				var prj = repository.getProjectInterface();
				this.assertNotNull(prj);
				this.assertTrue(ObjectType.Project.equals(prj.objectType));
			}
		
			testGetTreeSelectedObject() {
			
				const TST_ATT_GUID = '{B90C055F-183B-499e-BB46-F2B4E430D01B}';
				const TST_DGM_GUID = '{42B7D1FD-628A-441d-91E9-50B57D45EAAF}';
				const TST_ELM_GUID = '{AA29A5F9-85D1-4400-8C91-56640295FB21}';
				const TST_MTH_GUID = '{F37AA971-290D-42ee-B90D-E6E549DD6861}';
				const TST_PKG_GUID = '{E986B008-9C47-493e-ADD5-985B0A5EBC41}';
			
				var att = repository.getAttribute(TST_ATT_GUID);
				repository.showInProjectView(att);
				var obj = repository.getTreeSelectedObject();
				this.assertNotNull(obj);
				this.assertTrue(ObjectType.Attribute.equals(obj.objectType));
				this.assertEquals('selectedAttribute', obj.name);
			
				var dgm = repository.getDiagram(TST_DGM_GUID);
				repository.showInProjectView(dgm);
				var obj = repository.getTreeSelectedObject();
				this.assertNotNull(obj);
				this.assertTrue(ObjectType.Diagram.equals(obj.objectType));
				this.assertEquals('selectedDiagram', obj.name);
			
				var elm = repository.getElement(TST_ELM_GUID);
				repository.showInProjectView(elm);
				var obj = repository.getTreeSelectedObject();
				this.assertNotNull(obj);
				this.assertTrue(ObjectType.Element.equals(obj.objectType));
				this.assertEquals('selectedElement', obj.name);	
			
				var mth = repository.getMethod(TST_MTH_GUID);
				repository.showInProjectView(mth);
				var obj = repository.getTreeSelectedObject();
				this.assertNotNull(obj);
				this.assertTrue(ObjectType.Method.equals(obj.objectType));
				this.assertEquals('selectedMethod', obj.name);	
	
				var pkg = repository.getPackage(TST_PKG_GUID);
				repository.showInProjectView(pkg);
				var obj = repository.getTreeSelectedObject();
				this.assertNotNull(obj);
				this.assertTrue(ObjectType.Package.equals(obj.objectType));
				this.assertEquals('selectedPackage', obj.name);	
			}
	
			testGetTreeSelectedItemType() {
			
				const TST_ATT_GUID = '{6E8AACAB-6D16-4208-A425-87185DD17A07}';
				const TST_DGM_GUID = '{1864AD8D-E024-43fd-AE5A-5D2165C1F7A0}';
				const TST_ELM_GUID = '{39CEFB31-73EB-488a-B8F0-050DD44415CD}';
				const TST_MTH_GUID = '{02B8C784-6760-47e7-9EA3-EA086656F866}';
				const TST_PKG_GUID = '{4DE849C7-5252-49d3-8C7E-6D2B577C5EFF}';
			
				var att = repository.getAttribute(TST_ATT_GUID);
				repository.showInProjectView(att);
				var ot = repository.getTreeSelectedItemType();
				this.assertTrue(ot.equals(ObjectType.Attribute));
			
				var dgm = repository.getDiagram(TST_DGM_GUID);
				repository.showInProjectView(dgm);
				var ot = repository.getTreeSelectedItemType();
				this.assertTrue(ot.equals(ObjectType.Diagram));
	
				var elm = repository.getElement(TST_ELM_GUID);
				repository.showInProjectView(elm);
				var ot = repository.getTreeSelectedItemType();
				this.assertTrue(ot.equals(ObjectType.Element));
	
				var mth = repository.getMethod(TST_MTH_GUID);
				repository.showInProjectView(mth);
				var ot = repository.getTreeSelectedItemType();
				this.assertTrue(ot.equals(ObjectType.Method));
	
				var pkg = repository.getPackage(TST_PKG_GUID);
				repository.showInProjectView(pkg);
				var ot = repository.getTreeSelectedItemType();
				this.assertTrue(ot.equals(ObjectType.Package));
			}
		
			testGetTreeSelectedPackageMethod() {
			
				const TST_ELM_GUID = '{EC937C36-0F88-4749-8ABE-F9E536158EF1}';
			
				var selectedElm = repository.getElementByGuid(TST_ELM_GUID);
			
				repository.showInProjectView(selectedElm);
			
				var pkg = repository.getTreeSelectedPackage();
			
				this.assertNotNull(pkg);
				this.assertTrue(pkg.objectType.equals(ObjectType.Package));
				this.assertTrue('selectedPackage', pkg.name);
			}
	
			testOpenDiagramMethod() {
			
				const TST_DGM_GUID = '{D0D2F695-57E1-4e5c-88FB-467F3F4EE843}';
				var dgm = repository.getDiagram(TST_DGM_GUID);
			
				// DiagramWrapper as input
				repository.closeDiagram(dgm);
				this.assertEquals(0, Repository.IsTabOpen(dgm.name));
				repository.openDiagram(dgm);
				this.assertEquals(2, Repository.IsTabOpen(dgm.name));
			
				// Diagram EA Object as input
				repository.closeDiagram(dgm);
				this.assertEquals(0, Repository.IsTabOpen(dgm.name));
				repository.openDiagram(dgm.wrappedObject);
				this.assertEquals(2, Repository.IsTabOpen(dgm.name));
	
				// Diagram ID as input
				repository.closeDiagram(dgm);
				this.assertEquals(0, Repository.IsTabOpen(dgm.name));
				repository.openDiagram(dgm.diagramID);
				this.assertEquals(2, Repository.IsTabOpen(dgm.name));
			
				// Cleanup
				repository.closeDiagram(dgm);
			}
		*/
			testShowInProjectViewMethod() {
	
				const TST_ATT_GUID = '{F948ACD5-AC88-4ff3-952D-8555A5DD4D7F}';
				const TST_DGM_GUID = '{6C914FAC-5DBB-4d5f-8F55-38A94CFB3C34}';
				const TST_ELM_GUID = '{127E9CEC-7D5B-45e7-9A2B-E2692076DD6B}';
				const TST_MTH_GUID = '{207866D8-D06B-4c37-9007-91FB47EA1B15}';
				const TST_PKG_GUID = '{B4F10308-E53F-4818-A1F2-C5C00660887F}';
			
				var att = repository.getAttribute(TST_ATT_GUID);
				repository.showInProjectView(att);
				var obj = repository.getTreeSelectedObject();
				this.assertEquals(TST_ATT_GUID, obj.attributeGUID);
			
				var dgm = repository.getDiagram(TST_DGM_GUID);
				repository.showInProjectView(dgm);
				var obj = repository.getTreeSelectedObject();
				this.assertEquals(TST_DGM_GUID, obj.diagramGUID);
	
				var elm = repository.getElement(TST_ELM_GUID);
				repository.showInProjectView(elm);
				var obj = repository.getTreeSelectedObject();
				this.assertEquals(TST_ELM_GUID, obj.elementGUID);
	
				var mth = repository.getMethod(TST_MTH_GUID);
				repository.showInProjectView(mth);
				var obj = repository.getTreeSelectedObject();
				this.assertEquals(TST_MTH_GUID, obj.methodGUID);
	
				var pkg = repository.getPackage(TST_PKG_GUID);
				dbg('hello 1');
				this.assertNotNull(pkg);
				dbg('hello 2');
				this.assertNotNull(pkg.proxy, 'it is null');
				dbg('hello 3');
				repository.showInProjectView(pkg);
				dbg('hello 4');
				var obj = repository.getTreeSelectedObject();
				dbg('hello 5');
				this.assertEquals(TST_PKG_GUID, obj.packageGUID);
				dbg('hello 6');
			}
		}
	
		class TestPackage extends TestClass {
	
			constructor() {
				super();
				this.name = "ser.ea.repository.tst.TestPackage";
			}
	
	
			//-------------------------------------------------------------------------
			// Desc: This tests the object creation method.
			//-------------------------------------------------------------------------
			testAttributes() {
			
				const TST_PKG_GUID = '{AE4000E7-E45F-4369-9265-A3950F0FACBC}';
			
				var pkg = repository.getPackage(TST_PKG_GUID);
			
				// name
				this.assertEquals('aPackage1', pkg.name);
			
				// connectors
				var connectors = pkg.connectors;
				this.assertInstanceOf(connectors, CollectionWrapper);
				this.assertEquals(1, connectors.count);
			
				// element
				var elm = pkg.element;
				this.assertInstanceOf(elm, ElementWrapper);
				this.assertEquals('aPackage1', elm.name);
			
				// guid
				this.assertEquals(pkg.packageGUID, pkg.guid);
	
				// id
				this.assertEquals(pkg.packageID, pkg.id);
			
				// objectType
				this.assertTrue(ObjectType.Package.equals(pkg.objectType));
			
				// packageGUID
				this.assertEquals(TST_PKG_GUID, pkg.packageGUID);
			
				// packageID
				this.assertEquals(pkg.wrappedObject.PackageID, pkg.packageID);
			
				// packages
				var packages = pkg.packages;
				this.assertInstanceOf(packages, CollectionWrapper);
				this.assertEquals(3, packages.count);
	
				// parent
				var parentPkg = pkg.parent;
				this.assertInstanceOf(parentPkg, PackageWrapper);
				this.assertEquals('testAttributes', parentPkg.name);
	
				// parentID
				this.assertEquals(pkg.wrappedObject.ParentID, pkg.parentID);
			
				// taggedValues
				var taggedValues = pkg.taggedValues;
				this.assertInstanceOf(taggedValues, CollectionWrapper);
				this.assertEquals(2, taggedValues.count);
			}
		
			testPackagesAttributeReadOnly() {
			
				const TST_PKG_GUID = '{278C2061-9661-40f5-8C8C-3C5C5775145B}';
				const TST_SUBPKG2_GUID = '{AA62119A-22CC-4b42-937C-CE2F350CEF78}';
				const TST_SUBPKG3_GUID = '{0DBF3CA6-2DF2-4aae-8AA1-8706F90FBA70}';
			
				var pkg = repository.getPackage(TST_PKG_GUID);
			
				var subPkg2 = pkg.packages.get('subPackage2');
				this.assertNotNull(subPkg2);
				this.assertEquals(TST_SUBPKG2_GUID, subPkg2.guid);
			
				var subPkg3 = pkg.packages.get(TST_SUBPKG3_GUID, pkg => { return pkg.guid});
				this.assertNotNull(subPkg3);
				this.assertEquals(TST_SUBPKG3_GUID, subPkg3.guid);
	
			}
		
			testCollectionsAddNew() {
			
				const TST_PKG_GUID = '{5800B674-07A3-491c-B133-55153E68A511}';
				const TST_SUBPKG1_GUID = '{8D5AEE5D-2C9E-4c14-9A4F-9ABF480F4A68}';
				const TST_SUBPKG2_GUID = '{854E7C59-F28F-4142-AABB-AE0AC23DE114}';
			
				var pkg = repository.getPackage(TST_PKG_GUID);
				var subPkg2 = repository.getPackage(TST_SUBPKG2_GUID);
	
				// Connectors
				this.assertEquals(1, pkg.connectors.count);
				pkg.connectors.addNew({
					type: ConnectorType.Association,
					supplier: subPkg2
				});			
				this.assertEquals(2, pkg.connectors.count);
			
				// Diagrams
				this.assertEquals(1, pkg.diagrams.count);
				pkg.diagrams.addNew({name: 'diagram2', type: 'Class'});
				this.assertEquals(2, pkg.diagrams.count);
				
				// Packages
				this.assertEquals(2, pkg.packages.count);
				pkg.packages.addNew({name: 'subPackage3'});			
				this.assertEquals(3, pkg.packages.count);
	
				// Elements
				this.assertEquals(1, pkg.elements.count);
				pkg.elements.addNew({name: 'element2', type: ElementType.Class});			
				this.assertEquals(2, pkg.elements.count);	
			}
	
				// Connectors
				// Diagrams
				// Packages
			testCollectionsDeleteForElements() {
			
				const TST_PKG_GUID = '{9E41535F-760B-422a-B22A-CE4B0CE4A443}';
				const TST_ELM1_GUID = '{46E1A2FE-80EA-4ad2-944F-8B5ECD7C3269}';
				const TST_ELM4_GUID = '{B979AFEE-37D1-454e-9E05-0D2A0CB314A9}';
				const TST_ELM5_GUID = '{BDD1CC2A-6A75-488b-995A-98751747BB74}';
			
				// Elements
				var left = 5;
				var pkg = repository.getPackage(TST_PKG_GUID);
				var elm1 = repository.getElement(TST_ELM1_GUID);
				var elm4 = repository.getElement(TST_ELM4_GUID);
				this.assertEquals(left, pkg.elements.count);
	
				pkg.elements.delete(elm1); 
				left--;
				this.assertEquals(left, pkg.elements.count);			
			
				pkg.elements.delete('element2');
				left--;
				this.assertEquals(left, pkg.elements.count);			
			
				pkg.elements.delete(0, ItemIdentifierType.Index); // element3
				left--;
				this.assertEquals(left, pkg.elements.count);			
			
				pkg.elements.delete(elm4.id, ItemIdentifierType.Id);	
				left--;
				this.assertEquals(left, pkg.elements.count);			
					
				pkg.elements.delete(TST_ELM5_GUID, ItemIdentifierType.Guid);
				left--;
				this.assertEquals(left, pkg.elements.count);			
			}
		
			testTraverseDepthFirst() {
			
				const TST_PKG_GUID = '{C8AC335A-B2D8-4241-83EE-B4EC5EA87226}';
			
				var pkg = repository.getPackage(TST_PKG_GUID);
			
				// Default options - all packages and elements
				var traversalString = '';
				pkg
				.traverseDepthFirst()
				.forEach(itm => {
					traversalString += itm.name + ', ';
				});
				var allPkgsAndElms = 'Package1, Package1.1, Package1.1.1, Element1.1.1.1, Element1.1.1.2, Package1.1.2, Element1.1.2.1, Element1.1.2.2, Package1.2, Package1.2.1, Element1.2.1.1, Element1.2.1.2, Package1.2.2, Element1.2.2.1, Element1.2.2.2, ';
				this.assertEquals(allPkgsAndElms, traversalString);
				
				// Provided 
				traversalString = '';
				pkg
				.traverseDepthFirst(TraversalUtil.traversePackagesOnly)
				.forEach(itm => {
					traversalString += itm.name + ', ';
				});
				var allPkgs = 'Package1, Package1.1, Package1.1.1, Package1.1.2, Package1.2, Package1.2.1, Package1.2.2, ';
				this.assertEquals(allPkgs, traversalString);
			}
		}
	
		// Declare namespace
		const NAMESPACE = 'ser.ea.repository';
	
		// Collate test classes
		var testClasses = [
			new TestRepository(),
			new TestPackage()
		];
	
		// Setup a local test runner
		var testRunner = new ser.unit.TestRunner();
		testRunner.testClassDetail = true;
		testRunner.testMethodDetail = true;
		testRunner.registerTestClasses(testClasses);
	
		// And register with global test runner
		ser.unit.context.runner.registerTestClasses(testClasses, NAMESPACE);
	
		// Module Export
		var module = {};
		module.testClasses = testClasses;
		module.testRunner = testRunner;
		namespace.registerModule(`${NAMESPACE}.tst`, module);
		return module;
	};

}//end ser_ea_repository_tst

