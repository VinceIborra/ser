function ser_tools(manager, instanceName) {

	this.getModule = function(){

		// Perform module imports
		namespace.include(ser_ea_constants);
	
		// Local synonyms
		let ConnectorType = ser.ea.constants.ConnectorType;
		let ObjectType = ser.ea.constants.ObjectType;
	
		// Module Classes
		class Tools {
		
			constructor() {
				this.repository = null;
			}
		
			findDependencies(elm) {
			
				var pending = [elm];
				var visited = [];
				var dependencies = [];
	
				while (pending.length > 0) {
					var elmToProcess = pending.pop();
					dbg('Processing ' + elmToProcess.name);
				
					visited.push(elmToProcess.guid);
				
					elmToProcess.connectors.forEach(cnt => {
					
						var client = cnt.client;
						var supplier = cnt.supplier;
					
						dbg('Found ' + supplier.name);
					
						if (visited.contains(supplier.guid)
						|| dependencies.contains(supplier)) {
							dbg('Dismissing ' + supplier.name);
							return;
						}
	
						if (supplier != null) {
							dbg('Adding ' + supplier.name);
							dependencies.push(supplier);
							pending.push(supplier);
						}
					});		
				}
			
				return dependencies;
			}
		
			assertIsAddin(elm) {
		
				if (elm.fQStereotype != 'Model Add-Ins::JavascriptAddin') {
					throw '' + elm.name + ' is not a JavascriptAddin';
				}				
			}
	
			flattenDependencies(elm) {
				this.assertIsAddin(elm);
				var dependencies = this.findDependencies(elm);
				dependencies.forEach(dep => {
	
					// Skip any we already have connectors to
					if (elm.connectors.indexOf(cnt => cnt.supplier.equals(dep)) >= 0) {
						return;
					}
				
					// Create new ones
					elm.connectTo(dep, { type: ConnectorType.Dependency });
				});	
			}
		}
	
		class SimpleRepositoryReporter {
		
			constructor() {
				this.repository = null;
			}
		
			listAllItems() {
	
				this.repository.models.forEach(mdl => {
	
					dbg('Model - ' + mdl.name);
					mdl.traverseDepthFirst()
					.forEach(itm => {
						switch(itm.objectType.code) {
							case ObjectType.Element.code:
								dbg('Element - ' + itm.name);
								itm.attributes.forEach(att => {
									dbg('Attribute - ' + itm.name);
								});
								break;
							case ObjectType.Package.code:
								dbg('Package - ' + itm.name);
							
								break;
							default:
								dbg('Unknown - ' + itm.name + ' (' + itm.objectType.label + ')');
								break;
						}
					});
				});
			}
		}
	
		class CodeExporter {
		
			constructor() {
				this.repository = null;
				this.stdout = null;
				this.project = null;
			}
		
			exportElement(elm) {
				this.stdout.writeLine(elm.toString());
				dbg('genFile = ' + elm.genFile);
				dbg('GenFile = ' + elm.GenFile);
				dbg('Genfile = ' + elm.Genfile);
				elm.genFile = 'C:\\Users\\vji\\context\\yakka\\peso\\dev\\tmp\\' + elm.name + '.js';
				dbg('file = ' + elm.genFile);
				var xmlGuid = this.project.gUIDtoXML(elm.guid);
				//this.project.generateClass(xmlGuid, 'overwrite=1');
				this.project.generateClass(xmlGuid, '');
			}
		
			exportMethod(mth) {
				this.stdout.writeLine(mth.Code);
			}
		
			export(menuLocation) {
				this.repository.currentSelection.list.forEach(item => {
				
				
				
					dbg('selected = ' + item.name);
					dbg('Alias = ' + item.alias);
					dbg('BaseType = ' + item.baseType);
					dbg('ContextType = ' + item.contextType);
					dbg('ElementGUID = ' + item.elementGUID);
					dbg('ElementID = ' + item.elementID);
					dbg('Locked = ' + item.locked);
					dbg('MetaType = ' + item.metaType);
				
				});
			}
		}
	
		class Parser {
		
			constructor() {
				this.factory = null;
				this.repository = null;
			}
		
			parse(event) {
				if (event instanceof MenuClick) {
					return this.parseMenuClick(event);
				}
			}
		
			parseUnitTestMenuClick(namespaceString) {
			
				// Special handling for global test module
				if (namespaceString == 'All') {
					return this.factory.newUnitTestCommand(
						ser.unit.context,
						'multiple'
					);
				}
			
				// Add ".tst" to complete the name
				var str = namespaceString + '.tst';
			
				// Breakup the given namespace string into the component names
				var names = str.split(".");
			
				// Navigate through the namespace until we get to the end
				var ns = namespace;
				for (var idx=0; idx<names.length; idx++) {
				
					var name = names[idx];
				
					// Get to the next level down
					if (ns[name] != null) {
						ns = ns[name];
						continue;
					}
				
					// If we havent found it, then we're done
					return null;
				}
			
				return this.factory.newUnitTestCommand(
					ns,
					'single'
				);
			}
		
			parseMenuClick(click) {
			
				// Handle commands identified by the menu name
				switch(click.menuName) {
					case '-Unit Testing':
						return this.parseUnitTestMenuClick(click.itemName)
						break;
				}
			
				// Get the current selection
				var currentSelection = this.repository.currentSelection;
			
				// Get the current diagram, if relevant
				var currentDiagram = null;
				if (currentSelection.location == 'Diagram') {
					currentDiagram = this.repository.getCurrentDiagram();
				}
			
				// Handle commands identified by the item name
				switch(click.itemName) {
				
					case 'Run Script':
						return this.factory.newRunScriptCommand(this.repository.currentSelection.items);
						break;
				
					case 'Export Code':
						return this.factory.newExportCodeCommand(
							this.repository.currentSelection.items
						);
						break;
				
					case 'Flatten Dependencies':
						return this.factory.newFlattenDependenciesCommand(
							this.repository.currentSelection.items,
							currentDiagram
						);
						break;
					
					case 'What\'s Selected':
						var currentSelection = this.repository.currentSelection;
						return this.factory.newWhatsSelectedCommand(
							currentSelection.location,
							currentSelection.list
						);
						break;
				}	
		    }
		}
	
		class FlattenDependenciesCommand {
		
			constructor() {
				this.items = null;
				this.diagram = null;
			}
		
			process(controller) {
				return controller.processFlattenDependenciesCommand(this);
			}
		}
	
		class WhatsSelectedCommand {
		
			constructor() {
				this.location = null;
				this.list = null;
			}
		
			process(controller) {
				return controller.processWhatsSelectedCommand(this);
			}
		}
	
		class RunScriptCommand {
		
			constructor() {
				this.items = null;
			}
		
			process(controller) {
				return controller.processRunScriptCommand(this);
			}
		}
	
		class ExportCodeCommand {
		
			constructor() {
				this.list = null;
			}
		
			process(controller) {
				return controller.processExportCodeCommand(this);
			}
		}
	
		class UnitTestCommand {
		
			constructor() {
				this.testModule = null;
				this.mode = null;
			}
	
			process(controller) {
				return controller.processUnitTestCommand(this);
			}
		}
	
		class Controller {
	
			constructor() {
				this.factory = null;
				this.repository = null;
				this.tools = null;
				this.stdout = null;
				this.codeExporter = null;
			}
		
			process(command) {
				return command.process(this);
			}
	
			processFlattenDependenciesCommand(command) {
			
				var elements = [];
			
				command.items
				.where(itm => ObjectType.Element.equals(itm.objectType)) 
				.forEach(elm => {
					this.tools.flattenDependencies(elm);
					elements.push(elm);
				});
				
				var model = {};
				var viewNames = [];
				model.dbg = elm.name + ' has been flattened.';
				viewNames.push('Text');
					
				if (command.diagram != null) {
					model.diagram = command.diagram;
				}
				viewNames.push('RefreshDiagram');
			
				return this.factory.newModelAndView(model, viewNames);
			}
		
			processWhatsSelectedCommand(command) {
			
				var str = 'Location = ' + command.location + '\n';
		//		command.list.forEach(eac => {
		//			str += 'Alias = ' + eac.alias + '\n' +
		//			       'BaseType = ' + eac.baseType + '\n' +
		//			       'ContextType = ' + eac.contextType + '\n' +
		//			       'ElementGUID = ' + eac.elementGUID + '\n' +
		//			       'ElementID = ' + eac.elementID + '\n' +
		//			       'Locked = ' + eac.locked + '\n' +
		//			       'MetaType = ' + eac.metaType + '\n' +
		//			       'Name = ' + eac.name + '\n'
		//			       'ObjectType = ' + eac.objectType;		
		//		});
				
				command.list.forEach(eac => str += eac.toString());
				this.stdout.writeLine(str);
				return null;
			}
		
			processUnitTestCommand(command) {
				command.testModule.testRunner.runTests(command.mode);
				return null;
			}
		
			processExportCodeCommand(command) {
				command.items.forEach(elm => this.codeExporter.exportElement(elm));
				return null;
			}
		
			processRunScriptCommand(command) {
			
				// Run all selected items
				command.items.forEach(itm => {
				
					// Determine element and method to run
					var elementName = null;
					var methodName = null;
					switch(itm.objectType.code) {
					
						case ObjectType.Element.code:
							elementName = itm.name;
							methodName = 'run';
							break;			
					
						case ObjectType.Method.code:
							elementName = itm.parent.name;
							methodName = itm.name;
							break;
					
						default:
					}
				
					// Create the script object
					var script = this.factory.newScriptObject(elementName);
				
					// And run it
					script[methodName]();
				});
				return null;
			}
		}
	
		class ModelAndView {
		
			constructor() {
				this.model = null;
				this.views = null;
			}
		}
	
		class DbgOutput {
		
			constructor() {
				this.viewResolver = null;
			}
		
			present(modelAndView) {
				var view = this.viewResolver.resolve(modelAndView.viewName);	
		        var output = view.render(modelAndView.model);
				var lines = output.split('\n');
				lines.forEach(line => dbg(line));
			}
		}
	
		class NoOpOutput {
		
			constructor() {
			}
		
			present(model) {
				// No Op
			}
		}
	
		class Output {
	
			constructor() {
				this.viewResolver = null;
				this.channelResolver = null;
			}
		
			present(modelAndView) {
				modelAndView.viewNames.forEach(viewNames => {
					var view = this.viewResolver.resolve(viewName);	
					var channel = this.channelResolver.resolve(viewName);	
					var output = view.render(modelAndView.model);
					channel.present(output);
				});	
			}
		}
	
		class TextView {
		
			constructor() {
			}
		
			render(model) {
				return model;
			}
		}
	
		class RefreshDiagramView {
	
			constructor() {
				this.textView = null;
				this.noOpView = null;
			}
		
			resolve(viewName) {
				switch(viewName) {
					case 'Text': return this.textView; break;
				}
			}
		}
	
		class ViewResolver {
		
			constructor() {
				this.textView = null;
				this.noOpView = null;
			}
		
			resolve(viewName) {
				switch(viewName) {
					case 'Text': return this.textView; break;
					case 'NoOp': return this.noOpView; break;
				}
			}
		}
	
		class ChannelResolver {
		
			constructor() {
				this.dbgChannel = null;
				this.noOpChannel = null;
				this.diagramRefreshChannel = null;
			}
		
			resolve(viewName) {
				switch(viewName) {
					case 'Text': return this.dbgChannel; break;
					case 'NoOp': return this.noOpChannel; break;
				}
			}
		}
	
		class Driver {
		
			constructor() {
				this.input = null;
				this.output = null;
				this.controller = null;
			}
	
			run() {
			
				var done = false;
				while (!done) {
				
					// Get the next input
					var command = this.input.next();
					if (command == null) {
						done = true;
						continue;
					}
				
		            // Process the command
		            var modelAndView = this.controller.process(command);
				
					// Present the model back to the user
					if (modelAndView != null) {
						this.output.present(modelAndView);
					}
		        }
		    }
		}
	
		class MenuClick {
		
			constructor() {
				this.menuLocation = null;
				this.menuName = null;
				this.itemName = null;
			}
		}
	
		class Input {
		
			constructor() {
				this.factory = null;
				this.events = [];
			}
		
			addMenuClick(menuLocation, menuName, itemName) {
				this.events.push(
					this.factory.newMenuClick(menuLocation, menuName, itemName)
				);
			}
		
			next() {
				return this.parser.parse(this.events.shift());
			}
		}
	
		class Factory {
		
			constructor() {
				this.repository = null;
			}
		
			newScriptObject(name) {
				var script = new globalThis[name]();
				script.repository = this.repository;
				script.session = this.session;
				return script;
			}
		
			newMenuClick(menuLocation, menuName, itemName) {
				var click = new MenuClick();
				click.menuLocation = menuLocation;
				click.menuName = menuName;
				click.itemName = itemName;
				return click;
			}
		
			newInput(parser) {
				var input = new Input();
				input.factory = this;
				input.parser = parser;
				return input;
			}
		
			newTools() {
				var tools = new Tools();
				tools.repository = this.repository;
				return tools;
			}
		
			newSimpleRepositoryReporter() {
				var reporter = new SimpleRepositoryReporter();
				reporter.repository = this.repository;
				return reporter;
			}
		
			newCodeExporter() {
				var exporter = new CodeExporter();
				exporter.repository = this.repository;
				return exporter;
			}
		
			newParser() {
				var parser = new Parser();
				parser.factory = this;
				parser.repository = this.repository;
				return parser;
			}
	
			newController(tools, stdout, codeExporter) {
				var controller = new Controller();
				controller.factory = this;
				controller.tools = tools;
				controller.stdout = stdout;
				controller.codeExporter = codeExporter;
				controller.repository = this.repository;
				return controller;
			}
	
			newDbgOutput(viewResolver) {
				var output = new DbgOutput();
				output.viewResolver = viewResolver;
				return output;
			}
	
			newNoOpOutput() {
				var output = new NoOpOutput();
				return output;
			}
	
			newOutput(dbgOutput, noOpOutput) {
				var output = new Output();
				output.dbgChannel = dbgOutput;
				output.noOpChannel = noOpOutput;
				return output;
			}
	
			newRunScriptCommand(items) {
				var command = new RunScriptCommand();
				command.items = items;
				return command;
			}
		
			newExportCodeCommand(items) {
				var command = new ExportCodeCommand();
				command.items = items;
				return command;
			}
		
			newFlattenDependenciesCommand(items, diagram) {
				var command = new FlattenDependenciesCommand();
				command.items = items;
				command.diagram = diagram;
				return command;
			}
		
			newWhatsSelectedCommand(location, list) {
				var command = new WhatsSelectedCommand();
				command.location = location;
				command.list = list;
				return command;
			}
		
			newUnitTestCommand(testModule, mode) {
				var command = new UnitTestCommand();
				command.testModule = testModule;
				command.mode = mode;
				return command;
			}
		
			newModelAndView(model, viewName) {
		        var modelAndView = new ModelAndView();
		        modelAndView.model = model;
		        modelAndView.viewName = viewName;
		        return modelAndView;
		    }
		
			newViewResolver() {
				var viewResolver = new ViewResolver();
				viewResolver.textView = new TextView();
				return viewResolver;
			}
		
			newDriver(input, output, controller) {
				var driver = new Driver();
				driver.input = input;
				driver.output = output;
				driver.controller = controller;
				return driver;
			}
	
		}
	
		// Module Export
		var module = {};
		module.Factory = Factory;
		namespace.registerModule('ser.tools', module);
		return module
	
	};

}//end ser_tools

