function ser_ea_native_searchWindow_tst(manager, instanceName) {

	this.getModule = function(){

		// Perform module imports
		namespace.include(ser_unit);
	
		class TestNativeEAContext extends ser.unit.TestClass {
	
			constructor() {
				super();
			}
	
			testDiagramSelection() {
			
				const TST_DGM_GUID = '{441EBB81-56A1-41f2-8595-9DA440F5EC37}';
			
				// Select diagram - using the Diagram object
				var dgm = Repository.GetDiagramByGuid(TST_DGM_GUID);
				Repository.ShowInProjectView(dgm);
				var currentSelection = Repository.CurrentSelection;
				this.assertEquals(1, currentSelection.List.Count);
				var eac = currentSelection.List.GetAt(0);
				this.assertEquals(0, eac.ContextType); // None
				this.assertEquals('Diagram', eac.BaseType); // TODO This does not work for a brand new created diagram.... EA needs to be restarted in order for this to work properly
			}
		
		}
	
		return ser.unit.context.helper.declareTestModule(
			'ser.ea.native.searchWindow',
			[ TestNativeEAContext ]
		);
	};

}//end ser_ea_native_searchWindow_tst

