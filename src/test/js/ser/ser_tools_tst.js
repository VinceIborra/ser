function ser_tools_tst(manager, instanceName) {

	this.getModule = function(){

		// Local synonyms
		let TestClass = ser.unit.TestClass;
		let repository = ser.ea.context.repository;
	
		class TestTools extends TestClass {
	
			constructor() {
				super();
			}
		
			testFlattenDependencies() {
			
				const TST_ELM_GUID = '{5A22C09B-A4FA-4043-B513-199B8AD3FFB9}';
	
				var factory = new ser.tools.Factory();
				factory.repository = repository;
				var tools = factory.newTools();
				this.assertNotNull(tools);
	
				var elm = repository.getElement(TST_ELM_GUID);
				this.assertEquals(1, elm.connectors.count, 'Should only have 1 dependency to start with');
			
				repository.showInProjectView(elm);
				tools.flattenDependencies('TreeView');
			
				elm.reload();
				this.assertEquals(5, elm.connectors.count, 'Should have 5 dependencies after flattening');	
			}
		}
	
		class TestFactory extends TestClass {
	
			constructor() {
				super();
				this.name = "ser.tools.tst.TestFactory";
			}
		
			testNewTools() {
				var factory = new ser.tools.Factory();
				factory.repository = repository;
				var tools = factory.newTools();
				this.assertNotNull(tools);
			}
		}
	
		// Declare namespace
		const NAMESPACE = 'ser.tools';
	
		// Collate test classes
		var testClasses = [
			new TestTools(),
			new TestFactory()
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

}//end ser_tools_tst

