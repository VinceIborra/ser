function ser_ea_context_tst(manager, instanceName) {

	/// 
	/// <param name="namespaces"></param>
	this.getModule = function(namespaces){

		// Perform module imports
		namespace.include(ser_unit);
	
		// Local synonyms
		let TestClass = ser.unit.TestClass;
	
		//=========================================================================
		//=========================================================================
		class TestContext extends TestClass {
		
			constructor() {
				super();
				this.name = "ser.ea.context.tst.TestContext";
			}
		
			//-------------------------------------------------------------------------
			//-------------------------------------------------------------------------
			testSomething() {
				var ctx = namespace.ser.ea.context;
				this.assertNotNull(ctx.repository);
			}
		}
	
		// Collate test classes
		var testClasses = [
			new TestContext()
		];
	
		// Setup a local test runner
		var testRunner = new ser.unit.TestRunner();
		testRunner.registerTestClasses(testClasses);
	
		// And register with global test runner
		ser.unit.context.runner.registerTestClasses(testClasses);
	
		// Module Export
		var module = {};
		module.testClasses = testClasses;
		module.testRunner = testRunner;
		namespace.registerModule('ser.ea.context.tst', module);
		return module;
	
	};

}//end ser_ea_context_tst

