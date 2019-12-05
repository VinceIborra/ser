function ser_external_linq_tst(manager, instanceName) {

	this.getModule = function(){

		// Perform module imports
		namespace.include(ser_unit);
	
		// Local synonyms
		let TestClass = ser.unit.TestClass;
		let Enumerable = ser.external.linq.Enumerable;
	
		class TestEnumerable extends TestClass {
	
			constructor() {
				super();
				this.colours = [ 'red', 'blue', 'green'];
			}
		
			testDoAction() {
	
				var enumerable = Enumerable.from(this.colours);
			
				// Overload:function(action<element>)
				var array = [];
				enumerable
				.doAction(colour => array.push('doAction1 ' + colour))
				.doAction(colour => array.push('doAction2 ' + colour))
				.forEach(colour => array.push('forEach ' + colour));
				this.assertEquals([
					'doAction1 red', 'doAction2 red', 'forEach red',
					'doAction1 blue', 'doAction2 blue', 'forEach blue',
					'doAction1 green', 'doAction2 green', 'forEach green'
				], array);
	
				// Overload:function(action<element,index>)
				array = [];
				enumerable
				.doAction((colour, idx) => { array.push('doAction1 ' + colour + ' ' + idx)})
				.doAction((colour, idx) => { array.push('doAction2 ' + colour + ' ' + idx)})
				.forEach((colour, idx) => { array.push('forEach ' + colour + ' ' + idx)});
				this.assertEquals([
					'doAction1 red 0', 'doAction2 red 0', 'forEach red 0',
					'doAction1 blue 1', 'doAction2 blue 1', 'forEach blue 1',
					'doAction1 green 2', 'doAction2 green 2', 'forEach green 2'
				], array);	
			}
		
			testForce() {
				var enumerable = Enumerable.from(this.colours);
			
				// Without force()
				var array = [];
				enumerable
				.doAction(colour => array.push('doAction1 ' + colour))
				.doAction(colour => array.push('doAction2 ' + colour));
				this.assertEquals(0, array.length);
			
				// With force()
				array = [];
				enumerable
				.doAction(colour => array.push('doAction1 ' + colour))
				.doAction(colour => array.push('doAction2 ' + colour))
				.force();
				this.assertEquals([
					'doAction1 red', 'doAction2 red',
					'doAction1 blue', 'doAction2 blue',
					'doAction1 green', 'doAction2 green'
				], array);
			}
		
			testForEach() {
			
				var enumerable = Enumerable.from(this.colours);
			
				// Overload:function(action<element>)
				var colourArray = [];
				enumerable.forEach(colour => colourArray.push(colour));
				this.assertEquals(['red', 'blue', 'green'], colourArray);
	
				// Overload:function(action<element,index>)
				colourArray = [];
				var indexArray = [];
				enumerable.forEach((colour, index) => {
					colourArray.push(colour);
					indexArray.push(index);
				});
				this.assertEquals(['red', 'blue', 'green'], colourArray);
				this.assertEquals([0, 1, 2], indexArray);
			
				// Overload:function(func<element,bool>)
				colourArray = [];
				enumerable.forEach((colour) => {
					colourArray.push(colour);
					if (colour === 'blue') {
						return false;
					}
				});
				this.assertEquals(['red', 'blue'], colourArray);
			
				// Overload:function(func<element,index,bool>)
				colourArray = [];
				indexArray = [];
				enumerable.forEach((colour, index) => {
					colourArray.push(colour);
					indexArray.push(index);
					if (index === 0) {
						return false;
					}
				});
				this.assertEquals(['red'], colourArray);
				this.assertEquals([0], indexArray);
			}
		
			testFrom() {
			
				var enumerable = Enumerable.from(this.colours);
				var arrayOutput = enumerable.toArray();;
			
				this.assertEquals('red', arrayOutput[0]);
				this.assertEquals('blue', arrayOutput[1]);
				this.assertEquals('green', arrayOutput[2]);
			}
		
			testSelect() {
		
				var enumerable = Enumerable.from(this.colours);
			
				// Overload:function(selector<element>)
				var array = [];
				enumerable.select(colour => colour + 'AChange').forEach(str => array.push(str));
				this.assertEquals(['redAChange', 'blueAChange', 'greenAChange'], array);
			
				// Overload:function(selector<element,index>)
				array = [];
				enumerable.select((colour, idx) => colour + 'AChange' + idx).forEach(str => array.push(str));
				this.assertEquals(['redAChange0', 'blueAChange1', 'greenAChange2'], array);
			}
		
			testSelectMany() {
			
				var enumerable = Enumerable.from(this.colours);
			
			
				// Overload:function(collectionSelector<element>)
				enumerable.selectMany(colour => [colour, colour, colour])
				.forEach(str => dbg(str));
	
				// Overload:function(collectionSelector<element,index>)
				enumerable.selectMany((colour, idx) => [colour+idx, colour+idx, colour+idx])
				.forEach(str => dbg(str));
	
				// Overload:function(collectionSelector<element>,resultSelector)
				enumerable.selectMany(
					(colour) => { 
						if (colour == 'red') {
							return ['one', 'two', 'three'];
						}
						else if (colour == 'blue') {
							return ['mon', 'tue', 'wed'];
						}
						else if (colour == 'green') {
							return ['jan', 'feb', 'mar'];
						}
					},
					(a, b) => { return a+b; }
				)
				.forEach(str => dbg(str));
			
				// Overload:function(collectionSelector<element,index>,resultSelector)
	
			}
	
		}
	
		// Declare namespace
		const NAMESPACE = 'ser.external.linq';
	
		// Collate test classes
		var testClasses = [
			new TestEnumerable()
		];
	
		// Setup a local test runner
		var testRunner = new ser.unit.TestRunner();
		testRunner.testClassDetail = false;
		testRunner.testMethodDetail = false;
		testRunner.registerTestClasses(testClasses);
	
		// And register with global test runner
		ser.unit.context.runner.registerTestClasses(testClasses, NAMESPACE);
	
		// Module Export
		var module = {};
		module.testClasses = testClasses;
		module.testRunner = testRunner;
		namespace.registerModule(`${NAMESPACE}.tst`, module);
		return module;
	};

}//end ser_external_linq_tst

