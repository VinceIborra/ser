function ser_ea_constants(manager, instanceName) {

	this.getModule = function(){

		namespace.include(ser_context);
	
		// Local synonyms
		let enumFactory = ser.base.factory;
	
		var ConnectorType = enumFactory.newEnumType([
			{ code: 'Aggregation', label: 'Aggregation'},
			{ code: 'Assembly', label: 'Assembly'},
			{ code: 'Association', label: 'Association'},
			{ code: 'Collaboration', label: 'Collaboration'},
			{ code: 'CommunicationPath', label: 'CommunicationPath'},
			{ code: 'Connector', label: 'Connector'},
			{ code: 'ControlFlow', label: 'ControlFlow'},
			{ code: 'Delegate', label: 'Delegate'},
			{ code: 'Dependency', label: 'Dependency'},
			{ code: 'Deployment', label: 'Deployment'},
			{ code: 'ERLink', label: 'ERLink'},
			{ code: 'Generalization', label: 'Generalization'},
			{ code: 'InformationFlow', label: 'InformationFlow'},
			{ code: 'Instantiation', label: 'Instantiation'},
			{ code: 'InterruptFlow', label: 'InterruptFlow'},
			{ code: 'Manifest', label: 'Manifest'},
			{ code: 'Nesting', label: 'Nesting'},
			{ code: 'NoteLink', label: 'NoteLink'},
			{ code: 'ObjectFlow', label: 'ObjectFlow'},
			{ code: 'Package', label: 'Package'},
			{ code: 'Realisation', label: 'Realisation'},
			{ code: 'Sequence', label: 'Sequence'},
			{ code: 'StateFlow', label: 'StateFlow'},
			{ code: 'TemplateBinding', label: 'TemplateBinding'},
			{ code: 'UseCase', label: 'UseCase'}
		]);
	
		var ElementType = enumFactory.newEnumType([
			{ code: 'Action', label: 'Action'},
			{ code: 'Activity', label: 'Activity'},
			{ code: 'ActivityPartition', label: 'ActivityPartition'},
			{ code: 'ActivityRegion', label: 'ActivityRegion'},
			{ code: 'Actor', label: 'Actor'},
			{ code: 'Artifact', label: 'Artifact'},
			{ code: 'Association', label: 'Association'},
			{ code: 'Boundary', label: 'Boundary'},
			{ code: 'Change', label: 'Change'},
			{ code: 'Class', label: 'Class'},
			{ code: 'Collaboration', label: 'Collaboration'},
			{ code: 'Component', label: 'Component'},
			{ code: 'Constraint', label: 'Constraint'},
			{ code: 'Decision', label: 'Decision'},
			{ code: 'DeploymentSpecification', label: 'DeploymentSpecification'},
			{ code: 'DiagramFrame', label: 'DiagramFrame'},
			{ code: 'EmbeddedElement', label: 'EmbeddedElement'},
			{ code: 'Entity', label: 'Entity'},
			{ code: 'EntryPoint', label: 'EntryPoint'},
			{ code: 'Event', label: 'Event'},
			{ code: 'ExceptionHandler', label: 'ExceptionHandler'},
			{ code: 'ExitPoint', label: 'ExitPoint'},
			{ code: 'ExpansionNode', label: 'ExpansionNode'},
			{ code: 'ExpansionRegion', label: 'ExpansionRegion'},
			{ code: 'Feature', label: 'Feature'},
			{ code: 'GUIElement', label: 'GUIElement'},
			{ code: 'InteractionFragment', label: 'InteractionFragment'},
			{ code: 'InteractionOccurrence', label: 'InteractionOccurrence'},
			{ code: 'InteractionState', label: 'InteractionState'},
			{ code: 'Interface', label: 'Interface'},
			{ code: 'InterruptibleActivityRegion', label: 'InterruptibleActivityRegion'},
			{ code: 'Issue', label: 'Issue'},
			{ code: 'Node', label: 'Node'},
			{ code: 'Note', label: 'Note'},
			{ code: 'Object', label: 'Object'},
			{ code: 'Package', label: 'Package'},
			{ code: 'Parameter', label: 'Parameter'},
			{ code: 'Part', label: 'Part'},
			{ code: 'Port', label: 'Port'},
			{ code: 'ProvidedInterface', label: 'ProvidedInterface'},
			{ code: 'Report', label: 'Report'},
			{ code: 'RequiredInterface', label: 'RequiredInterface'},
			{ code: 'Requirement', label: 'Requirement'},
			{ code: 'Screen', label: 'Screen'},
			{ code: 'Sequence', label: 'Sequence'},
			{ code: 'State', label: 'State'},
			{ code: 'StateNode', label: 'StateNode'},
			{ code: 'Synchronization', label: 'Synchronization'},
			{ code: 'Text', label: 'Text'},
			{ code: 'TimeLine', label: 'TimeLine'},
			{ code: 'UMLDiagram', label: 'UMLDiagram'},
			{ code: 'UseCase', label: 'UseCase'}
		]);
	
		var ItemIdentifierType = enumFactory.newEnumType([
			{ code: 'INDEX', label: 'Index'},
			{ code: 'ID', label: 'Id'},
			{ code: 'GUID', label: 'Guid'},
			{ code: 'IDENTIFIER', label: 'Identifier'},
			{ code: 'WRAPPER', label: 'Wrapper'}
		]);
		
		// ObjectType
		var otNone 							= 0;
		var otProject 						= 1;
		var otRepository 					= 2;
		var otCollection 					= 3;
		var otElement 						= 4;
		var otPackage 						= 5;
		var otModel 						= 6;
		var otConnector 					= 7;
		var otDiagram 						= 8;
		var otRequirement 					= 9;
		var otScenario 						= 10;
		var otConstraint 					= 11;
		var otTaggedValue 					= 12;
		var otFile 							= 13;
		var otEffort 						= 14;
		var otMetric 						= 15;
		var otIssue 						= 16;
		var otRisk 							= 17;
		var otTest 							= 18;
		var otDiagramObject 				= 19;
		var otDiagramLink 					= 20;
		var otResource 						= 21;
		var otConnectorEnd 					= 22;
		var otAttribute 					= 23;
		var otMethod 						= 24;
		var otParameter 					= 25;
		var otClient 						= 26;
		var otAuthor 						= 27;
		var otDatatype 						= 28;
		var otStereotype 					= 29;
		var otTask 							= 30;
		var otTerm 							= 31;
		var otProjectIssues 				= 32;
		var otAttributeConstraint 			= 33;
		var otAttributeTag 					= 34;
		var otMethodConstraint 				= 35;
		var otMethodTag 					= 36;
		var otConnectorConstraint 			= 37;
		var otConnectorTag 					= 38;
		var otProjectResource 				= 39;
		var otReference 					= 40;
		var otRoleTag						= 41;
		var otCustomProperty 				= 42;
		var otPartition 					= 43;
		var otTransition 					= 44;
		var otEventProperty 				= 45;
		var otEventProperties 				= 46;
		var otPropertyType 					= 47;
		var otProperties 					= 48;
		var otProperty 						= 49;
		var otSwimlaneDef 					= 50;
		var otSwimlanes 					= 51;
		var otSwimlane 						= 52;
		var otModelWatcher 					= 53;
		var otScenarioStep 					= 54;
		var otScenarioExtension 			= 55;
		var otParamTag						= 56;
		var	otProjectRole					= 57;
		var otDocumentGenerator				= 58;
		var otMailInterface					= 59;
	
		var ObjectType = enumFactory.newEnumType([
			{ code: 0, label: 'None'},
			{ code: 1, label: 'Project'},
			{ code: 2, label: 'Repository'},
			{ code: 3, label: 'Collection'},
			{ code: 4, label: 'Element'},
			{ code: 5, label: 'Package'},
			{ code: 6, label: 'Model'},
			{ code: 7, label: 'Connector'},
			{ code: 8, label: 'Diagram'},
			{ code: 9, label: 'Requirement'},
			{ code: 10, label: 'Scenario'},
			{ code: 11, label: 'Constraint'},
			{ code: 12, label: 'TaggedValue'},
			{ code: 13, label: 'File'},
			{ code: 14, label: 'Effort'},
			{ code: 15, label: 'Metric'},
			{ code: 16, label: 'Issue'},
			{ code: 17, label: 'Risk'},
			{ code: 18, label: 'Test'},
			{ code: 19, label: 'DiagramObject'},
			{ code: 20, label: 'DiagramLink'},
			{ code: 21, label: 'Resource'},
			{ code: 22, label: 'ConnectorEnd'},
			{ code: 23, label: 'Attribute'},
			{ code: 24, label: 'Method'},
			{ code: 25, label: 'Parameter'},
			{ code: 26, label: 'Client'},
			{ code: 27, label: 'Author'},
			{ code: 28, label: 'Datatype'},
			{ code: 29, label: 'Stereotype'},
			{ code: 30, label: 'Task'},
			{ code: 31, label: 'Term'},
			{ code: 32, label: 'ProjectIssues'},
			{ code: 33, label: 'AttributeConstraint'},
			{ code: 34, label: 'AttributeTag'},
			{ code: 35, label: 'MethodConstraint'},
			{ code: 36, label: 'MethodTag'},
			{ code: 37, label: 'ConnectorConstraint'},
			{ code: 38, label: 'ConnectorTag'},
			{ code: 39, label: 'ProjectResource'},
			{ code: 40, label: 'Reference'},
			{ code: 41, label: 'RoleTag'},
			{ code: 42, label: 'CustomProperty'},
			{ code: 43, label: 'Partition'},
			{ code: 44, label: 'Transition'},
			{ code: 45, label: 'EventProperty'},
			{ code: 46, label: 'EventProperties'},
			{ code: 47, label: 'PropertyType'},
			{ code: 48, label: 'Properties'},
			{ code: 49, label: 'Property'},
			{ code: 50, label: 'SwimlaneDef'},
			{ code: 51, label: 'Swimlanes'},
			{ code: 52, label: 'Swimlane'},
			{ code: 53, label: 'ModelWatcher'},
			{ code: 54, label: 'ScenarioStep'},
			{ code: 55, label: 'ScenarioExtension'},
			{ code: 56, label: 'ParamTag'},
			{ code: 57, label: 'ProjectRole'},
			{ code: 58, label: 'DocumentGenerator'},
			{ code: 59, label: 'MailInterface'},
			{ code: 65, label: 'EAContext'}
		]);
	
		// RepositoryType
		var RepositoryType = enumFactory.newEnumType([
			{ code: 'JET', label: 'Jet', description: '.EAP file, MS Access 97 to 2013 format'},
			{ code: 'FIREBIRD', label: 'Firebird'},
			{ code: 'ACCESS2007', label: 'Access2007', description: '.accdb file, MS Access 2007+ format'},
			{ code: 'ASA', label: 'Sybase', description: 'Sybase SQL Anywhere'},
			{ code: 'SQLSVR', label: 'MicrosoftSqlServer', description: 'Microsoft SQL Server'},
			{ code: 'MYSQL', label: 'MySQL'},
			{ code: 'ORACLE', label: 'Oracle'},
			{ code: 'POSTGRES', label: 'PostgresSQL'}
		]);
	
		// Module Export
		var module = {};
		module.ConnectorType = ConnectorType;
		module.ElementType = ElementType;
		module.ItemIdentifierType = ItemIdentifierType;
		module.ObjectType = ObjectType;
		module.RepositoryType = RepositoryType;
		namespace.registerModule('ser.ea.constants', module);
		return module
	};

}//end ser_ea_constants

