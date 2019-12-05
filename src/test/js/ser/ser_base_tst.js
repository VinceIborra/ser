function ser_base_tst(manager, instanceName) {

	this.getModule = function(){

		// Declare namespace
		const NAMESPACE = 'ser.base.tst';
	
		// Perform module imports
		namespace.include(ser_base);
		namespace.include(ser_unit);
	
		// Local synonyms
		let TestClass = ser.unit.TestClass;
		let Types = ser.base.Types;
		let BaseWrapper = ser.base.BaseWrapper;
	
		let factory = ser.base.factory;
	
		class TestBaseWrapperClass extends TestClass {
	
			constructor() {
				super();
				this.name = NAMESPACE + '.TestBaseWrapperClass';
			}
		
			testGetHandler() {
	
				var wrappedObject = {
					property1: 123
				};
			
				var WrapperClass1 = factory.newBasicExtendedWrapperClass();
				var WrapperClass2 = class extends BaseWrapper {
					constructor() {
						super();
						this.property1 = 456;
					}
				};
	
				// Property defined on wrapped object
				var wrapper = new WrapperClass1();
				wrapper.wrappedObject = wrappedObject; 
				this.assertEquals(123, wrapper.property1);
				this.assertFalse('property1' in wrapper);
				
				// Property defined on wrapper object
				wrapper = new WrapperClass2();
				wrapper.wrappedObject = wrappedObject;
				this.assertEquals(456, wrapper.property1);
				this.assertTrue('property1' in wrapper);
			}
		
			testSetHandler() {
	
				var wrappedObject1 = { property1: 123 };
				var wrappedObject2 = { property1: 123 };
				var wrappedObject3 = { property1: 123 };
	
				var WrapperClass1 = factory.newBasicExtendedWrapperClass();	
				var WrapperClass2 = class extends BaseWrapper {
					constructor() {
						super();
						this.property1 = 456;
					}
				};
	
				// Property defined on wrapped object
				var wrapper = new WrapperClass1();
				wrapper.wrappedObject = wrappedObject1; 
				wrapper.property1 = 789;
				this.assertEquals(789, wrapper.property1);
				this.assertFalse('property1' in wrapper);
				this.assertEquals(789, wrappedObject1.property1);
				
				// Property defined on wrapper object
				wrapper = new WrapperClass2();
				wrapper.wrappedObject = wrappedObject2;
				wrapper.property1 = 789;
				this.assertEquals(789, wrapper.property1);
				this.assertTrue('property1' in wrapper);
				this.assertEquals(123, wrappedObject2.property1);
	
				// Property defined on wrapper object, wrapped object not set
				wrapper = new WrapperClass2();
				wrapper.property1 = 789;
				this.assertEquals(789, wrapper.property1);
				this.assertTrue('property1' in wrapper);
				this.assertTrue(wrapper.wrappedObject == null);
			
				// Property not defined on wrapper or wrapped object, wrapped object not set
				wrapper = new WrapperClass1();
				this.assertFalse('property2' in wrapper);
				wrapper.property2 = 789;
				this.assertTrue('property2' in wrapper);
			
				// Property not defined on wrapper or wrapped object, wrapped set
				wrapper = new WrapperClass1();
				wrapper.wrappedObject = wrappedObject3;
				this.assertFalse('property2' in wrapper);
				this.assertFalse('property2' in wrappedObject3);
				wrapper.property2 = 789;
				this.assertTrue('property2' in wrapper);
				this.assertFalse('property2' in wrappedObject3);
			}
		
			testReplacementHandlers() {
	
				var wrappedObject = {
					property1: 123,
					property2: 456
				};
			
				var WrapperClass = class extends BaseWrapper {
	
					constructor() {
						super();
						this.propertyBob = 100;
					}
				
					getHandler(target, property, receiver) {
					
						// Keep internals functioning as necessary
						if (target.knownWrapperProperties.contains(property)) {
							return target[property];
						}
	
						// Implement our own functionality
						return target.propertyBob;
					}
				
					setHandler(target, property, value, receiver) {
					
						// Keep internals functioning as necessary
						if (target.knownWrapperProperties.contains(property)) {
							target[property] = value;
							return true;
						}
					
						// Implement our own functionality
						target.propertyBob = value;
						return true;
					}
				};
	
				var wrapper = new WrapperClass();
				wrapper.wrappedObject = wrappedObject;
				this.assertEquals(100, wrapper.property1);
				this.assertEquals(100, wrapper.property2);
				this.assertEquals(123, wrappedObject.property1);
				this.assertEquals(456, wrappedObject.property2);
			}
		}
	
		class TestEnumType extends TestClass {
	
			constructor() {
				super();
				this.name = "ser.constants.tst.TestEnumType";
			}
		
			testAddValueToEnum() {
			
				var AnEnumType = factory.newEnumType();
			
				this.assertEquals(0, AnEnumType.values.length);
				AnEnumType.addValueToEnum(123, 'aLabel', 'aDescription');
				this.assertEquals(1, AnEnumType.values.length);
			
				var value = AnEnumType.values[0];
				this.assertEquals(123, value.code);
				this.assertEquals('aLabel', value.label);
				this.assertEquals('aDescription', value.description);	
			}
		
			testAddValuesToEnum() {
			
				var AnEnumType = factory.newEnumType();
			
				this.assertEquals(0, AnEnumType.values.length);
				AnEnumType.addValuesToEnum([
					{code: 123, label: 'aLabel', description: 'aDescription'},
					{code: 456, label: 'bLabel', description: 'bDescription'}
				]);
				this.assertEquals(2, AnEnumType.values.length);
			
				var value = AnEnumType.values[0];
				this.assertEquals(123, value.code);
				this.assertEquals('aLabel', value.label);
				this.assertEquals('aDescription', value.description);	
	
				value = AnEnumType.values[1];
				this.assertEquals(456, value.code);
				this.assertEquals('bLabel', value.label);
				this.assertEquals('bDescription', value.description);	
			}
		
			testEquals() {
	
				var enumType = factory.newEnumType([
					{code: 123, label: 'aLabel', description: 'aDescription'},
					{code: 456, label: 'bLabel', description: 'bDescription'}
				]);
			
				this.assertTrue(enumType.aLabel.equals(enumType.aLabel));
				this.assertFalse(enumType.aLabel.equals(enumType.bLabel));
			}
		
			testFromCode() {
			
				var enumType = factory.newEnumType([
					{code: 123, label: 'aLabel', description: 'aDescription'},
					{code: 456, label: 'bLabel', description: 'bDescription'}
				]);
			
				var value = enumType.fromCode(345);
				this.assertNull(value);
				
				var value = enumType.fromCode(123);
				this.assertEquals(123, value.code);
				this.assertEquals('aLabel', value.label);
				this.assertEquals('aDescription', value.description);
			}
		
			testToString() {
				var enumType = factory.newEnumType([
					{code: 123, label: 'aLabel', description: 'aDescription'}
				]);
				
				var value = enumType.aLabel;
			
				var str = value.toString();
				this.assertEquals('aLabel', str);
			}
		
			testValueAccessor() {
				var enumType = factory.newEnumType([
					{code: 123, label: 'aLabel', description: 'aDescription'}
				]);
				
				var value = enumType.aLabel;
				this.assertEquals(123, value.code);
				this.assertEquals('aLabel', value.label);
				this.assertEquals('aDescription', value.description);
			}
		}
	
		class TestTypes extends TestClass {
	
			constructor() {
				super();
				this.name = "ser.constants.tst.TestTyps";
			}
		
			testTypesEnum() {
				this.assertEquals(6, Types.values.length);
				// Boolean, Number, String, Object, Undefined, Function
			}
		}
	
		class TestFactory extends TestClass {
	
			constructor() {
				super();
				this.name = "ser.constants.tst.TestEnumType";
			}
		
			testNewEnumType() {
				var enumType = factory.newEnumType();
				this.assertNotNull(enumType);
				this.assertNotNull(enumType.addValueToEnum);
				this.assertNotNull(enumType.addValueToEnum);
				this.assertNotNull(enumType.values);
				this.assertEquals(0, enumType.values.length);
			}
		
			testNewEnumTypeWithSuppliedValues() {
				var enumType = factory.newEnumType([
					{code: 123, label: 'aLabel', description: 'aDescription'},
					{code: 456, label: 'bLabel', description: 'bDescription'}
				]);
				this.assertEquals(2, enumType.values.length);
			}
		}
	
		// Collate test classes
		var testClasses = [
			new TestBaseWrapperClass(),
			new TestEnumType(),
			new TestTypes(),
			new TestFactory()
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
		namespace.registerModule(NAMESPACE, module);
		return module;
	};

}//end ser_base_tst

