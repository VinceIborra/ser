//=============================================================================
// Name: ser_eaunit (ser.eaunit)
//
// Auth: Vicente Iborra
//
// Desc: This module defines the ser.ea.unit module.  A module that holds the
//       following.
//       * The TestClass class - To be used by users to define their own test
//         classes.  It holds a variety of assert methods to help when writing
//         tests.
//       * The TestRunner class - A simple test runner which runs all the
//         registered classes.
//       * testRunner variable - A reference to an instance of the TestRunner
//         class.  
//=============================================================================
!INC Local Scripts.EAConstants-JScript
!INC Ser-Scripts-Src.ser
!INC Ser-Scripts-Src.ser_io
(function() {

	//=========================================================================
	// Establish namespace
	//=========================================================================
	var NS_STRING = "ser.ea.unit";
	var lns = ser.namespace(NS_STRING);

	//=========================================================================
	// Desc: A generic TestError exception class.  It is thrown by the assert
	//       methods in the TestClass class.
	//=========================================================================
	
	//-------------------------------------------------------------------------
	// Desc: Class constructor.
	//
	// Args: None
	//
	// Retn: N/A
	//-------------------------------------------------------------------------
	lns.TestError = function(message) {
		this.message = message;
	}

	//=========================================================================
	// Desc: A test unit class.  Users of this module will extend this class
	//       to define the specific test classes.
	//=========================================================================
	
	//-------------------------------------------------------------------------
	// Desc: Class constructor.  Sets the class name - to be overwritten by
	//       extending classes, for debugging purposes.
	//
	// Args: None
	//
	// Retn: N/A
	//-------------------------------------------------------------------------
	lns.TestClass = function() {
		this.name = "vji.ea.unit.TestClass";
	}

	//-------------------------------------------------------------------------
	// Desc: Set up method.  To be run prior to running each test method.  Note
	//       that extending classes may overwrite this method.
	//
	// Args: None
	//
	// Retn: Nothing
	//-------------------------------------------------------------------------
	lns.TestClass.prototype.setUp = function() {
	}

	//-------------------------------------------------------------------------
	// Desc: Tear down method.  To be run after running each test method.  Note
	//       that extending classes may overwrite this method.
	//
	// Args: None
	//
	// Retn: Nothing
	//-------------------------------------------------------------------------
	lns.TestClass.prototype.tearDown = function() {
	}
	
	//-------------------------------------------------------------------------
	// Desc: This routine ensures that a valid message is output to the user.
	//
	// Args: message (I) Message provided by the caller.
	//
	// Retn: The provided message or the canned string "no comment".
	lns.TestClass.prototype.ensureValidMsg = function(message) {
		return message || "no comment";
	}
	
	//-------------------------------------------------------------------------
	// Desc: Assertion method that tests whether a value is null.
	//
	// Args: message (I) User's customised error message
	//       value   (I) Value to be tested.
	//
	// Retn: Nothing
	//-------------------------------------------------------------------------
	lns.TestClass.prototype.assertNull = function(value, message) {
		if (value != null) {
			throw new lns.TestError("Expected null: " + this.ensureValidMsg(message));
		}
	}

	//-------------------------------------------------------------------------
	// Desc: Assertion method that tests whether a value is not null.
	//
	// Args: message (I) User's customised error message
	//       value   (I) Value to be tested.
	//
	// Retn: Nothing
	//-------------------------------------------------------------------------
	lns.TestClass.prototype.assertNotNull = function(value, message) {
		if (!value || value == null) {
			throw new lns.TestError("Expected not null: " + this.ensureValidMsg(message));
		}
	}

	//-------------------------------------------------------------------------
	// Desc: Assertion method that tests whether a value is true.
	//
	// Args: message (I) User's customised error message
	//       value   (I) Value to be tested.
	//
	// Retn: Nothing
	//-------------------------------------------------------------------------
	lns.TestClass.prototype.assertTrue = function(value, message) {
		if (!value) {
			throw new lns.TestError("Expected true: " + this.ensureValidMsg(message));
		}
	}

	//-------------------------------------------------------------------------
	// Desc: Assertion method that tests whether a value is false.
	//
	// Args: message (I) User's customised error message
	//       value   (I) Value to be tested.
	//
	// Retn: Nothing
	//-------------------------------------------------------------------------
	lns.TestClass.prototype.assertFalse = function(value, message) {
		if (value) {
			throw new lns.TestError("Expected value: " + this.ensureValidMsg(message));
		}
	}

	//-------------------------------------------------------------------------
	// Desc:  Assertion method that tests whether the expected and actual
	//        values are equal.
	//
	// Args:  expected (I) Expected value
	//        actual   (I) Actual value
	//
	// Retn: Nothing
	//-------------------------------------------------------------------------
	lns.TestClass.prototype.assertEquals = function(expected, actual, message) {
		if (expected != actual) {
			throw new lns.TestError("Expected " + expected + " but got " + actual + ": " + this.ensureValidMsg(message));
		}
	}

	//-------------------------------------------------------------------------
	// Desc: Assertion method that tests that the give closure (code block)
	//       thrown an exception.
	//
	// Args: expectedExceptionType (I) Type of exception expected.
	//       closure               (I) Closure to be checked for exceptions
	//
	// Retn: Nothing
	//-------------------------------------------------------------------------
	lns.TestClass.prototype.assertThrows = function(expectedExceptionType, closure, message) {
		
		this.assertNotNull(expectedExceptionType, "Caller must provide a valid expected exception: " + this.ensureValidMsg(message));

		var exceptionHappened = true;
		try {
			closure();
			exceptionHappened = false;
		}
		catch (exception) {
			if (exception instanceof expectedExceptionType) {
				return;
			}
			throw new lns.TestError(
				"Exception of type " + expectedExceptionType
				+ " expected, but caught exception of type "
				+ exception.constructor
				+ ": " + exception.message);
		}
		
		if (!exceptionHappened) {
			throw new lns.TestError("Expected exception not thrown");
		}
	}
	
	//-------------------------------------------------------------------------
	// Desc: Assetion method that tests that a value is an instance of a
	//       particular class
	//
	// Args: value        (I) Value to be tested.
	//       expectedType (I) Constructor of expected type
	//       message      (I) Additional message to display
	//
	// Retn: Nothing
	//-------------------------------------------------------------------------
	lns.TestClass.prototype.assertInstanceOf = function(value, expectedType, message) {
		if (value instanceof expectedType) {
			return;
		}
		throw new lns.TestError("Value is not of expected type: " + message + "."); 
	}

	//=========================================================================
	// Desc: A test runner class.  Given a set of tests it runs them and
	//       returns some statistics.
	//=========================================================================

	//-------------------------------------------------------------------------
	// Desc: Class constructor.
	//
	// Args: None
	//
	// Retn: N/A
	//-------------------------------------------------------------------------
	lns.TestRunner = function() {
		this.mode = "single";
		this.console = null;
		this.testClassDetail = false;
		this.testMethodDetail = false;
		this.tests = new Array();
	}
	
	//-------------------------------------------------------------------------
	// TODO
	//-------------------------------------------------------------------------
	lns.TestRunner.prototype.ensureTestsArrayInitialised = function() {
		this.tests = this.tests || new Array();
	}

	//-------------------------------------------------------------------------
	// TODO
	//-------------------------------------------------------------------------
	lns.TestRunner.prototype.ensureValidConsole = function() {
		
		// Nothing to do, if everything is fine
		if (this.console != null) {
			return;
		}
		
		// Use default console if that is provided by the environment
		// TODO
		
		// Default to the EA console if no other choice
		this.console = new vji.io.EaOutputConsole();
	}

	//-------------------------------------------------------------------------
	// Desc: This routine is used by callers to register a test class with the
	//       test runner.
	//
	// Args: testClass (I) TestClass to register
	//
	// Retn: Nothing
	//-------------------------------------------------------------------------
	lns.TestRunner.prototype.registerTestClass = function(testClass) {
		this.ensureTestsArrayInitialised();
		this.tests.push(testClass);
	}

	//-------------------------------------------------------------------------
	// Desc: This routine is used by callers to register test classes with the
	//       test runner.
	//
	// Args: testClasses (I) Array of TestClass to register
	//
	// Retn: Nothing
	//-------------------------------------------------------------------------
	lns.TestRunner.prototype.registerTestClasses = function(testClasses) {
		this.ensureTestsArrayInitialised();
		this.tests = this.tests.concat(testClasses);
	}
	
	//-------------------------------------------------------------------------
	// Desc: This routine runs the registered tests irrespective of the mode
	//       set for the runner.
	// 
	// Args: None
	//
	// Retn: Nothing
	//-------------------------------------------------------------------------
	lns.TestRunner.prototype.runTestsIrrespectiveOfMode = function() {
		
		// Make sure we have what we need to do this.
		this.ensureValidConsole();
		
		this.console.writeLine("Running tests:");								
		
		var testsRun = 0;
		var failures = new Array();
		var errors = new Array();
		
		for (var idx=0; idx<this.tests.length; idx++) {
			
			if (this.testClassDetail) {
				this.console.writeLine("> " + this.tests[idx].name + ":");
			}
			
			for(var meth in this.tests[idx]) {
				var re = /test.+/;
				if (re.test(meth)) {
					testsRun++;
					try {
						if (this.testMethodDetail) {
							this.console.writeLine(">> " + meth + ":");
						}
						this.tests[idx].setUp();
						this.tests[idx][meth]();
						this.tests[idx].tearDown();
						this.console.write(".");								
					}
					catch (testError) {
						if (testError instanceof vji.ea.unit.TestError) {
							failures.push(testError);					
							this.console.write("F");								
						}
						else {
							if (testError instanceof Error) {
								errors.push(testError.message);
							}
							else {
								errors.push(testError);
							}
							this.console.write("E");
						}
					}
				}
			}
		}
		
		if (failures.length==0 && errors.length==0) {
			this.console.writeLine("\n");
			this.console.writeLine("OK (" + testsRun + " tests)");
		}
		else {
			this.console.writeLine("\n");
			if (errors.length > 0) {
				this.console.writeLine("There was " + errors.length + " errors:");						
				for(var idx=0; idx<errors.length; idx++) {
					this.console.writeLine((idx+1) + ") " + errors[idx].toString());	
					this.console.writeLine("\n");				
				}
			}
			if (failures.length > 0) {
				this.console.writeLine("There was " + failures.length + " failures:");						
				for(var idx=0; idx<failures.length; idx++) {
					this.console.writeLine((idx+1) + ") " + failures[idx].message);	
					this.console.writeLine("\n");				
				}
			}
			this.console.writeLine("FAILURES!!!");
			this.console.writeLine("Tests run: " + testsRun
								 + ", Failures: " + failures.length 
								 + ", Errors: " + errors.length);
		}
		this.console.writeLine();
	}

	//-------------------------------------------------------------------------
	// Desc: This routine runs the registered tests but only if the passed mode
	//       is the same as that set for the runner.
	//
	// Args: mode (I) String giving the running mode.
	//
	// Retn: Nothing
	//-------------------------------------------------------------------------
	lns.TestRunner.prototype.runTests = function(mode) {
		if (mode == this.mode) {
			this.runTestsIrrespectiveOfMode();
		}
	}
	
	//=========================================================================
	// Desc: The following are a set of module level variables.
	//       * testRunner - A default runner.  May either be used by individual
	//         test modules in "single" mode or may be used by aggregating
	//         test modules to run multiple tests in "all" mode.
	//=========================================================================
	lns.testRunner = new lns.TestRunner();
		
}());