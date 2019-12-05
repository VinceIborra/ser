function ser_ea_context(manager, instanceName) {

	/// 
	/// <param name="namespace"></param>
	this.getModule = function(namespace){

		// Perform module imports
		namespace.include(ser_external_linq, {useNamespace: 'ser.external.linq.Enumerable'});
		namespace.include(ser_ea_base);
		namespace.include(ser_ea_repository);
		namespace.include(ser_ea_element);
		namespace.include(ser_ea_connector);
		namespace.include(ser_ea_diagram);
		namespace.include(ser_ea_elementFeature);
		namespace.include(ser_ea_projectInterface);
		namespace.include(ser_ea_searchWindow);
		namespace.include(ser_ea_session);
	
		// ser.ea.base factory
		var baseFactory = new namespace.ser.ea.base.Factory();
	
		// ser.ea.elementFeature factory
		var elementFeatureFactory = new namespace.ser.ea.elementFeature.Factory();
		elementFeatureFactory.baseFactory = baseFactory;
	
		// ser.ea.connector context
		var connectorFactory = namespace.ser.ea.connector.context.factory;
		connectorFactory.baseFactory = baseFactory;
		connectorFactory.elementFeatureFactory = elementFeatureFactory;
		var connectorAddNewHelper = namespace.ser.ea.connector.context.addNewHelper;
	
		// ser.ea.diagram factory
		var diagramFactory = new namespace.ser.ea.diagram.Factory();
		diagramFactory.baseFactory = baseFactory;
		
		// ser.ea.element factory
		var elementFactory = new namespace.ser.ea.element.Factory();
		elementFactory.baseFactory = baseFactory;
		elementFactory.connectorFactory = connectorFactory;
		elementFactory.connectorAddNewHelper = connectorAddNewHelper;
		elementFactory.elementFeatureFactory = elementFeatureFactory;
		elementFactory.diagramFactory = diagramFactory;
		elementFeatureFactory.elementFactory = elementFeatureFactory;
		connectorFactory.elementFactory = elementFactory;
	
		// ser.ea.projectInterface
		var projectInterfaceFactory = new namespace.ser.ea.projectInterface.Factory();
	
		// ser.ea.searchWindow
		var searchWindowFactory = new namespace.ser.ea.searchWindow.Factory();
		searchWindowFactory.baseFactory = baseFactory;
		searchWindowFactory.elementFactory = elementFactory;
	
		// ser.ea.repository factory
		var repositoryFactory = new namespace.ser.ea.repository.Factory();
		repositoryFactory.baseFactory = baseFactory;
		repositoryFactory.elementFactory = elementFactory;
		repositoryFactory.elementFeatureFactory = elementFeatureFactory;
		repositoryFactory.connectorFactory = connectorFactory;
		repositoryFactory.connectorAddNewHelper = connectorAddNewHelper;
		repositoryFactory.diagramFactory = diagramFactory;
		repositoryFactory.elementFactory = elementFactory;
		repositoryFactory.projectInterfaceFactory = projectInterfaceFactory;
		repositoryFactory.searchWindowFactory = searchWindowFactory;
	
		// ser.ea.session factory
		var sessionFactory = new ser.ea.session.Factory();
	
		// repository object
		var repository = repositoryFactory.newRepositoryWrapper(Repository);
		[connectorFactory, diagramFactory, elementFactory, elementFeatureFactory, searchWindowFactory]
		.forEach(factory => factory.repository = repository);
	
		// session object
		var session = sessionFactory.newSessionWrapper(Session);
	
		// Module Export
		var module = {};
		module.repository = repository;
		module.project = repository.getProjectInterface();
		module.session = session;
		namespace.registerModule('ser.ea.context', module);
		return module
	};

}//end ser_ea_context

