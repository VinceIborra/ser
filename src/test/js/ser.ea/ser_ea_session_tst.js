function ser_ea_session_tst(manager, instanceName) {

	this.getModule = function(){

		// Perform module imports
		namespace.include(ser_unit);
		namespace.include(ser_ea_context);
	
		const PromptType = ser.ea.session.PromptType;
		const PromptResult = ser.ea.session.PromptResult;
	
		class TestSession extends ser.unit.TestClass {
		
			//static interactiveTests = ['testPrompt'];
	
			constructor() {
				super();
				this.session = ser.ea.context.session;
				this.interactiveTestMethods = [ 'testInput', 'testOutput', 'testPrompt' ];
			}
		
			testAttributes() {
			
				// UserName
				this.assertEquals(Session.UserName, this.session.userName);
			
				// Version
				this.assertEquals('1.0', this.session.version);
			}
		
			testInput() {
			
				var input = this.session.input('Enter the string \'abcdef\'');
				this.assertEquals('abcdef', input);
			}
		
			testOutput() {
	
		//		var str = 'twinkle twinkle little star';
		//		this.session.output(str);
		//		var response = this.session.prompt('Check the script output for the string \'' + str + '\'', PromptType.Ok);
				this.underConstruction('The output method seems to generate an \'invocation error\'... skipping for now');
			}
		
			testPrompt() {
	
				// Ok button
				var result = this.session.prompt('Press Ok button.', PromptType.Ok);
				this.assertEquals(result, PromptResult.Ok);
			
				// Yes/No buttons
				result = this.session.prompt('Press Yes button.', PromptType.YesNo);
				this.assertEquals(result, PromptResult.Yes);
				result = this.session.prompt('Press No button.', PromptType.YesNo);
				this.assertEquals(result, PromptResult.No);
	
				// Yes/No/Cancel buttons
				result = this.session.prompt('Press Yes button.', PromptType.YesNoCancel);
				this.assertEquals(result, PromptResult.Yes);
				result = this.session.prompt('Press No button.', PromptType.YesNoCancel);
				this.assertEquals(result, PromptResult.No);
				result = this.session.prompt('Press Cancel button.', PromptType.YesNoCancel);
				this.assertEquals(result, PromptResult.Cancel);
	
				// Ok/Cancel buttons
				result = this.session.prompt('Press Ok button.', PromptType.OkCancel);
				this.assertEquals(result, PromptResult.Ok);
				result = this.session.prompt('Press Cancel button.', PromptType.OkCancel);
				this.assertEquals(result, PromptResult.Cancel);
			}
		}
	
		return ser.unit.context.helper.declareTestModule(
			'ser.ea.session',
			[ TestSession ]
		);
	};

}//end ser_ea_session_tst

