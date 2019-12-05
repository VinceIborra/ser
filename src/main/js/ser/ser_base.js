function ser_base(manager, instanceName) {

	/// 
	/// <param name="namespace"></param>
	this.getModule = function(namespace){

		// Declare namespace
		const NAMESPACE = 'ser.base';
	
		class BaseWrapper {
		
		    constructor() {
			
		        this.wrappedObject = null;
				this.knownWrapperProperties = ['wrappedObject', 'knownWrapperProperties', 'toStringProperties'];
				this.toStringProperties = [];
			
				return new Proxy(this, {
		            get: function(target, property, receiver) {
						return target.getHandler(target, property, receiver);
		            },
					set: function(target, property, value, receiver) {
						return target.setHandler(target, property, value, receiver);
					}
		        });		
		    }
		
			toString() {
				var str = '';
				var indent = '';
				str = indent + '{\n';
				indent += '    ';
				for (var idx=0, first=true; idx<this.toStringProperties.length; idx++) {
					var prop = this.toStringProperties[idx];
					str += (first)? '' : ',\n';
					var val = (this[prop] == null)? 'null' : this[prop].toString();
					str += indent + prop + ': ' + val;
					first = false;
				}
				str += '\n';
				indent = '';
				str += indent + '}\n';
				return str;
			}
		
			getHandler(target, property, receiver) {
			
				// Try to get property value from the wrapper first
				if (target.knownWrapperProperties.contains(property)
				||  property in target) {
					return target[property];
				}
	
				// Special handling for functions
				if (typeof target.wrappedObject[property] == 'function') {
					return target.createNativeMethodWrapperFunction(target, property);
				}
	
				// Otherwise return the value for the property on the wrappedObject as is
				return target.wrappedObject[property];
			}
		
			setHandler(target, property, value, receiver) {
			
				// Set the value for the propery in the wrapper if
				// - Property is a known as a wrapper property
				// - Property exists in the wrapper
				// - Property does NOT exist in the wrapper, but wrapped object has not been set
				// - Property does NOT exist in the wrapper AND it does NOT exist in the wrapped object
				if ((target.knownWrapperProperties.contains(property))
				||  (property in target)
				||  (!(property in target) && target.wrappedObject == null)
				||  (!(property in target) && target.wrappedObject != null && !(property in target.wrappedObject))) {
					target[property] = value;
					return true;
				}
	
				// Fall through only happens if property exists on the wrapped object
				target.wrappedObject[property] = value;
				return true;
			}
	
			// NOTE:
			// This is a work around that I do not understand why it is needed.  I suspect
			// that it is some interaction between the 'Proxy' class and native objects
			// methods.  I will need to investigate further.
			//
			// With the Proxy class, the user may setup "traps" while proxying access
			// to an underlying object.  The trap in question is that of property access.
			// For non function properties (i.e. properties which refer to functions), the
			// proxy access works as expected.  For proxy access to native functions, when
			// the value of the property is returned (and later executed), EA becomes
			// unresponsive.  This doesn't seem to be a problem with normal Javascript
			// objects and methods.
			//
			// Hence this workaround involves the definition of a wrapper function around 
			// the call to the native method, with the wrapper function being returned
			// from the trap.
			createNativeMethodWrapperFunction(target, prop) {
				return function() {
					return target.wrappedObject[prop].apply(target.wrappedObject, arguments);
				};
			}
		}
	
		class UncapitalisedBaseWrapper extends BaseWrapper {
		
		    constructor() {
				super();
			}
		
			getHandler(target, property, receiver) {
			
				// Try returning any defined properties on the wrapper first
				if (target.knownWrapperProperties.contains(property)
				||  property in target) {
					return target[property];
				}
			
				// Capitalise property if this is what the wrapped object expects
				var wrappedObjectProperty = property;
				if (!property.isCapitalized()) {
				
					// Check for capitalized equivalent 
					var propertyCapitalized = property.capitalize();
					if (propertyCapitalized in target.wrappedObject) {
						wrappedObjectProperty = propertyCapitalized;
					}
				}
	
				// Special handling for functions
				if (typeof target.wrappedObject[wrappedObjectProperty] == 'function') {
					return target.createNativeMethodWrapperFunction(target, wrappedObjectProperty);
				}
	
				// Otherwise return the value for the property on the wrappedObject as is
				return target.wrappedObject[wrappedObjectProperty];
			}
		
			setHandler(target, property, value, receiver) {
			
				var propertyCapitalized = property.capitalize();
	
				// Set the value for the propery in the wrapper if
				// - Property is a known as a wrapper property
				// - Property exists in the wrapper
				// - Property does NOT exist in the wrapper, but wrapped object has not been set
				// - Property does NOT exist in the wrapper AND it does NOT exist in the wrapped object
				if ((target.knownWrapperProperties.contains(property))
				||  (property in target)
				||  (!(property in target) && target.wrappedObject == null)
				||  (!(property in target) && target.wrappedObject != null && !(propertyCapitalized in target.wrappedObject))) {
					target[property] = value;
					return true;
				}
	
				// Capitalise property if this is what the wrapped object expects
				var wrappedObjectProperty = property;
				if (!property.isCapitalized() && propertyCapitalized in target.wrappedObject) {
					wrappedObjectProperty = propertyCapitalized;
				}
	
				// And set the value on the wrapped object
				target.wrappedObject[wrappedObjectProperty] = value;
				return true;
		    }
		}
	
		class EnumType {
		
			constructor(code, label, description) {
				this.code = code;
				this.label = label;
				this.description = description;
			}
		
			static fromCode(code) {
				for (var idx=0; idx<this.values.length; idx++) {
					if (code == this.values[idx].code) {
						return this.values[idx];
					}
				}
			}
		
			toString() {
				return this.label;
			}
		
			equals(other) {
			
				// Can only be equal if it's an enum... otherwise compare codes manually
				if (!(other instanceof EnumType)) {
					return false;
				}
			
				return (this.code === other.code && this.label === other.label && this.description === other.description);
			}
		}
	
		function addValueToEnum(code, label, description) {
			var value = new this(code, label, description);
			this[label] = value;
			this.values.push(value);
		}
	
		function addValuesToEnum(enumValues) {
			enumValues.forEach(enumDetails => {
				this.addValueToEnum(enumDetails.code, enumDetails.label, enumDetails.description);
			});
		}
	
	
		class Factory {
		
			newBasicExtendedWrapperClass() {
				return class extends BaseWrapper {
					constructor() {
						super();
					}
				};
			}
	
			newEnumType(enumValues) {
			
				// Create the new enum type
				var enumType = class extends EnumType { }
				enumType.values = [];
				enumType.addValueToEnum = addValueToEnum;
				enumType.addValuesToEnum = addValuesToEnum;
			
				// Add the enum values
				if (enumValues) {
					enumType.addValuesToEnum(enumValues);
				}
			
				return enumType;
			}
		}
	
		var factory = new Factory();
	
		var Types = factory.newEnumType([
			{ label: 'Boolean', code: (typeof true)},
			{ label: 'Number', code: (typeof 0)},
			{ label: 'String', code: (typeof "")},
			{ label: 'Object', code: (typeof {})},
			{ label: 'Undefined', code: (typeof undefined)},
			{ label: 'Function', code: (typeof function () { })}
		]);
		
		// Module Export
		var module = {};
		module.factory = factory;
		module.BaseWrapper = BaseWrapper;
		module.UncapitalisedBaseWrapper = UncapitalisedBaseWrapper;
		module.EnumType = EnumType;
		module.Types = Types;
		namespace.registerModule(NAMESPACE, module);
		return module;
	
	};

}//end ser_base

