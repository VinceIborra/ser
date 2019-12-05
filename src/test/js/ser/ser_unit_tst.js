function ser_unit_tst(manager, instanceName) {

	/// 
	/// <param name="imp"></param>
	this.getModule = function(imp){

		// Perform module imports
		namespace.include(ser_unit);
		namespace.include(ser_io);
	
		// Local synonyms
		let TestClass = ser.unit.TestClass;
		let TestError = ser.unit.TestError;
		let UnderConstructionError = ser.unit.UnderConstructionError;
	
		class ATestClass {
		}
	
		//=========================================================================
		// Desc: This is a test class to tests the standard assert methods.
		//=========================================================================
		class TestClass1 extends TestClass {
		
			constructor() {
				super()
				this.name = "ser.unit.tst.TestClass1";
			}
		
			testAssertNull() {
				this.assertNull(null, "nothing should appear");
			}
	
			testAssertNotNull() {
				this.assertNotNull("a non null value", "nothing should appear");
			}
	
			testAssertTrue() {
				this.assertTrue(true, "nothing should appear");
				this.assertTrue(!false, "nothing should appear");
			}
	
			testAssertFalse() {
				this.assertFalse(false, "nothing should appear");
				this.assertFalse(!true, "nothing should appear");
			}
	
			testAssertEquals() {
			
				// Boolean
				this.assertEquals(true, true);
				this.assertThrows(TestError, () => {
					this.assertEquals(true, false);
				});
			
				// Number
				this.assertEquals(1, 1);
				this.assertThrows(TestError, () => {
					this.assertEquals(1, 2);
				});
			
				// String
				this.assertEquals('abc', 'abc');
				this.assertThrows(TestError, () => {
					this.assertEquals('abc', 'cde');
				});
			
				// Undefined
				this.assertEquals(undefined, undefined);
				this.assertThrows(TestError, () => {
					this.assertEquals('something', undefined);
				});
				
				// Object
				var obj1 = {
					value: 123
				};
				var obj2 = {
					value: 456
				};
				var obj3 = {
					value: 123,
					equals: function(other) {
						return (other.value == this.value);
					}
				};
				this.assertEquals(obj1, obj3);
				this.assertThrows(TestError, () => {
					this.assertEquals(obj2, obj3);
				});
	
				// Function
				this.underConstruction('Need to test equals for a function');
			}
	
			testAssertThrows(closure) {
				this.assertThrows(Error, function(){
					throw new Error("blah");
				});
			}
		
			testAssertInstanceOf() {
				var value = new ATestClass();
				this.assertInstanceOf(value, ATestClass, "nothing should appear");
			}
		
			testUnderConstruction() {
				try {
					this.underConstruction('some message');
					this.fail('underConstruction() method failed to work as expected');
				}
				catch(error) {
					this.assertInstanceOf(error, UnderConstructionError);
					this.assertEquals('Under Construction: some message', error.message);
				}
			}
		}
	
		//=========================================================================
		// Desc: This is a secondary test class so that we have more than one.
		//       That is, so that we can test multiple test classes.
		//=========================================================================
		class TestClass2 extends TestClass {
		
			constructor() {
				super();
				this.name = "ser.unit.tst.TestClass2";
			}
		
			testOneThing() {
				this.assertTrue(true, "nothing should appear");
			}
		}
	
		// Collate test classes
		var testClasses = [
			new TestClass1(),
			new TestClass2()
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
		namespace.registerModule('ser.unit.tst', module);
		return module;
	
	};

}//end ser_unit_tst

