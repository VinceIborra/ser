function ser_ea_connector_tst(manager, instanceName) {

	this.getModule = function(){

		// Perform module imports
		namespace.include(ser_unit);
	
		// Local synonyms
		let TestClass = ser.unit.TestClass;
		let ElementWrapper = ser.ea.element.ElementWrapper;
		let DiagramWrapper = ser.ea.element.ElementWrapper;
		let ConnectorEndWrapper = ser.ea.connector.ConnectorEndWrapper;
		let ObjectType = namespace.ser.ea.constants.ObjectType;
		let ConnectorType = ser.ea.constants.ConnectorType;
		let repository = ser.ea.context.repository;
	
		class TestConnectorWrapper extends TestClass {
	
			constructor() {
				super();
				this.name = "ser.ea.connector.tst.TestConnectorWrapper";
			}
		
			testAttributes() {
			
				const TST_CTR_GUID = '{20923E37-0F95-471c-B93F-ECA98520C28D}';
	
				var ctr = repository.getConnector(TST_CTR_GUID);
	
				// connectorGUID
				var connectorGUID = ctr.connectorGUID;
				this.assertEquals(ctr.wrappedObject.ConnectorGUID, ctr.connectorGUID);
	
				// connectorID
				this.assertEquals(ctr.wrappedObject.ConnectorID, ctr.connectorID);
			
				// client
				var client = ctr.client;
				this.assertNotNull(client);
				this.assertInstanceOf(client, ElementWrapper);
				this.assertEquals('element1', client.name, 'Incorrect client');
			
				// clientEnd
				var clientEnd = ctr.clientEnd;
				this.assertNotNull(clientEnd);
				this.assertInstanceOf(clientEnd, ConnectorEndWrapper);
				this.assertEquals('Client', clientEnd.end);
				// this.assertTrue(ConnectorEndType.Client.equals(clientEnd.end)); TODO
			
				// clientID
				this.assertEquals(ctr.wrappedObject.ClientID, ctr.clientID);
			
				// diagram - TODO: Not sure under which circumstances this variable is not null
				var diagram = ctr.diagram;
				this.assertNull(diagram);
		//		this.assertInstanceOf(diagram, DiagramWrapper);
		//		this.assertEquals('blah', diagram.name);
	
				// guid
				this.assertEquals(ctr.wrappedObject.ConnectorGUID, ctr.guid);
	
				// id
				this.assertEquals(ctr.wrappedObject.ConnectorID, ctr.id);
	
				// objectType
				this.assertTrue(ObjectType.Connector.equals(ctr.objectType));
			
				// supplier
				var supplier = ctr.supplier;
				this.assertNotNull(supplier);
				this.assertInstanceOf(supplier, ElementWrapper);
				this.assertEquals('element2', supplier.name, 'Incorrect supplier');
	
				// supplierEnd
				var supplierEnd = ctr.supplierEnd;
				this.assertNotNull(supplierEnd);
				this.assertInstanceOf(supplierEnd, ConnectorEndWrapper);
				this.assertEquals('Supplier', supplierEnd.end);
				// this.assertTrue(ConnectorEndType.Client.equals(clientEnd.end)); TODO
	
				// supplierID
				this.assertEquals(ctr.wrappedObject.SupplierID, ctr.supplierID);
	
				// type
				this.assertTrue(ConnectorType.Dependency.equals(ctr.type));
			
				// Still to do
				this.underConstruction('Not all attributes tested as yet.');
			}
		}
	
		// Collate test classes
		var testClasses = [
			new TestConnectorWrapper()
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
		namespace.registerModule('ser.ea.connector.tst', module);
		return module;
	};

}//end ser_ea_connector_tst

