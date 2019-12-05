function ser_ea_elementFeature_tst(manager, instanceName) {

	this.getModule = function(){

		// Perform module imports
		namespace.include(ser_unit);
	
		// Local synonyms
		let TestClass = ser.unit.TestClass;
		let ObjectType = ser.ea.constants.ObjectType;
		let ConnectorType = ser.ea.constants.ConnectorType;
	
		let repository = ser.ea.context.repository;
	
		class TestAttributeWrapper extends TestClass {
	
			constructor() {
				super();
			}
		
			testAttributes() {
			
				const TST_ATT_GUID = '{54E72223-1C4C-4cc0-ADAE-54FFC522F9A0}';
				const TST_ELM_GUID = '{338E0A2B-82E2-4bee-BDFB-0C6788A8D786}';
	
				var att = repository.getAttribute(TST_ATT_GUID);
				var elm = repository.getElement(TST_ELM_GUID);
	
				// attributeGUID
				this.assertEquals(att.wrappedObject.AttributeGUID, att.attributeGUID);
	
				// attributeID
				this.assertEquals(att.wrappedObject.AttributeID, att.attributeID);
			
				// guid
				this.assertEquals(att.wrappedObject.AttributeGUID, att.guid);
	
				// id
				this.assertEquals(att.wrappedObject.AttributeID, att.id);
	
				// objectType
				this.assertTrue(ObjectType.Attribute.equals(att.objectType));
			
				// parent
				this.assertEquals(elm.guid, att.parent.guid);
			
				// Still to do
				this.underConstruction('Not all attributes tested as yet.');
			}
		
			testConnectTo() {
			
				const TST_ELM1_GUID = '{9BE0B43B-1D43-4564-AA97-76971AFE6DD4}';
				const TST_ATT1_GUID = '{6D304BB7-3871-43af-AD0D-DD4A16F4E643}';
				const TST_ELM2_GUID = '{FF01668E-003D-4e17-93C9-F94E9AF97E7B}';
				const TST_ATT2_GUID = '{F066DB5C-4079-4e51-8D75-25DEA6BB2369}';
			
				var elm1 = repository.getElement(TST_ELM1_GUID);
				var att1 = repository.getAttribute(TST_ATT1_GUID);
				var elm2 = repository.getElement(TST_ELM2_GUID);
				var att2 = repository.getAttribute(TST_ATT2_GUID);
				this.assertEquals(0, elm1.connectors.count);
				this.assertEquals(0, elm2.connectors.count);
	
				// Connect to an element
				var cnt1 = att1.connectTo(elm2, { type: ConnectorType.Realisation});
			
				this.assertEquals(1, att1.parent.connectors.count);
				this.assertEquals(0, elm1.connectors.count);
				this.assertEquals(elm1.guid, att1.parent.guid);
				elm1.connectors.refresh();
				this.assertEquals(1, elm1.connectors.count);
				
				this.assertEquals(1, elm2.connectors.count);
				
				this.assertNotNull(cnt1);
				this.assertTrue(cnt1.type.equals(ConnectorType.Realisation));
				this.assertEquals(elm1.guid, cnt1.client.guid);
				this.assertEquals(elm2.guid, cnt1.supplier.guid);
				
				// Connect to an attribute
				var cnt2 = att1.connectTo(att2, { type: ConnectorType.Realisation});
				elm1.connectors.refresh();
				elm2.connectors.refresh();
			
				this.assertEquals(2, elm1.connectors.count);
				this.assertEquals(2, elm2.connectors.count);
				
				this.assertNotNull(cnt2);
				this.assertTrue(cnt2.type.equals(ConnectorType.Realisation));
				this.assertEquals(elm1.guid, cnt2.client.guid);
				this.assertEquals(elm2.guid, cnt2.supplier.guid);		
			}
		}
	
		// Declare namespace
		const NAMESPACE = 'ser.ea.elementFeature';
	
		// Collate test classes
		var testClasses = [
			new TestAttributeWrapper()
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

}//end ser_ea_elementFeature_tst

