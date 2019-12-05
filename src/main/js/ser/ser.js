function ser(manager, instanceName) {

	/// 
	/// <param name="options"></param>
	this.bootstrap = function(options){

		var debugOutputTab = options.debugOutputTab || 'Debug';
	
		class HackeryUtils {
		
			getGlobalObjectReference() {
				return (new Function('return this;')());
			}
		}
	
		class Namespace {
		
		    constructor() {
			
				this.isToplevel = false;
				this.moduleClasses = [];
				this.namespaces = {};
		        this.module = null;
				this.children = {};
			
				return new Proxy(this, {
		            get: function(target, prop, receiver) {
					
						// Allow the running of defined operations on this object first
						if (target[prop] != null) {
							return target[prop];
						}
					
						// Attempt to navigate the namespace tree
						if (target.children[prop] != null) {
							return target.children[prop];
						}
					
						// Otherwise return the appropriate property within the module
						if (target.module != null && target.module[prop] != null) {
							return target.module[prop];
						}
					
						// Otherwise return something sensible.
						else {
							return null;
						}
		            }
		        });
		    }
	
			registerModule(namespaceString, theModule) {
			
				// Don't register the same namespace twice
				if (this.namespaces[namespaceString] != null) {
					return;
				}
			
				// Split the namespaceString into component parts
				var parts = namespaceString.split('.');
			
				// Create namespace for first part if not already present
				var part = parts[0];
				if (this.children[part] == null) {
					this.children[part] = new Namespace();
				}
			
				// Provide a global variable for top level names
				if (this.isTopLevel) {
					globalThis[part] = this.children[part];
				}
			
				// If this is the last part, then set the module for it, and we're done
				if (parts.length == 1) {
					this.children[part].module = theModule;
					return;
				}
			
				// Otherwise, delegate to the next level
				var restOfNamespace = parts.slice(1, parts.length).join('.');
				this.children[part].registerModule(restOfNamespace, theModule);	
			
				// Make sure we keep track of this registered module
				this.namespaces[namespaceString] = theModule;
			}
		
			include(moduleWrapperClass, options) {
			
				// Options
				var useNamespace = (options && typeof options.useNamespace !== 'undefined')? options.useNamespace: null;
				var force = (options && typeof options.force !== 'undefined')? options.force: false;
			
				// Don't process further if we've already done this one
				for (var moduleClass of this.moduleClasses) {
					if (moduleClass === moduleWrapperClass) {
						return;
					}
				}
			
				// Create the object for the module wrapper
				var moduleWrapper = new moduleWrapperClass();
			
				// Get the module object
				var module = moduleWrapper.getModule(this);
			
				// Keep track of this moduleWrapperClass having been processed
				this.moduleClasses.push(moduleWrapperClass);
			
				// Nothing more to do if namespace hasn't been provided or no module returned- rely on self registration
				if (useNamespace == null) {
					return;
				}
			
				// Namespace already processed - and haven't been instructed to force registration
				if (this.namespaces[useNamespace] != null && !force) {
					return;
				}
			
				// Register the module
				this.registerModule(useNamespace, module);	
			}
		}
	
		class Factory {
		
			newHackeryUtilsObject() {
				var obj = new HackeryUtils();
				return obj;
			}
		
			newDebugFunction(outputTab) {
				return function (str) {
					Repository.CreateOutputTab(outputTab);
					Repository.EnsureOutputVisible(outputTab);
					Repository.WriteOutput(outputTab, str, 0);
				}
			}
		
			newNamespace({isTopLevel: isTopLevel=false}={}) {
			
				var namespace = new Namespace();
				namespace.isTopLevel = isTopLevel;
				return namespace;
			}
		}
	
		// Declare namespace
		const NAMESPACE = 'ser';
	
		// Create a factory to create other context initialisation objects
		var factory = new Factory();
	
		// Set the global object 
		var hackeryUtils = factory.newHackeryUtilsObject();
		var globalObjectReference = hackeryUtils.getGlobalObjectReference();
		globalObjectReference.globalThis = globalObjectReference;
		
		// Set a general purpose output function for debug purposes and some other synonyms
		globalThis.dbg = factory.newDebugFunction(debugOutputTab);
		globalThis.print = globalThis.dbg;
		globalThis.log = globalThis.dbg;
		
		// Setup a namespace structure
		globalThis.namespace = factory.newNamespace({isTopLevel: true});
		
		// Self register a root ser module
		var module = {};
		module.factory = factory;
		namespace.registerModule(NAMESPACE, module);
	
		// And include top level framework
		namespace.include(ser_context);
	};

}//end ser

