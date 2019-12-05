function ser_ms_Scripting_FileSystemObject(manager, instanceName) {

	this.getModule = function(){

		namespace.include(ser_base);
	
		// Declare namespace
		const NAMESPACE = 'ser.ms.Scripting.FileSystemObject';
	
		// Local synonyms
		let UncapitalisedBaseWrapper = ser.base.UncapitalisedBaseWrapper;
	
		class FileSystemObjectWrapper extends UncapitalisedBaseWrapper {
			constructor() {
				super();
			}
		}
	
		class Context {
			constructor() {
				this.factory = null;
				this._fileSystem = null;
			}
		
			get fileSystem() {
				if (this._fileSystem != null) {
					return this._fileSystem;
				}
				var fileSystemObject = this.factory.newFileSystemObject();
				this._fileSystem = this.factory.newFileSystemObjectWrapper(fileSystemObject);
				return this._fileSystem;
			}
		}
	
		class Factory {
		
			constructor() {
			}
		
			newContext() {
				var ctx = new Context();
				ctx.factory = this;
				return ctx;
			}
		
			newFileSystemObject() {
				return new COMObject('Scripting.FileSystemObject');
			}
		
			newFileSystemObjectWrapper(comObject) {
			
				var wrappedObject = comObject;
		
				var wrapper = new FileSystemObjectWrapper();
			
				if (wrappedObject == null) {
					wrappedObject = this.newFileSystemObject();
				}
			
				wrapper.wrappedObject = wrappedObject;
			
				return wrapper;
			}
		}
	
		// Module Export
		var module = {};
		module.context = (new Factory()).newContext();
		namespace.registerModule(NAMESPACE, module);
		return module;
	
	};

}//end ser_ms_Scripting_FileSystemObject

