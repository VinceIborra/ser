function ser_ea_searchWindow_tst(manager, instanceName) {

	this.getModule = function(){

		// Perform module imports
		namespace.include(ser_unit);
		namespace.include(ser_ea_context);
	
		let ElementWrapper = ser.ea.element.ElementWrapper;
		let DiagramWrapper = ser.ea.diagram.DiagramWrapper;
		let AttributeWrapper = ser.ea.elementFeature.AttributeWrapper;
		let MethodWrapper = ser.ea.elementFeature.MethodWrapper;
		let ObjectType = ser.ea.constants.ObjectType;
	
		class TestEAContext extends ser.unit.TestClass {
	
			constructor() {
				super();
				this.repository = ser.ea.context.repository;
			}
		
			testAttributes() {
			
				const TST_ELM_GUID = '{8872C8B2-4D2B-4766-840A-508DEBDEF00D}';
	
				// Select an element
				var elm = this.repository.getElement(TST_ELM_GUID);
				this.repository.showInProjectView(elm);
				var eac = this.repository.currentSelection.list.elementAt(0);
	
				// objectType
				this.assertTrue(ObjectType.EAContext.equals(eac.objectType));
	
				// contextType
				this.assertTrue(ObjectType.Element.equals(eac.contextType));
			}
		
			testItem() {
			
				const TST_ELM_GUID = '{5BE30AA3-CC06-40f6-9FD5-01C39341A50C}';
				const TST_ATT_GUID = '{5A6586B2-D92A-453c-9865-F3F5F64992A7}';
				const TST_MTH_GUID = '{F84E9FC7-4D6D-40bf-81F0-42C367AC5BF6}';
				const TST_DGM_GUID = '{B8510D5B-D9E1-44eb-A116-29E8A4CC3990}';
			
				// Element
				var elm = this.repository.getElement(TST_ELM_GUID);
				this.repository.showInProjectView(elm);
				var eac = this.repository.currentSelection.list.elementAt(0);
				var itm = eac.item;
				this.assertNotNull(itm);
				this.assertInstanceOf(itm, ElementWrapper);
				this.assertEquals(elm.guid, itm.guid);
	
				// Attribute
				var att = this.repository.getAttribute(TST_ATT_GUID);
				this.repository.showInProjectView(att);
				var eac = this.repository.currentSelection.list.elementAt(0);
				itm = eac.item;
				this.assertNotNull(itm);
				this.assertInstanceOf(itm, AttributeWrapper);
				this.assertEquals(att.guid, itm.guid);
			
				// Method
				var mth = this.repository.getMethod(TST_MTH_GUID);
				this.repository.showInProjectView(mth);
				var eac = this.repository.currentSelection.list.elementAt(0);
				itm = eac.item;
				this.assertNotNull(itm);
				this.assertInstanceOf(itm, MethodWrapper);
				this.assertEquals(mth.guid, itm.guid);
			
				// Diagram
				var dgm = this.repository.getDiagram(TST_DGM_GUID);
				this.repository.showInProjectView(dgm);
				var eac = this.repository.currentSelection.list.elementAt(0);
				var itm = eac.item;
				this.assertNotNull(itm);
				this.assertInstanceOf(itm, DiagramWrapper);
				this.assertEquals(dgm.guid, dgm.guid);
			
				this.underConstruction('There are other base types, but do not know what these are.');
			}
	
			testItems() {
	
				const TST_ELM_GUID = '{F435B59A-B680-4c01-95CB-C85165D3463B}';
			
				// Element
				var elm = this.repository.getElement(TST_ELM_GUID);
				this.repository.showInProjectView(elm);
				var items = this.repository.currentSelection.items;
				this.assertNotNull(items);
				this.assertEquals(1, items.count());
				items.forEach(itm => this.assertNotNull(itm));
				var itm = items.elementAt(0);
				this.assertEquals('anElement', itm.name);
			}
		}
	
		return ser.unit.context.helper.declareTestModule(
			'ser.ea.searchWindow',
			[ TestEAContext ]
		);
	};

}//end ser_ea_searchWindow_tst

