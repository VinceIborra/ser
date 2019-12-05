function ser_io_tst(manager, instanceName) {

	/// 
	/// <param name="imp">Imports</param>
	this.getModule = function(imp){

		// Perform module imports
		namespace.include(ser_unit);
		namespace.include(ser_io);
	
		// Local synonyms
		let TestClass = ser.unit.TestClass;
	
		//=========================================================================
		// Desc: This test class tests methods on the va.io.ArrayConsole class.
		//=========================================================================
		class TestArrayConsole extends TestClass {
	
			constructor() {
				super();
				this.name = "ser.io.tst.TestArrayConsole";
				this.factory = new ser.io.Factory();
			}
	
			//-------------------------------------------------------------------------
			// Desc: This tests the object creation method.
			//-------------------------------------------------------------------------
			testObjectCreation() {
				var console = this.factory.newArrayConsole();
				this.assertNotNull(console.output, "There should never be a null output");
			}
	
			//-------------------------------------------------------------------------
			// Desc: This tests the write method.
			//-------------------------------------------------------------------------
			testWrite() {
			
				var console = this.factory.newArrayConsole();
			
				console.write("abc");
				this.assertEquals(1, console.output.length);
				this.assertEquals("abc", console.output[0]);
			
				console.write("jkl");
				this.assertEquals(1, console.output.length);
				this.assertEquals("abcjkl", console.output[0]);
			}
	
			//-------------------------------------------------------------------------
			// Desc: This tests the writeLine method.
			//-------------------------------------------------------------------------
			testWriteLine() {
			
				var console = this.factory.newArrayConsole();
			
				console.writeLine("abc");
				this.assertEquals(1, console.output.length);
				this.assertEquals("abc", console.output[0]);
			
				console.writeLine("jkl");
				this.assertEquals(2, console.output.length);
				this.assertEquals("abc", console.output[0]);
				this.assertEquals("jkl", console.output[1]);
			}
		}
	
		// Collate test classes
		var testClasses = [
			new TestArrayConsole()
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
		namespace.registerModule('ser.io.tst', module);
		return module;
	
	};

}//end ser_io_tst

