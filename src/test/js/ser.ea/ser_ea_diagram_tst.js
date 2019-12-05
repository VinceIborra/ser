function ser_ea_diagram_tst(manager, instanceName) {

	this.getModule = function(){

		// Perform module imports
		namespace.include(ser_unit);
	
		// Local synonyms
		let TestClass = ser.unit.TestClass;
	
		let repository = ser.ea.context.repository;
	
		class TestDiagramWrapper extends TestClass {
	
			constructor() {
				super();
			}
		
			testActivate() {
			
				const TST_DGM1_GUID = '{EB357BF8-45BD-439a-9B08-999989B73BE6}';
				const TST_DGM2_GUID = '{8EF0A2D9-7A99-4bf0-BB0F-4B7EF9554E0E}';
			
				var dgm1 = repository.getDiagram(TST_DGM1_GUID);
				var dgm2 = repository.getDiagram(TST_DGM2_GUID);
				var activeDiagram = null;
			
				dgm1.open();
				dgm2.open();
			
				dgm1.activate();
				activeDiagram = repository.getCurrentDiagram();
				this.assertEquals(activeDiagram.guid, dgm1.guid);
			
				dgm2.activate();
				activeDiagram = repository.getCurrentDiagram();
				this.assertEquals(activeDiagram.guid, dgm2.guid);
	
				dgm1.close();
				dgm2.close();
			}
	
			testSelectedObjects() {
			
				const TST_ELM1_GUID = '{5ECBE130-5D01-4219-85D4-AD99F4FBBE8F}';
				const TST_ELM2_GUID = '{D9A134DA-7B76-453f-9A53-1AC5499DD948}';
				const TST_DGM_GUID = '{D37D9797-9878-49b5-9A80-9FDE33DE1732}';
	
				var dgm = repository.getDiagram(TST_DGM_GUID);
				var elm1 = repository.getElement(TST_ELM1_GUID);
				var elm2 = repository.getElement(TST_ELM2_GUID);
			
				dgm.open();
			
				dgm.selectedObjects.addNew({element: elm1});
				
				this.assertEquals(1, dgm.selectedObjects.count);
	
				dgm.close();
			}
		}
	
		class TestDiagramObjectWrapper extends TestClass {
	
			constructor() {
				super();
			}
		
			testAttributes() {
			
				const TST_DGM_GUID = '{4D06CA10-0795-4a33-8D38-DE283533D52F}';
				const TST_ELM_GUID = '{DF1362A9-A2EB-4918-A11A-13B2B8BA5CDF}';
	
				var dgm = repository.getDiagram(TST_DGM_GUID);
			
				var dob = dgm.diagramObjects.first();
			
				this.assertEquals(TST_ELM_GUID, dob.element.guid);
	
				// Still to do
				this.underConstruction('Not all attributes tested as yet.');
			}
		}
	
		// Declare namespace
		const NAMESPACE = 'ser.ea.diagram';
	
		// Collate test classes
		var testClasses = [
			new TestDiagramWrapper(),
			new TestDiagramObjectWrapper()
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

}//end ser_ea_diagram_tst

