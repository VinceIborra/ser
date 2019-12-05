function ser_ea_base_tst(manager, instanceName) {

	this.getModule = function(){

		// Perform module imports
		namespace.include(ser_unit);
	
		// Local synonyms
		let TestClass = ser.unit.TestClass;
		let AddNewAttributes = ser.ea.base.Attributes;
		let CollectionWrapper = ser.ea.base.CollectionWrapper;
		let Enumerable = ser.external.linq.Enumerable;
	
		class TestAddNewAttributesObject extends TestClass {
	
			constructor() {
				super();
			}
		
			testAdjustWithNewAttributesObject() {
			
				var attributes = new AddNewAttributes();
				attributes.bob = 'abc';
				attributes.jane = 'cde';
			
				var copy = attributes.adjust();
				this.assertNotNull(copy);
				this.assertTrue('bob' in copy);
				this.assertTrue('jane' in copy);
			}
		
			testAdjustWithNotNewObject() {
	
				var attributes = {
					bob: 'abc',
					jane: 'cde'
				};
				Reflect.setPrototypeOf(attributes, AddNewAttributes.prototype);
			
				var copy = attributes.adjust();
				this.assertNotNull(copy);
				this.assertTrue('bob' in copy);
				this.assertTrue('jane' in copy);
			}
		
			testAdjustForDeletes() {
			
				var attributes = {
					bob: 'abc',
					jane: 'cde',
					henry: 'efg',
					larry: 'ghi'
				};
				Reflect.setPrototypeOf(attributes, AddNewAttributes.prototype);
				
				var adjusted = attributes.adjust({
					delete: 'bob'
				});
				this.assertFalse('bob' in adjusted);
				this.assertTrue('jane' in adjusted);
			
				adjusted = attributes.adjust({
					delete: ['bob', 'jane']
				});
				this.assertFalse('bob' in adjusted);
				this.assertFalse('jane' in adjusted);
				this.assertTrue('henry' in adjusted);
			}
	
			testAdjustForAdds() {
			
				var attributes = {
					bob: 'abc'
				};
				Reflect.setPrototypeOf(attributes, AddNewAttributes.prototype);
				
				var adjusted = attributes.adjust({
					add: [
						{attribute: 'jane', value: 'cde'},
						{attribute: 'henry', value: 'efg'},
					]
				});
				this.assertTrue('jane' in adjusted, 'here1');
				this.assertEquals('cde', adjusted.jane);
				this.assertTrue('henry' in adjusted, 'here2');
				this.assertEquals('efg', adjusted.henry);
			}
		}
	
		class TestCollectionWrapper extends TestClass {
	
			constructor() {
				super();
			}
		
			testCount() {
			
				var collection = new CollectionWrapper();
				collection.eaCollection = {
					value: 0,
					GetAt: function() {
						var val = this.value;
						this.value++;
						return val;
					},
					Count: 3
				};
				collection.wrapItem = function(val) { return { value: val}; };
			
				this.assertEquals(3, collection.countByLinq());
				
				this.assertEquals(3, collection.count);
			}
		}
	
		// Declare namespace
		const NAMESPACE = 'ser.ea.base';
	
		// Collate test classes
		var testClasses = [
			new TestAddNewAttributesObject(),
			new TestCollectionWrapper()
		];
	
		// Setup a local test runner
		var testRunner = new ser.unit.TestRunner();
		testRunner.testClassDetail = true;
		testRunner.testMethodDetail = true;
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

}//end ser_ea_base_tst

