//=============================================================================
// Name: ser_io
//
// Auth: Vicente Iborra
//
// Desc: This module tests the ser.io module.
//=============================================================================
!INC Ser-Scripts-Src.ser
!INC Ser-Scripts-Src.ser_io
!INC Ser-Scripts-Src.ser_ea_unit
(function() {

	//=========================================================================
	// Establish namespace
	//=========================================================================
	var NS_STRING = "ser.io.tst";
	var module = ser.namespace(NS_STRING);

	//=========================================================================
	// Desc: This test class tests methods on the va.io.ArrayConsole class.
	//=========================================================================
	module.TestArrayConsole = function() {
		this.name = "ser.io.tst.TestArrayConsole";
	}
	module.TestArrayConsole.prototype = new ser.ea.unit.TestClass();

	//-------------------------------------------------------------------------
	// Desc: This tests the object creation method.
	//-------------------------------------------------------------------------
	module.TestArrayConsole.prototype.testObjectCreation = function() {
		var console = new ser.io.ArrayConsole();
		this.assertNotNull(console.output, "There should never be a null output");
	}

	//-------------------------------------------------------------------------
	// Desc: This tests the write method.
	//-------------------------------------------------------------------------
	module.TestArrayConsole.prototype.testWrite = function() {
		
		var console = new ser.io.ArrayConsole();
		
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
	module.TestArrayConsole.prototype.testWriteLine = function() {
		
		var console = new ser.io.ArrayConsole();
		
		console.writeLine("abc");
		this.assertEquals(1, console.output.length);
		this.assertEquals("abc", console.output[0]);
		
		console.writeLine("jkl");
		this.assertEquals(2, console.output.length);
		this.assertEquals("abc", console.output[0]);
		this.assertEquals("jkl", console.output[1]);
	}

	//=========================================================================
	// Desc: This section registers the test classes in this module with the
	//       default test runner.
	//=========================================================================
	ser.ea.unit.testRunner.registerTestClasses([
		new module.TestArrayConsole()
	]);

	//=========================================================================
	// Desc: This section uses the default test runner to run the tests in this
	//       module.  That is, runs the registered tests in single mode.
	//=========================================================================
	ser.ea.unit.testRunner.runTests("single");

})();
