function ser_ea_element_tst(manager, instanceName) {

	this.getModule = function(){

		// Perform module imports
		namespace.include(ser_unit);
	
		// Local synonyms
		let TestClass = ser.unit.TestClass;
		let ElementWrapper = ser.ea.element.ElementWrapper;
		let ElementType = ser.ea.constants.ElementType;
		let ConnectorType = ser.ea.constants.ConnectorType;
		let ObjectType = namespace.ser.ea.constants.ObjectType;
	
		let repository = ser.ea.context.repository;
	
		class TestElementWrapper extends TestClass {
	
			constructor() {
				super();
			}
		
			testAttributes() {
			
				const TST_ELM_GUID = '{D209239B-3D3A-4463-ABE6-3DCB09DDEE5A}';
	
				var elm = repository.getElement(TST_ELM_GUID);
	
				// elementGUID
				this.assertEquals(elm.wrappedObject.ElementGUID, elm.elementGUID);
	
				// elementID
				this.assertEquals(elm.wrappedObject.ElementID, elm.elementID);
			
				// guid
				this.assertEquals(elm.wrappedObject.ElementGUID, elm.guid);
	
				// id
				this.assertEquals(elm.wrappedObject.ElementID, elm.id);
	
				// objectType
				this.assertTrue(ObjectType.Element.equals(elm.objectType));
			
				// type
				this.assertTrue(ElementType.Class.equals(elm.type));
	
				// Still to do
				this.underConstruction('Not all attributes tested as yet.');
			}
		
			testConnectTo() {
			
				const TST_ELM1_GUID = '{5584F2A0-2F55-4261-AFF5-9A429BB0ACE4}';
				const TST_ELM2_GUID = '{1A0466BC-38AC-4983-9399-2A5CD2523252}';
				const TST_ATT2_GUID = '{A8C77099-5841-4ca2-B409-67DB94420B90}';
			
				var elm1 = repository.getElement(TST_ELM1_GUID);
				var elm2 = repository.getElement(TST_ELM2_GUID);
				var att2 = repository.getAttribute(TST_ATT2_GUID);
				this.assertEquals(0, elm1.connectors.count);
				this.assertEquals(0, elm2.connectors.count);
	
				// Connect to an element
				var cnt1 = elm1.connectTo(elm2, { type: ConnectorType.Realisation});
				
				this.assertEquals(1, elm1.connectors.count);
				this.assertEquals(1, elm2.connectors.count);
				
				this.assertNotNull(cnt1);
				this.assertTrue(cnt1.type.equals(ConnectorType.Realisation));
				this.assertEquals(elm1.guid, cnt1.client.guid);
				this.assertEquals(elm2.guid, cnt1.supplier.guid);
				
				// Connect to an attribute
				var cnt2 = elm1.connectTo(att2, { type: ConnectorType.Realisation});
				
				this.assertEquals(2, elm1.connectors.count);
				this.assertEquals(1, elm2.connectors.count);
				elm2.reload();
				this.assertEquals(2, elm2.connectors.count);
				
				this.assertNotNull(cnt2);
				this.assertTrue(cnt2.type.equals(ConnectorType.Realisation));
				this.assertEquals(elm1.guid, cnt2.client.guid);
				this.assertEquals(elm2.guid, cnt2.supplier.guid);		
			}
		
			testEquals() {
			
				const TST_ELM_GUID = '{CD421244-5EED-4782-BAD3-662CA63FBAA0}';
			
				var elm1 = repository.getElement(TST_ELM_GUID);
				var elm2 = repository.getElement(TST_ELM_GUID);
			
				this.assertFalse(elm1 === elm2);
				this.assertTrue(elm1.equals(elm2));
			}
		
			testSetter() {
			
				const TST_ELM_GUID = '{AC1CB3CE-804A-4975-9230-C67CE2CA5BB6}';
			
				var elm = repository.getElement(TST_ELM_GUID);
			
				elm.alias = 'joe';
				elm.type = ElementType.Class;
			}
		
			testSetAttributes() {
	
				const TST_ELM_GUID = '{6ACC53BC-5E4C-4d00-A560-648B419BA925}';
			
				var elm = repository.getElement(TST_ELM_GUID);
			
				elm.setAttributes({
					alias: 'joe',
					type: ElementType.Class
				});
			}
		
			testCollectionsAddNew() {
			
				const TST_ELM1_GUID = '{A0A6486E-95A8-46b6-BA3B-19C80F84F433}';
				const TST_ELM2_GUID = '{9F719BBB-D87C-41c1-9A36-76728A068BF7}';
			
				var elm1 = repository.getElement(TST_ELM1_GUID);
				var elm2 = repository.getElement(TST_ELM2_GUID);
	
				// Connectors
				this.assertEquals(0, elm1.connectors.count);
	
				elm1.connectors.addNew({
					type: ConnectorType.Association,
					supplier: elm2
				});
				//elm2.connectors.refresh();	
	
				this.assertEquals(1, elm1.connectors.count);	
			}
		}
	
		// Declare namespace
		const NAMESPACE = 'ser.ea.element';
	
		// Collate test classes
		var testClasses = [
			new TestElementWrapper()
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

}//end ser_ea_element_tst

