function ser_ea_native_repository_tst(manager, instanceName) {

	this.getModule = function(){

		// Perform module imports
		namespace.include(ser_unit);
	
		class TestNativeRepository extends ser.unit.TestClass {
	
			constructor() {
				super();
			}
		
	
			testShowInProjectViewMethod() {
	
				const TST_ATT_GUID = '{C76EBFD6-603F-4e5b-9E7C-A8E32540FA23}';
				const TST_DGM_GUID = '{13CD574D-9386-4129-A8DF-87E192AD2272}';
				const TST_ELM_GUID = '{192DBD0F-95AE-43eb-9408-7E4E7F561C01}';
				const TST_MTH_GUID = '{6CBF0249-4E14-4b37-91FF-9D0C83FCDF62}';
				const TST_PKG_GUID = '{4B6D7E55-9F76-4e4b-A965-DBC61C512CA5}';
			
				var att = Repository.GetAttributeByGuid(TST_ATT_GUID);
				Repository.ShowInProjectView(att);
				var obj = Repository.GetTreeSelectedObject();
				this.assertNotNull(obj);
				this.assertEquals(TST_ATT_GUID, obj.AttributeGUID);
			
				var dgm = Repository.GetDiagramByGuid(TST_DGM_GUID);
				Repository.ShowInProjectView(dgm);
				var obj = Repository.GetTreeSelectedObject();
				this.assertNotNull(obj);
				this.assertEquals(TST_DGM_GUID, obj.DiagramGUID);
	
				var elm = Repository.GetElementByGuid(TST_ELM_GUID);
				this.assertNotNull(elm);
				Repository.ShowInProjectView(elm);
				var obj = Repository.GetTreeSelectedObject();
				this.assertNotNull(obj);
				this.assertEquals(TST_ELM_GUID, obj.ElementGUID);
	
				var mth = Repository.GetMethodByGuid(TST_MTH_GUID);
				Repository.ShowInProjectView(mth);
				var obj = Repository.GetTreeSelectedObject();
				this.assertNotNull(obj);
				this.assertEquals(TST_MTH_GUID, obj.MethodGUID);
	
				var pkg = Repository.GetPackageByGuid(TST_PKG_GUID);
				this.assertNotNull(pkg);
				Repository.ShowInProjectView(pkg);
				var obj = Repository.GetTreeSelectedObject();
				this.assertNotNull(obj);
				this.assertEquals(TST_PKG_GUID, obj.PackageGUID);
			}
		}
	
		return ser.unit.context.helper.declareTestModule(
			'ser.ea.native.repository',
			[ TestNativeRepository ]
		);
	};

}//end ser_ea_native_repository_tst

