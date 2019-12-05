function ser_ea_native_elementFeature_tst(manager, instanceName) {

	this.getModule = function(){

		// Perform module imports
		namespace.include(ser_unit);
		namespace.include(ser_ea_context);
	
		// Local synonyms
		let TestClass = ser.unit.TestClass;
	
		class TestMethod extends TestClass {
	
			constructor() {
				super();
			}
		
			testAttributes() {
			
				const TST_MTH_GUID = '{DAE80E68-D09D-4e6c-BAE1-6D00ABD004AC}';
			
				var mth = Repository.GetMethodByGuid(TST_MTH_GUID);
			
				this.assertEquals('aMethod', mth.Name);
			
				dbg(mth.Code);
			}
		}
	
		// Declare namespace
		const NAMESPACE = 'ser.ea.native.elementFeature';
	
		// Collate test classes
		var testClasses = [
			new TestMethod()
		];
	
		// Setup a local test runner
		var testRunner = new ser.unit.TestRunner();
		testRunner.testClassDetail = false;
		testRunner.testMethodDetail = false;
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

}//end ser_ea_native_elementFeature_tst

