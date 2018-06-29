//=============================================================================
// Name: ser
//
// Auth: Vicente Iborra
//
// Desc: This module tests the ser module.
//=============================================================================
!INC Ser-Scripts-Src.ser
!INC Ser-Scripts-Src.ser_io
!INC Ser-Scripts-Src.ser_ea_unit
(function() {

	//=========================================================================
	// Establish namespace
	//=========================================================================
	var NS_STRING = "ser";
	var module = ser.namespace(NS_STRING);

	//=========================================================================
	// Desc: This test class tests methods on the va.ea.Repository class.
	//=========================================================================

	//-------------------------------------------------------------------------
	// Desc: Class constructor.
	//
	// Args: None
	//
	// Retn: N/A
	//-------------------------------------------------------------------------
	module.TestSer = function() {
		this.name = NS_STRING + "." + "TestSer";
	}
	module.TestSer.prototype = new ser.ea.unit.TestClass();

	//-------------------------------------------------------------------------
	// Desc: This test covers the happy path for the findPackage method.
	//
	// Args: None
	//
	// Retn: Nothing
	//-------------------------------------------------------------------------
	module.TestSer.prototype.testNamespacing = function() {
		
		ser.namespace("ser.bob");
		
		this.assertNotNull(ser, "ser shouldn't be null");	
		this.assertNotNull(ser.bob, "ser.bob shouldn't be null");	
		
		this.assertTrue(ser.namespaceDefined("ser"), "ser should be defined");
		this.assertTrue(ser.namespaceDefined("ser.bob"), "ser.bob should be defined");
		this.assertFalse(ser.namespaceDefined("ser.fred"), "ser.fred should not be defined");
	}
	
	//=========================================================================
	// Desc: This section registers the test classes in this module with the
	//       default test runner.
	//=========================================================================
    ser.ea.unit.testRunner.registerTestClasses([
		new module.TestSer
	]);

	//=========================================================================
	// Desc: This section uses the default test runner to run the tests in this
	//       module.  That is, runs the registered tests in single mode.
	//=========================================================================
	ser.ea.unit.testRunner.runTests("single");

})();