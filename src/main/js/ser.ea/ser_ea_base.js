function ser_ea_base(manager, instanceName) {

	/// 
	/// <param name="namespace"></param>
	this.getModule = function(namespace){

		// Perform module imports
		namespace.include(ser_js);
		namespace.include(ser_base);
		namespace.include(ser_ea_constants);
	
		// Local synonyms
		let BaseWrapper = ser.base.BaseWrapper;
		let ItemIdentifierType = ser.ea.constants.ItemIdentifierType;
		let ObjectType = ser.ea.constants.ObjectType;
		let Enumerable = ser.external.linq.Enumerable;
	
		// NOTE:
		// This is a work around that I do not understand why it is needed.  I suspect
		// that it is some interaction between the 'Proxy' class and native objects
		// methods supplied by EA.  I will need to investigate further.
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
		function createNativeMethodWrapperFunction(target, prop) {
			return function() {
				return target.wrappedObject[prop].apply(target.wrappedObject, arguments);
			};
		}
	
		class EaNativeObjectWrapper extends BaseWrapper {
		
		    constructor() {
				super();
				this.knownWrapperProperties = this.knownWrapperProperties.concat(['proxy', 'autoUpdate', 'autoRefresh']);
				this.proxy = null;
				this.autoUpdate = true;
				this.autoRefresh = true;
			}
		
			getHandler(target, property, receiver) {
			
				if (target.knownWrapperProperties.contains(property)
				||  property in target) {
					return target[property];
				}
				else if (!property.isCapitalized()) {
					var propCapitalized = property.capitalize();
					if (propCapitalized in target.wrappedObject) {
						if (typeof target.wrappedObject[propCapitalized] == 'function') {
							return createNativeMethodWrapperFunction(target, propCapitalized);
						}
						else {
							return target.wrappedObject[propCapitalized];
						}
					}
				}
				else {
					if (typeof target.wrappedObject[property] == 'function') {
						return createNativeMethodWrapperFunction(target, property);
					}
					else {
						return target.wrappedObject[property];
					}
				}
				return null;
			}
	
			setHandler(target, property, value, receiver) {
	
				// Propery is in the wrapper - then go through the wrapper 
				if (target.knownWrapperProperties.contains(property)
				||  property in target) {
					//dbg('value updated through here 1 ' + property + ':' + value);
					target[property] = value;
				}
	
				// wrappedObject is null, caller must be setting up a new property
				else if (target.wrappedObject == null) {
					//dbg('value updated through here 2 ' + property + ':' + value);
					target[property] = value;
				}
			
				// Check the ea object
				else {
			
					// Make sure we are referring to the right property name
					var wrappedObjectProperty = property;
					if (!property.isCapitalized()) {
						wrappedObjectProperty = property.capitalize();
					}
			
					// Property is in the wrappedObject - then set it in the wrappedObject
					if (wrappedObjectProperty in target.wrappedObject) {
						//dbg('value updated through here 3 ' + property + '/' + wrappedObjectProperty + ':' + value);
						target.wrappedObject[wrappedObjectProperty] = value;
					}
				
					// Fall through - must be setting up a new property
					else {
						//dbg('value updated through here 4 ' + property + ':' + value);
						target[property] = value;
					}
				}
			
				// Only need to do refresh and update for wrappedObject properties
				if (!target.knownWrapperProperties.contains(property)
				&&  target.wrappedObject != null) {
				
					// Auto update if option is on
					if (target.autoUpdate
					&& 'Update' in target.wrappedObject
					&& typeof target.wrappedObject.Update == 'function') {
						target.wrappedObject.Update();
						//dbg(target.wrappedObject.Name + ' has been updated for ' + property);
					}
	
					// Auto update if option is on
					if (target.autoRefresh
					&& 'Refresh' in target.wrappedObject
					&& typeof target.wrappedObject.Refresh == 'function') {
						target.wrappedObject.Refresh();
						//dbg(target.wrappedObject.Name + ' has been refreshed for ' + property);
					}
				}
			
				return true;
		    }
		
			static createBasicExtendedWrapperClass() {
				return class extends EaNativeObjectWrapper {
					constructor() {
						super();
					}
				};
			}
		
			static basicExtendedWrapperFactoryMethod(basicExtendedWrapperClass) {
				return function(wrappedObject) {
					var wrapper = new basicExtendedWrapperClass(); 
					wrapper.wrappedObject = wrappedObject;
					return wrapper;
				};
			}
		
			static addBasicExtendedWrapperFactoryMethods(factoryClass, factoryMethodsList) {
				factoryMethodsList.forEach(cfg => {
					factoryClass.prototype[cfg.factoryMethod] = EaNativeObjectWrapper.basicExtendedWrapperFactoryMethod(cfg.wrapperClass);
				});
			}
	
			get guid() {
				var guidAttributeName = this.objectType.label + 'GUID';
				return this.wrappedObject[guidAttributeName];
			}
	
			get id() {
				var idAttributeName = this.objectType.label + 'ID';
				return this.wrappedObject[idAttributeName];
			}
			
			get objectType() {
				return ObjectType.fromCode(this.wrappedObject.ObjectType);
			}
	
			equals(item) {
				return (this.objectType.equals(item.objectType) && this.guid == item.guid);
			}
		
			setAttributes(attributes, {forceUpdate=false, forceRefresh=false}={}) {
		
				// Turn off autoUpdate
				this.autoUpdate = false;
				this.autoRefresh = false;
			
				// Keep track of whether any of the new attributes actually had any effect
				var itemChanged = false;
			
				// Process all attributes
				for (var attribute in attributes) {
				
					// Only make change if value is different
					if (typeof this[attribute] == 'object' && 'equals' in this[attribute]) {
						if (this[attribute].equals(attributes[attribute])) {
							continue;
						}
					}
					else if (this[attribute] == attributes[attribute]) {
						continue;
					}
				
					// Make change
					this[attribute] = attributes[attribute];
					itemChanged = true;
				}
			
				// Update, if the item has changed
				if (itemChanged || forceUpdate) {
					if (typeof this.wrappedObject['Update'] == 'function') {
						this.wrappedObject.Update();
					}
				}
			
				// Refresh, if the item has changed
				if (itemChanged || forceRefresh) {
					if (typeof this.wrappedObject['Refresh'] == 'function') {
						this.wrappedObject.Refresh();
					}
					else if ('Element' in this.wrappedObject && typeof this.wrappedObject.Element['Refresh'] == 'function') {
						this.wrappedObject.Element.Refresh();
					}
				}
			
				// And turn the autoUpdate and autoRefresh back on again
				this.autoUpdate = true;
				this.autoRefresh = true;
			}
		}
	
		class AttributeMissingError {
	
			constructor(message) {
				this.message = message;
			}
		}
	
		class AttributesMissingError {
	
			constructor(message) {
				this.message = message;
			}
		}
	
		class AddNewAttributes {
	
			assertAttributePresent(attribute) {
				if (!(attribute in this)) {
					throw new AttributeMissingError(`Expected attribute ${attribute} missing.`);
				}
			}
		
			assertAtLeastOneAttributePresent(attributes) {
				var valid = false;
				for (var attribute of attributes) {
					if (attribute in this) {
						valid = true;
						break;
					}
				}
				if (!valid) {
					throw new AttributesMissingError(`Expected at least one of (${attributes.toString}).  All are missing.`);
				}
			}
		
			adjust(changes) {
			
				// Make a copy of this object
				var attributes = {};
				Object.assign(attributes, this);
			
				// Only adjust if we have been provided changes
				if (changes) {
				
					// Process attribute deletion changes
					if ('delete' in changes) {
						if (typeof changes.delete == 'string')
							delete attributes[changes.delete];
						else if (Array.isArray(changes.delete))
							changes.delete.forEach(attribute => delete attributes[attribute]);
					}
				
					// Process attribute addition changes
					if ('add' in changes) {
						if (Array.isArray(changes.add)) {
							changes.add.forEach(chg => {
								attributes[chg.attribute] = chg.value
							});
						}
						else if (typeof changes.add == 'object') {
							attributes[changes.add.attribute] = changes.add.value;
						}
					}
				}
			
				return attributes;
			}
		}
	
		class CollectionWrapper {
		
			constructor() {
				this.eaCollection = null;
				this.wrapItem = null;
				this.itemIdentifier = null;
				this.newItemDetails = null;
		    }
	
			addNew(attributes) {
			
				Reflect.setPrototypeOf(attributes, AddNewAttributes.prototype);
			
				var details = this.newItemDetails(attributes);
	
				var eaItem = this.eaCollection.AddNew(details.name, details.type);
			
				var item = null;
				if (eaItem != null) {
					item = this.wrapItem(eaItem);
					item.setAttributes(details.attributes, {forceUpdate: true, forceRefresh: true});
				}
	
				this.refresh();
	
				if ('postAddNewAction' in details) {
					details.postAddNewAction();
				}
			
				return item;
			}
		
			delete(identifier, identifierType) {
	
				// Default identifier type based on passed in parameters
				var type = identifierType;
				if (typeof identifierType == 'undefined') {
					if (typeof identifier == 'object')
						type = ItemIdentifierType.Wrapper;
					else
						type = ItemIdentifierType.Identifier;
				}
	
				// Cater for simple index identification
				var foundIdx = -1;
				if (type.equals(ItemIdentifierType.Index)) {
					foundIdx = identifier;
				}
			
				// Otherwise we need to find the index of the item matching the identifier provided
				else {
				
					// Specifier a different identifier function based on the type
					var itemIdentified = null;
					switch(type.code) {
						case ItemIdentifierType.Id.code:
							itemIdentified = (item) => { return (item.id == identifier)};			
							break;
						case ItemIdentifierType.Guid.code:
							itemIdentified = (item) => { return (item.guid == identifier)};			
							break;
						case ItemIdentifierType.Identifier.code:
							itemIdentified = (item) => { return this.itemIdentifier(item) == identifier};			
							break;
						case ItemIdentifierType.Wrapper.code:
							itemIdentified = (item) => { return (item.guid == identifier.guid)};
							break;
					}
	
					// Determine the index of the item to delete
					var idx = 0;
					this.forEach(item => {
						if (itemIdentified(item)) {
							foundIdx = idx;
							return false;
						}
						idx++;
						return true;
					});
				}
	
				// And delete if found
				if (foundIdx >= 0) {
					this.eaCollection.Delete(foundIdx);
					this.refresh();
				}
			}
	
			get(identifier, itemIdentifierFunction) {
			
				// Determine which identifier function to use
				var itemIdentifier = this.itemIdentifier;
				if (itemIdentifierFunction != null) {
					itemIdentifier = itemIdentifierFunction;
				}
			
				// Get the first item in the collection that has the given identifier
				try {
					return this.first(item => itemIdentifier(item) === identifier);
				}
			
				// Handle exceptions thrown by the Enumerable module
				catch (exception) {
				
					// If we couldn't find corresponding item, return null (rather than exception)
					if (exception instanceof Error
					&&  exception.message === 'first:No element satisfies the condition.') {
						return null;
					}
				
					// Rethrow any other exceptions
					throw exception;
				}
			}
		
			getEnumerator() {
			
		        var self = this
		        var idx = -1;
	
		        return {
					current: function () {
						return self.wrapItem(self.eaCollection.GetAt(idx));
					},
		            moveNext: function () {
						if (self.eaCollection.Count <= 0) {
							return false;
						}
						idx++;
						if (idx >= self.eaCollection.Count) {
							return false;
						}
						return true;
	
		            },
		            dispose: function () { }
		        };
		    };
		
			refresh() {
				this.eaCollection.Refresh();
			}
		}
	
		// Set the prototype of CollectionWrapper to use the Enumerable methods
		function setCollectionWrapperPrototype() {
		
			// Get an empty enumerable to use a prototype object
			var prototype = namespace.ser.external.linq.Enumerable.empty();
	
			// Rename the count() method
			prototype.countByLinq = prototype.count;
		
			// Set a 'count' getter property that returns the EA collection count
			Reflect.defineProperty(prototype, 'count', {get: function() {
				return this.eaCollection.Count;
			}});
	
			// And set the prototype of the wrapperClass
			Reflect.setPrototypeOf(CollectionWrapper.prototype, prototype);
		}
		setCollectionWrapperPrototype();
	
		class Factory {
	
			newCollectionWrapper(eaCollection, wrapItemFunction, itemIdentifierFunction, newItemDetailsFunction) {
				var wrapper = new CollectionWrapper();
				wrapper.wrapItem = wrapItemFunction;
				wrapper.itemIdentifier = itemIdentifierFunction;
				wrapper.newItemDetails = newItemDetailsFunction;
				wrapper.eaCollection = eaCollection;
				return wrapper;
			}
		}
	
		// Module Export
		var module = {};
		module.Factory = Factory;
		module.Attributes = AddNewAttributes;
		module.EaNativeObjectWrapper = EaNativeObjectWrapper;
		module.CollectionWrapper = CollectionWrapper;
		namespace.registerModule('ser.ea.base', module);
		return module
	};

}//end ser_ea_base

