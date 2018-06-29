//=============================================================================
// Name: ser_ea_unit
//
// Auth: Vicente Iborra
//
// Desc: 
//
//=============================================================================
!INC Ser-Scripts-Src.ser
!INC Ser-Scripts-Src.ser_io
!INC Ser-Scripts-Src.ser_ea_unit
(function() {

	//=========================================================================
	// Establish namespace
	//=========================================================================
	var NS_STRING = "ea.unit"
	var module = ser.namespace(NS_STRING);

	//=========================================================================
	// Desc: This is a test class to tests the standard assert methods.
	//=========================================================================
	module.TestClass1 = function() {
		this.name = NS_STRING + "." + "TestClass1";
	}
	module.TestClass1.prototype = new ser.ea.unit.TestClass();

	module.TestClass1.prototype.testAssertNull = function() {
		this.assertNull(null, "nothing should appear");
	}

	module.TestClass1.prototype.testAssertNotNull = function() {
		this.assertNotNull("a non null value", "nothing should appear");
	}

	module.TestClass1.prototype.testAssertTrue = function() {
		this.assertTrue(true, "nothing should appear");
		this.assertTrue(!false, "nothing should appear");
	}

	module.TestClass1.prototype.testAssertFalse = function() {
		this.assertFalse(false, "nothing should appear");
		this.assertFalse(!true, "nothing should appear");
	}

	module.TestClass1.prototype.testAssertEquals = function() {
		
		// Numbers
		var number1 = 1;
		var number2 = 1;
		this.assertEquals(number1, number2);
		
		// Strings
		var string1 = "a string";
		var string2 = "a string";
		this.assertEquals(string1, string2);
	}

	module.TestClass1.prototype.testAssertThrows = function(closure) {
		this.assertThrows(Error, function(){
			throw new Error("blah");
		});
	}
	
	module.TestClass1.prototype.testAssertInstanceOf = function() {
		var value = new module.TestClass();
		this.assertInstanceOf(value, module.TestClass, "nothing should appear");
	}

	//=========================================================================
	// Desc: This is a secondary test class so that we have more than one.
	//       That is, so that we can test multiple test classes.
	//=========================================================================
	module.TestClass2 = function() {
		this.name = "ea.unit.tst.TestClass2";
	}
	module.TestClass2.prototype = new ser.ea.unit.TestClass();

	module.TestClass2.prototype.testOneThing = function() {
		this.assertTrue(true, "nothing should appear");
	}

	//=========================================================================
	// Desc: This section registers the test classes in this module with the
	//       default test runner.
	//=========================================================================
	ser.ea.unit.testRunner.registerTestClasses([
		new module.TestClass1(),
		new module.TestClass2()
	]);

	//=========================================================================
	// Desc: This section uses the default test runner to run the tests in this
	//       module.  That is, runs the registered tests in single mode.
	//=========================================================================
	ser.ea.unit.testRunner.runTests("single");
	
})();