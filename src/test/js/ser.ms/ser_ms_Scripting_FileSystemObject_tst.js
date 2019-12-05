function ser_ms_Scripting_FileSystemObject_tst(manager, instanceName) {

	this.getModule = function(){

		// Declare namespace
		const NAMESPACE = 'ser.ms.Scripting.FileSystemObject.tst';
	
		// Perform module imports
		namespace.include(ser_unit);
	
		// Local synonyms
		let TestClass = ser.unit.TestClass;
	
		let factory = ser.ms.Scripting.FileSystemObject.context.factory;
	
		class TestFileSystemObjectWrapper extends TestClass {
	
			constructor() {
				super();
				this.name = NAMESPACE + '.TestFileSystemObjectWrapper';
			}
		
			testUnderConstruction() {
				this.underConstruction();
			}
		}
	
		class TestFactory extends TestClass {
	
			constructor() {
				super();
				this.name = NAMESPACE + '.TestFactory';
			}
		
			testNewFileSystemObject() {
				var fileSystemObject = factory.newFileSystemObject();
				var fileTempName = fileSystemObject.GetTempName();
				this.assertNotNull(fileTempName);
			}
		
			testNewFileSystemWrapper() {
			
				var fileSystem = factory.newFileSystemObjectWrapper();
				var fileTempName = fileSystem.getTempName();
				this.assertNotNull(fileTempName);
			}
		
		}
	
		// Collate test classes
		var testClasses = [
			new TestFileSystemObjectWrapper(),
			new TestFactory()
		];
	
		// Setup a local test runner
		var testRunner = new ser.unit.TestRunner();
		testRunner.testClassDetail = true;
		//testRunner.testMethodDetail = true;
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

}//end ser_ms_Scripting_FileSystemObject_tst

