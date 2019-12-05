function ser_context_tst(manager, instanceName) {

	this.getModule = function(){

		// Perform module imports
		namespace.include(ser_context);
	
		// Local synonyms
		let TestClass = ser.unit.TestClass;
		let factory = ser.factory;
	
		class TestNamespace extends TestClass {
	
			constructor() {
				super();
				this.name = "ser.context.tst.TestNamespace";
			}
		
			testRegisterModule() {
			
				var mockModule = { mockAttribute: 'got it'};
				var mockNamespaceStr = 'abc.cde.efg';
			
				var theNamespace = factory.newNamespace({isTopLevel: true});
				theNamespace.registerModule(mockNamespaceStr, mockModule);
			
				this.assertNotNull(globalThis.abc);
				this.assertTrue('got it', abc.cde.efg.mockAttribute);
			}
		}
	
		class TestFactory extends TestClass {
	
			constructor() {
				super();
				this.name = "ser.context.tst.TestFactory";
			}
		
			testNewNamespace() {
		
				var topLevelNamespace = factory.newNamespace({isTopLevel: true});
				this.assertNotNull(topLevelNamespace);
				this.assertTrue(topLevelNamespace.isTopLevel);
	
				var ordinaryNamespace = factory.newNamespace();
				this.assertNotNull(ordinaryNamespace);
				this.assertFalse(ordinaryNamespace.isTopLEvel);
			}
		}
	
		// Collate test classes
		var testClasses = [
			new TestNamespace(),
			new TestFactory()
		];
	
		// Setup a local test runner
		var testRunner = new ser.unit.TestRunner();
		testRunner.testClassDetail = true;
		testRunner.testMethodDetail = true;
		testRunner.registerTestClasses(testClasses);
	
		// And register with global test runner
		ser.unit.context.runner.registerTestClasses(testClasses);
	
		// Module Export
		var module = {};
		module.testClasses = testClasses;
		module.testRunner = testRunner;
		namespace.registerModule('ser.context.tst', module);
		return module;
	};

}//end ser_context_tst

