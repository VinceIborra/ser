function Peso(manager, instanceName) {

	this.bob = null;
	this.flag = false;
	this.isBootstrapped = false;
	this.hasEaConnectRun = false;
	this.receptionStatsTab = null;

	/// 
	/// <param name="options"></param>
	this.bootstrap = function(options){

		// No need to do anything else, if we've already been here
		if (this.isBootstrapped) {
			return;
		}
	
		var ADDIN_NAME = 'Peso';
	
		// Initialise ser context
		(new ser()).bootstrap({
			debugOutputTab: ADDIN_NAME
		});
	
		// Imports
		namespace.include(ser_ea_context);
		namespace.include(ser_ea_constants);
		namespace.include(ser_io);
		//namespace.include(ser_ea_repository);
		namespace.include(ser_unit);
		namespace.include(ser_external_log4js, {useNamespace: 'ser.external.log4js'});
		namespace.include(ser_tools);
		namespace.include(ser_ea_connector);
		namespace.include(ser_js);
		namespace.include(ser_ms_Scripting_FileSystemObject);
	
		// Testing Module Imports
		namespace.include(ser_base_tst);
		namespace.include(ser_context_tst);
		namespace.include(ser_ea_base_tst);
		namespace.include(ser_ea_connector_tst);
		namespace.include(ser_ea_constants_tst);
		namespace.include(ser_ea_diagram_tst);
		namespace.include(ser_ea_element_tst);
		namespace.include(ser_ea_elementFeature_tst);
		namespace.include(ser_ea_session_tst);
		namespace.include(ser_io_tst);
		namespace.include(ser_unit_tst);
		namespace.include(ser_ea_context_tst);
		namespace.include(ser_ea_repository_tst);
		namespace.include(ser_ea_searchWindow_tst);
		namespace.include(ser_ea_native_elementFeature_tst);
		namespace.include(ser_ea_native_repository_tst);
		namespace.include(ser_ea_native_searchWindow_tst);
		namespace.include(ser_tools_tst);
		namespace.include(ser_js_tst);
		namespace.include(ser_ms_Scripting_FileSystemObject_tst);
		namespace.include(ser_external_linq_tst);
	
	
		// And setup test runners so that they output to the right tab
		var ioFactory = new ser.io.Factory();
		var eaConsole = ioFactory.newEaOutputConsole(ADDIN_NAME);
		[ser.unit.context, ser.context.tst, ser.unit.tst, ser.io.tst, ser.ea.base.tst,
		ser.ea.connector.tst, ser.ea.context.tst, ser.ea.diagram.tst, 
		ser.ea.element.tst, ser.ea.elementFeature.tst, ser.ea.repository.tst,
		ser.ea.searchWindow.tst, ser.ea.session.tst,
		ser.ea.native.elementFeature.tst, ser.ea.native.repository.tst, ser.ea.native.searchWindow.tst,
		ser.tools.tst, ser.js.tst, ser.ms.Scripting.FileSystemObject.tst,
		ser.external.linq.tst]
		.forEach(ns => ns.testRunner.console = eaConsole);
		
		// Initialise
		function initialiseStats(stats) {
			stats.receptions = {};
			stats.receptions.EA_Connect = {};
			stats.receptions.EA_Connect.numberOfExecutions = 0;
			stats.receptions.EA_GetMenuItems = {};
			stats.receptions.EA_GetMenuItems.numberOfExecutions = 0;
			stats.receptions.EA_MenuClick = {};
			stats.receptions.EA_MenuClick.numberOfExecutions = 0;
		}
		
		this.stats = {};
		initialiseStats(this.stats);
	
		/*
		// ser.external.Log4js
		var log4jsWrapper = new ser_external_log4js();
		this.namespaces.Log4js = log4jsWrapper.getModule();
		var Log4js = this.namespaces.Log4js;
	
		var eaConsole = new io.EaOutputConsole();
	
		MyAppender = function () {
			this.layout = new Log4js.SimpleLayout();
		};
	
		MyAppender.prototype = Log4js.extend(new Log4js.Appender(), {
			doAppend: function (loggingEvent) {
			
				eaConsole.writeLine(this.layout.format(loggingEvent));
				//log(this.layout.format(loggingEvent));
			
			},
			toString: function () {
				return "MyAppender";
			}
		});
	
		var consoleAppender = new MyAppender(true);
		
		this.logger = new Log4js.Logger("Test");
		this.logger.setLevel(Log4js.Level.ALL);
		this.logger.addAppender(consoleAppender);
	
		this.logger.trace('hello');
		*/
	
		// Save reference to the repository
		this.repository = ser.ea.context.repository;
	
		// Create tools
		var toolsFactory = new ser.tools.Factory();
		toolsFactory.repository = ser.ea.context.repository;
		toolsFactory.session = ser.ea.context.session;
	
		this.tools = toolsFactory.newTools();
		this.simpleRepositoryReporter = toolsFactory.newSimpleRepositoryReporter();
		this.codeExporter = toolsFactory.newCodeExporter();
		this.codeExporter.stdout = eaConsole;
		this.codeExporter.project = ser.ea.context.project;
	
		this.parser = toolsFactory.newParser();
	
		this.input = toolsFactory.newInput(this.parser);
	
		this.controller = toolsFactory.newController(this.tools, eaConsole, this.codeExporter);
	
		this.viewResolver = toolsFactory.newViewResolver();
		this.dbgOutput = toolsFactory.newDbgOutput(this.viewResolver);
		this.noOpOutput = toolsFactory.newNoOpOutput();
		this.output = toolsFactory.newOutput(this.dbgOutput, this.noOpOutput);
	
		this.driver = toolsFactory.newDriver(this.input, this.output, this.controller);
	
		this.isBootstrapped = true;
	};

	this.showPropertyList = function(){

		var xml = "" +
		"<?xml version='1.0'?>" +
		"<properties>" +
		"  <group name='ER_Connect'>" +
		"    <property id='1' type='text' default='' readonly='false' >" +
		"      <name>Number Of Executions</name>" +
		"      <value>" + this.stats.receptions.EA_Connect.numberOfExecutions + "</value>" +
		"      <description>Execution count</description>" +
		"    </property>" +
		"  </group>" +
		"  <group name='ER_GetMenuItems'>" +
		"    <property id='1' type='text' default='' readonly='false' >" +
		"      <name>Number Of Executions</name>" +
		"      <value>" + this.stats.receptions.EA_GetMenuItems.numberOfExecutions + "</value>" +
		"      <description>Execution count</description>" +
		"    </property>" +
		"  </group>" +
		"  <group name='ER_MenuClick'>" +
		"    <property id='1' type='text' default='' readonly='false' >" +
		"      <name>Number Of Executions</name>" +
		"      <value>" + this.stats.receptions.EA_MenuClick.numberOfExecutions + "</value>" +
		"      <description>Execution count</description>" +
		"    </property>" +
		"  </group>" +
		"</properties>";
	
		if(this.receptionStatsTab == null) {
			this.receptionStatsTab = Repository.AddPropertiesTab('Reception Stats', xml);
		}
		else {
			this.receptionStatsTab.SetPropertiesXML(xml);
		}
	
		Repository.ShowAddinWindow('Reception Stats');
	};

}//end Peso

