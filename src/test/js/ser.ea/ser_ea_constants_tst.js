function ser_ea_constants_tst(manager, instanceName) {

	this.getModule = function(){

		// Perform module imports
		namespace.include(ser_ea_constants);
		namespace.include(ser_unit);
	
		// Local synonyms
		let TestClass = ser.unit.TestClass;
		let enumFactory = ser.context.enumFactory;
		let ConnectorType = ser.ea.constants.ConnectorType;
		let ElementType = ser.ea.constants.ElementType;
		let ObjectType = ser.ea.constants.ObjectType;
		let RepositoryType = ser.ea.constants.RepositoryType;
	
		class TestEnums extends TestClass {
	
			constructor() {
				super();
				this.name = "ser.ea.constants.tst.TestEnums";
			}
		
			testConnectorType() {
				this.assertNotNull(ConnectorType);
				this.assertEquals(25, ConnectorType.values.length);
				this.assertNotNull(ConnectorType.Aggregation, 'Aggregation');
				this.assertNotNull(ConnectorType.Assembly, 'Assembly');
				this.assertNotNull(ConnectorType.Association, 'Association');
				this.assertNotNull(ConnectorType.Collaboration, 'Collaboration');
				this.assertNotNull(ConnectorType.CommunicationPath, 'CommunicationPath');
				this.assertNotNull(ConnectorType.Connector, 'Connector');
				this.assertNotNull(ConnectorType.ControlFlow, 'ControlFlow');
				this.assertNotNull(ConnectorType.Delegate, 'Delegate');
				this.assertNotNull(ConnectorType.Dependency, 'Dependendy');
				this.assertNotNull(ConnectorType.Deployment, 'Deployment');
				this.assertNotNull(ConnectorType.ERLink, 'ERLink');
				this.assertNotNull(ConnectorType.Generalization, 'Generalization');
				this.assertNotNull(ConnectorType.InformationFlow, 'InformationFlow');
				this.assertNotNull(ConnectorType.Instantiation, 'Instantiation');
				this.assertNotNull(ConnectorType.InterruptFlow, 'InterruptFlow');
				this.assertNotNull(ConnectorType.Manifest, 'Manifest');
				this.assertNotNull(ConnectorType.Nesting, 'Nesting');
				this.assertNotNull(ConnectorType.NoteLink, 'NoteLink');
				this.assertNotNull(ConnectorType.ObjectFlow, 'ObjectFlow');
				this.assertNotNull(ConnectorType.Package, 'Package');
				this.assertNotNull(ConnectorType.Realisation, 'Realisation');
				this.assertNotNull(ConnectorType.Sequence, 'Sequence');
				this.assertNotNull(ConnectorType.StateFlow, 'StateFlow');
				this.assertNotNull(ConnectorType.TemplateBinding, 'TemplateBinding');
				this.assertNotNull(ConnectorType.UseCase, 'UseCase');
			}
	
			testElementType() {
				this.assertNotNull(ElementType);
				this.assertEquals(52, ElementType.values.length);
				this.assertNotNull(ElementType.Action);
				this.assertNotNull(ElementType.Activity);
				this.assertNotNull(ElementType.ActivityPartition);
				this.assertNotNull(ElementType.ActivityRegion);
				this.assertNotNull(ElementType.Actor);
				this.assertNotNull(ElementType.Artifact);
				this.assertNotNull(ElementType.Association);
				this.assertNotNull(ElementType.Boundary);
				this.assertNotNull(ElementType.Change);
				this.assertNotNull(ElementType.Class);
				this.assertNotNull(ElementType.Collaboration);
				this.assertNotNull(ElementType.Component);
				this.assertNotNull(ElementType.Constraint);
				this.assertNotNull(ElementType.Decision);
				this.assertNotNull(ElementType.DeploymentSpecification);
				this.assertNotNull(ElementType.DiagramFrame);
				this.assertNotNull(ElementType.EmbeddedElement);
				this.assertNotNull(ElementType.Entity);
				this.assertNotNull(ElementType.EntryPoint);
				this.assertNotNull(ElementType.Event);
				this.assertNotNull(ElementType.ExceptionHandler);
				this.assertNotNull(ElementType.ExitPoint);
				this.assertNotNull(ElementType.ExpansionNode);
				this.assertNotNull(ElementType.ExpansionRegion);
				this.assertNotNull(ElementType.Feature);
				this.assertNotNull(ElementType.GUIElement);
				this.assertNotNull(ElementType.InteractionFragment);
				this.assertNotNull(ElementType.InteractionOccurrence);
				this.assertNotNull(ElementType.InteractionState);
				this.assertNotNull(ElementType.Interface);
				this.assertNotNull(ElementType.InterruptibleActivityRegion);
				this.assertNotNull(ElementType.Issue);
				this.assertNotNull(ElementType.Node);
				this.assertNotNull(ElementType.Note);
				this.assertNotNull(ElementType.Object);
				this.assertNotNull(ElementType.Package);
				this.assertNotNull(ElementType.Parameter);
				this.assertNotNull(ElementType.Part);
				this.assertNotNull(ElementType.Port);
				this.assertNotNull(ElementType.ProvidedInterface);
				this.assertNotNull(ElementType.Report);
				this.assertNotNull(ElementType.RequiredInterface);
				this.assertNotNull(ElementType.Requirement);
				this.assertNotNull(ElementType.Screen);
				this.assertNotNull(ElementType.Sequence);
				this.assertNotNull(ElementType.State);
				this.assertNotNull(ElementType.StateNode);
				this.assertNotNull(ElementType.Synchronization);
				this.assertNotNull(ElementType.Text);
				this.assertNotNull(ElementType.TimeLine);
				this.assertNotNull(ElementType.UMLDiagram);
				this.assertNotNull(ElementType.UseCase);
			}
		
			testObjectType() {
				this.assertNotNull(ObjectType);
				this.assertEquals(61, ObjectType.values.length);
				this.assertNotNull(ObjectType.None);
				this.assertNotNull(ObjectType.Project);
				this.assertNotNull(ObjectType.Repository);
				this.assertNotNull(ObjectType.Collection);
				this.assertNotNull(ObjectType.Element);
				this.assertNotNull(ObjectType.Package);
				this.assertNotNull(ObjectType.Model);
				this.assertNotNull(ObjectType.Connector);
				this.assertNotNull(ObjectType.Diagram);
				this.assertNotNull(ObjectType.Requirement);
				this.assertNotNull(ObjectType.Scenario);
				this.assertNotNull(ObjectType.Constraint);
				this.assertNotNull(ObjectType.TaggedValue);
				this.assertNotNull(ObjectType.File);
				this.assertNotNull(ObjectType.Effort);
				this.assertNotNull(ObjectType.Metric);
				this.assertNotNull(ObjectType.Issue);
				this.assertNotNull(ObjectType.Risk);
				this.assertNotNull(ObjectType.Test);
				this.assertNotNull(ObjectType.DiagramObject);
				this.assertNotNull(ObjectType.DiagramLink);
				this.assertNotNull(ObjectType.Resource);
				this.assertNotNull(ObjectType.ConnectorEnd);
				this.assertNotNull(ObjectType.Attribute);
				this.assertNotNull(ObjectType.Method);
				this.assertNotNull(ObjectType.Parameter);
				this.assertNotNull(ObjectType.Client);
				this.assertNotNull(ObjectType.Author);
				this.assertNotNull(ObjectType.Datatype);
				this.assertNotNull(ObjectType.Stereotype);
				this.assertNotNull(ObjectType.Task);
				this.assertNotNull(ObjectType.Term);
				this.assertNotNull(ObjectType.ProjectIssues);
				this.assertNotNull(ObjectType.AttributeConstraint);
				this.assertNotNull(ObjectType.AttributeTag);
				this.assertNotNull(ObjectType.MethodConstraint);
				this.assertNotNull(ObjectType.MethodTag);
				this.assertNotNull(ObjectType.ConnectorConstraint);
				this.assertNotNull(ObjectType.ConnectorTag);
				this.assertNotNull(ObjectType.ProjectResource);
				this.assertNotNull(ObjectType.Reference);
				this.assertNotNull(ObjectType.RoleTag);
				this.assertNotNull(ObjectType.CustomProperty);
				this.assertNotNull(ObjectType.Partition);
				this.assertNotNull(ObjectType.Transition);
				this.assertNotNull(ObjectType.EventProperty);
				this.assertNotNull(ObjectType.EventProperties);
				this.assertNotNull(ObjectType.PropertyType);
				this.assertNotNull(ObjectType.Properties);
				this.assertNotNull(ObjectType.Property);
				this.assertNotNull(ObjectType.SwimlaneDef);
				this.assertNotNull(ObjectType.Swimlanes);
				this.assertNotNull(ObjectType.Swimlane);
				this.assertNotNull(ObjectType.ModelWatcher);
				this.assertNotNull(ObjectType.ScenarioStep);
				this.assertNotNull(ObjectType.ScenarioExtension);
				this.assertNotNull(ObjectType.ParamTag);
				this.assertNotNull(ObjectType.ProjectRole);
				this.assertNotNull(ObjectType.DocumentGenerator);
				this.assertNotNull(ObjectType.MailInterface);
				//this.assertNotNull(ObjectType.EAContext);
			}
	
			testRepositoryType() {
				this.assertNotNull(RepositoryType);
				this.assertEquals(8, RepositoryType.values.length);
				this.assertNotNull(RepositoryType.Jet);
				this.assertNotNull(RepositoryType.Firebird);
				this.assertNotNull(RepositoryType.Access2007);
				this.assertNotNull(RepositoryType.Sybase);
				this.assertNotNull(RepositoryType.MicrosoftSqlServer);
				this.assertNotNull(RepositoryType.MySQL);
				this.assertNotNull(RepositoryType.Oracle);
				this.assertNotNull(RepositoryType.PostgresSQL);
			}
		}
	
		// Collate test classes
		var testClasses = [
			new TestEnums()
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
		namespace.registerModule('ser.ea.constants.tst', module);
		return module;
	};

}//end ser_ea_constants_tst

