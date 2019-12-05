function ser_js_tst(manager, instanceName) {

	this.getModule = function(){

		namespace.include(ser_js);
	
		// Local synonyms
		let TestClass = ser.unit.TestClass;
	
		class TestStringExtensions extends TestClass {
	
			constructor() {
				super();
				this.name = "ser.js.tst.TestStringExtensions";
			}
		
			testIsCapitalized() {
				this.assertTrue('Abc'.isCapitalized());
				this.assertFalse('abc'.isCapitalized());
			}
		
			testCapitalize() {
				this.assertEquals('Abc', 'abc'.capitalize());
				this.assertEquals('Abc', 'Abc'.capitalize());
			}
		}
	
		class TestArrayExtensions extends TestClass {
	
			constructor() {
				super();
				this.name = "ser.js.tst.TestArrayExtensions";
			}
		
			testEquals() {
			
				// Numbers
				this.assertTrue([1, 2, 3].equals([1, 2, 3]));
				this.assertFalse([1, 2, 3].equals([4, 5, 6]));
			
				// Boolean
				this.assertTrue([true, false, true].equals([true, false, true]));
				this.assertFalse([true, false, true].equals([true, true, true]));
			
				// Strings
				this.assertTrue(['abc', 'cde', 'efg'].equals(['abc', 'cde', 'efg']));
				this.assertFalse(['abc', 'cde', 'efg'].equals(['abc', 'xxx', 'efg']));
		
				// Objects
				dbg('testing objects');
				class AClass {
					constructor(value) { this.value = value; }		
					equals(other) { return other.value == this.value; }
				}
				var obj1 = new AClass('abc');
				var obj2 = new AClass('cde');
				var obj3 = new AClass('efg');
				this.assertTrue([obj1, obj2, obj3].equals([obj1, obj2, obj3]));
				this.assertFalse([obj1, obj2, obj3].equals([obj1, obj2, obj2]));
	
				this.underConstruction('Still outstanding: symbol, undefined, function');
			}
		
			testContains() {
			
				// Boolean
				const booleanArray = [true, true, true];
				this.assertTrue(booleanArray.contains(true));
				this.assertFalse(booleanArray.contains(false));
			
				// Number
				const numberArray = [123, 456, 789];
				this.assertTrue(numberArray.contains(789));
				this.assertFalse(numberArray.contains(111));
			
				// String
				const stringArray = ['abc', 'cde', 'efg'];
				this.assertTrue(stringArray.contains('efg'));
				this.assertFalse(stringArray.contains('zzz'));
	
				// Object
				class Person {
				
					constructor(first, last) {
						this.first = first;
						this.last = last;
					}
				
					equals(person) {
						return (person.first == this.first && person.last == this.last);
					}
				}
	
				const objectArray = [
					new Person('Milton', 'Friedman'),
					new Person('John', 'Galbraith'),
					new Person('Adam', 'Smith')
				];
	
				this.assertTrue(objectArray.contains(new Person('Adam', 'Smith')));
				this.assertFalse(objectArray.contains(new Person('John', 'Doe')));
			
				// Undefined
				this.underConstruction('Need to test array of undefined');
			
				// Function
				this.underConstruction('Need to test array of functions');
			}
		}
	
		class TestObjectExtensions extends TestClass {
	
			constructor() {
				super();
				this.name = "ser.js.tst.TestObjectExtensions";
			}
		
			testClassNameGetter() {
			
				class SomeName1 {
					constructor() {
						this.attribute1 = 'abc';
						this.attribute2 = 'cde';
					}
				}
	
				class SomeName2 extends SomeName1 {
					constructor() {
						super();
						this.attribute3 = 'efg';
						this.attribute4 = 'ghi';
					}
				}
			
				var someName1 = new SomeName1();
				this.assertEquals('SomeName1', someName1.className);
			
				var someName2 = new SomeName2();
				this.assertEquals('SomeName2', someName2.className);
			}
		}
	
		// Collate test classes
		var testClasses = [
			new TestStringExtensions(),
			new TestArrayExtensions(),
			new TestObjectExtensions()
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
		namespace.registerModule('ser.js.tst', module);
		return module;
	};

}//end ser_js_tst

