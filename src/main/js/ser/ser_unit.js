function ser_unit(manager, instanceName) {

	/// 
	/// <param name="imp"></param>
	this.getModule = function(imp){

		// Perform module imports
		namespace.include(ser_io);
		namespace.include(ser_ea_context);
		namespace.include(ser_ms_Scripting_FileSystemObject);
	
		// Local synonyms
		let RepositoryType = ser.ea.constants.RepositoryType;
		let IoFactory = ser.io.Factory;
		let repository = ser.ea.context.repository;
		let fileSystem = ser.ms.Scripting.FileSystemObject.context.fileSystem;
	
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
	
		//=========================================================================
		// Desc: A generic TestError exception class.  It is thrown by the assert
		//       methods in the TestClass class.
		//=========================================================================
		class TestError {
		
			//-------------------------------------------------------------------------
			// Desc: Class constructor.
			//
			// Args: None
			//
			// Retn: N/A
			//-------------------------------------------------------------------------
			constructor(message) {
				this.message = message;
				this.testClassName = null;
				this.testMethodName = null;
			}
		}
	
		class UnderConstructionError extends TestError {
		
			constructor(message) {
				super(message);
			}
		}
	
		//=========================================================================
		// Desc: A test unit class.  Users of this module will extend this class
		//       to define the specific test classes.
		//=========================================================================
		class TestClass {
		
			//-------------------------------------------------------------------------
			// Desc: Class constructor.  Sets the class name - to be overwritten by
			//       extending classes, for debugging purposes.
			//
			// Args: None
			//
			// Retn: N/A
			//-------------------------------------------------------------------------
			constructor() {
				this.namespace = "ser.ea.unit";
				this.interactiveTestMethods = [];
			}
	
			//-------------------------------------------------------------------------
			// Desc: Set up method.  To be run prior to running each test method.  Note
			//       that extending classes may overwrite this method.
			//
			// Args: None
			//
			// Retn: Nothing
			//-------------------------------------------------------------------------
			setUp() {
			}
	
			//-------------------------------------------------------------------------
			// Desc: Tear down method.  To be run after running each test method.  Note
			//       that extending classes may overwrite this method.
			//
			// Args: None
			//
			// Retn: Nothing
			//-------------------------------------------------------------------------
			tearDown() {
			}
		
			//-------------------------------------------------------------------------
			// Desc: This routine ensures that a valid message is output to the user.
			//
			// Args: message (I) Message provided by the caller.
			//
			// Retn: The provided message or the canned string "no comment".
			ensureValidMsg(message) {
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
			assertNull(value, message) {
				if (value != null) {
					throw new TestError("Expected null: " + this.ensureValidMsg(message));
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
			assertNotNull(value, message) {
				if (!value || value == null) {
					throw new TestError("Expected not null: " + this.ensureValidMsg(message));
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
			assertTrue(value, message) {
				if (!value) {
					throw new TestError("Expected true: " + this.ensureValidMsg(message));
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
			assertFalse(value, message) {
				if (value) {
					throw new TestError("Expected value: " + this.ensureValidMsg(message));
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
			assertEquals(expected, actual, message) {
	
				var isEquals = false;
				switch(typeof actual) {
					case 'boolean':
					case 'number':
					case 'string':
					case 'undefined':
						isEquals = (expected == actual);
						break;
				
					case 'function':
						isEquals = false; // Todo
						break;
				
					case 'object':
						if ('equals' in actual) {
							isEquals = actual.equals(expected);
						}
						break;
				}
			
				if (!isEquals) {
					throw new TestError("Expected " + expected + " but got " + actual + ": " + this.ensureValidMsg(message));
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
			assertThrows(expectedExceptionType, closure, message) {
			
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
					throw new TestError(
						"Exception of type " + expectedExceptionType
						+ " expected, but caught exception of type "
						+ exception.constructor
						+ ": " + exception.message);
				}
			
				if (!exceptionHappened) {
					throw new TestError("Expected exception not thrown");
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
			assertInstanceOf(value, expectedType, message) {
				if (value instanceof expectedType) {
					return;
				}
				throw new TestError("Value is not of expected type: " + message + "."); 
			}
		
			underConstruction(message) {
				var msg = 'Under Construction';
				if (message != null) {
					msg += ': ' + message;
				}
				throw new UnderConstructionError(msg);
			}
		}
	
		// TODO: Description
		class FixtureManager {
		
			constructor() {
				this.readWritePkgGuid = '{70B20676-3CC8-48de-A87E-B79238F9E497}';
			}
		
			load(testClass, method) {
			
				// Get the root filesystem directory for the repository
				switch(repository.repositoryType.code) {
					case RepositoryType.Jet.code:
					
						// Find corresponding fixture file
					    var path = fileSystem.getParentFolderName(repository.connectionString);		
						var fileName = path + '\\data\\test\\fixtures\\' + testClass.namespace + '\\' + testClass.className + '\\' + method + '.xml';
						if (!fileSystem.fileExists(fileName)) {
							return;
						}
					
						// Details of the package
						var readWritePkg = repository.getPackage(this.readWritePkgGuid);
						if (readWritePkg == null) { return; }
						var namespacePkg = readWritePkg.packages.get(testClass.namespace);
						if (namespacePkg == null) { return; }
						var testClassPkg = namespacePkg.packages.get(testClass.className);
						if (testClassPkg == null) { return; }
						var methodPkg = testClassPkg.packages.get(method);
						if (methodPkg == null) { return; }
						
						// Load from file
						var project = repository.getProjectInterface();
						var msg = project.importPackageXMI(
							methodPkg.guid,
							fileName,
							1,  // Load Diagrams
							0  // Don't strip GUIDs
						);
	
						break;
					default:
						dbg('Cannot load the fixture for this repository type. TODO: throw an exception here');
						break;
				}
			}
		}
	
		//=========================================================================
		// Desc: A test runner class.  Given a set of tests it runs them and
		//       returns some statistics.
		//=========================================================================
		class TestRunner {
	
			//-------------------------------------------------------------------------
			// Desc: Class constructor.
			//
			// Args: None
			//
			// Retn: N/A
			//-------------------------------------------------------------------------
			constructor() {
				this.mode = "single";
				this.console = null;
				this.testClassDetail = false;
				this.testMethodDetail = false;
				this.ignoreUnderConstructionErrors = true;
				this.skipInteractiveTestMethods = false;
				this.tests = new Array();
				this.fixtureManager = null;
			}
		
			//-------------------------------------------------------------------------
			// TODO
			//-------------------------------------------------------------------------
			ensureTestsArrayInitialised() {
				this.tests = this.tests || new Array();
			}
	
			//-------------------------------------------------------------------------
			// TODO
			//-------------------------------------------------------------------------
			ensureValidConsole() {
			
				// Nothing to do, if everything is fine
				if (this.console != null) {
					return;
				}
			
				// Setup a default console for use with a global test runner
				var ioFactory = new IoFactory();
				var eaConsole = ioFactory.newEaOutputConsole('Script');
				this.console = eaConsole;
			}
		
			// TODO: Description
			ensureValidFixtureManager() {
				if (this.fixtureManager != null) {
					return;
				}
				this.fixtureManager = new FixtureManager();
			}
	
			//-------------------------------------------------------------------------
			// Desc: This routine is used by callers to register a test class with the
			//       test runner.
			//
			// Args: testClass (I) TestClass to register
			//
			// Retn: Nothing
			//-------------------------------------------------------------------------
			registerTestClass(testClass) {
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
			registerTestClasses(testClasses, namespaceStr) {
				this.ensureTestsArrayInitialised();
				testClasses.forEach(testClass => testClass.namespace = namespaceStr);
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
			runTestsIrrespectiveOfMode() {
	
				// Make sure we have what we need to do this.
				this.ensureValidConsole();
				this.ensureValidFixtureManager();
			
				this.console.clear();
				this.console.writeLine("Running tests:");							
			
				var testsRun = 0;
				var failures = new Array();
				var underConstructionFailures = new Array();
				var errors = new Array();
				var skippedDueToBeingInteractive = new Array();
			
				for (var idx=0; idx<this.tests.length; idx++) {
				
					if (this.testClassDetail) {
						this.console.writeLine('> ' + this.tests[idx].className + ":");
					}
				
					var meths = Object.getOwnPropertyNames(Object.getPrototypeOf(this.tests[idx]));
					meths.forEach(meth => {
						var re = /test.+/;
						if (re.test(meth)) {
							testsRun++;
							try {
								if (this.testMethodDetail) {
									this.console.writeLine(">> " + meth + ":");
								}
								if (this.tests[idx].interactiveTestMethods.contains(meth)
								&&  this.skipInteractiveTestMethods) {
									this.console.write('i');							
									skippedDueToBeingInteractive.push({
										testClassName: this.tests[idx].className,
										testMethodName: meth
									});
								}
								else {
									this.fixtureManager.load(this.tests[idx], meth);
									this.tests[idx].setUp();
									this.tests[idx][meth]();
									this.tests[idx].tearDown();
									this.console.write('. ');							
								}
							}
							catch (testError) {
								if (testError instanceof UnderConstructionError
								&&  this.ignoreUnderConstructionErrors) {
									underConstructionFailures.push(testError);
									this.console.writeLine('f');
								}
								else if (testError instanceof TestError) {
									testError.testClassName = this.tests[idx].className;
									testError.testMethodName = meth;
									failures.push(testError);				
									this.console.write('F ');							
								}
								else {
									var exceptionError = new TestError();
									exceptionError.message = testError;
									exceptionError.testClassName = this.tests[idx].className;
									exceptionError.testMethodName = meth;
									errors.push(exceptionError);
									this.console.write('E ');
								}
							}
						}
					});
				}
			
				if (failures.length==0 && errors.length==0) {
					this.console.writeLine("\n");
					var str = 'OK (' + testsRun + ' tests';
					if (underConstructionFailures.length != 0) {
						str += ', ' + underConstructionFailures.length + ' under construction';
					}
					if (skippedDueToBeingInteractive.length != 0) {
						str += ', ' + skippedDueToBeingInteractive.length + ' interactive/skipped';
					}
					str += ')';
					this.console.writeLine(str);
				}
				else {
					this.console.writeLine("\n");
					if (errors.length > 0) {
						this.console.writeLine("There was " + errors.length + " errors:");					
						for(var idx=0; idx<errors.length; idx++) {
							this.console.writeLine((idx+1) + ") " + errors[idx].message + '[' + errors[idx].testClassName + '.' + errors[idx].testMethodName + ']');
							this.console.writeLine("\n");			
						}
					}
					if (failures.length > 0) {
						this.console.writeLine("There was " + failures.length + " failures:");					
						for(var idx=0; idx<failures.length; idx++) {
							this.console.writeLine((idx+1) + ") " + failures[idx].message + ' [' + failures[idx].testClassName + '.' + failures[idx].testMethodName + ']');
							this.console.writeLine("\n");			
						}
					}
					this.console.writeLine("FAILURES!!!");
					var str = 'Tests run: ' + testsRun + ', Failures: ' + failures.length + ', Errors: ' + errors.length;
					if (this.ignoreUnderConstructionErrors) {
						str += ', Under Construction: ' + underConstructionFailures.length;
					}
					if (skippedDueToBeingInteractive.length != 0) {
						str += ', Interactive/skipped: ' + skippedDueToBeingInteractive.length;
					}		
					this.console.writeLine(str);
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
			runTests(mode) {
				if (mode == this.mode) {
					this.runTestsIrrespectiveOfMode();
				}
			}
		}
	
		class Helper {
		
			constructor() {
				this.globalTestRunner = null;
			}
		
			declareTestModule(namespaceUnderTest, testClasses) {
			
				// Create namespace for this module
				var namespaceStr = `${namespaceUnderTest}.tst`;
			
				// Setup a local test runner
				var testRunner = new TestRunner();
				testRunner.testClassDetail = false;
				testRunner.testMethodDetail = false;
				
				//  Instantiate 
				var instances = [];
				testClasses.forEach(tc => instances.push(new tc()));
			
				// And register them with local and global test runner
				testRunner.registerTestClasses(instances);
				this.globalTestRunner.registerTestClasses(instances, namespaceStr);
			
				// Module Export
				var module = {};
				module.testClasses = testClasses;
				module.testRunner = testRunner;
				namespace.registerModule(namespaceStr, module);
				return module;
			}
		}
	
		// Setup a global test runner
		
		var testRunner = new TestRunner();
		testRunner.mode = 'multiple';
		testRunner.testClassDetail = true;
		testRunner.testMethodDetail = true;
		testRunner.skipInteractiveTestMethods = true;
	
		var helper = new Helper();
		helper.globalTestRunner = testRunner;
	
		// Setup module context
		var context = {
			runner: testRunner, // refer to call to a factory
			testRunner: testRunner,
			helper: helper // refer to call to a factory
		};
	
		// Module Export
		var module = {};
		module.TestError = TestError;
		module.UnderConstructionError = UnderConstructionError;
		module.TestClass = TestClass;
		module.TestRunner = TestRunner;
		module.context = context;
		namespace.registerModule('ser.unit', module);
		return module;
	
	};

}//end ser_unit

