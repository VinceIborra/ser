function ser_io(manager, instanceName) {

	this.getModule = function(){

		//=============================================================================
		// Name: ser_io (ser.io)
		//
		// Auth: Vicente Iborra
		//
		// Desc: This file/namespace holds a number of classes which are used to
		//       abstract out some of the EA specific I/O concerns.
		//=============================================================================
	
		//=============================================================================
		// Desc: A utility class to encapsulate outputting to a string array as a
		//       console.  The main reason for this class is for testing purposes.
		//=============================================================================
		class ArrayConsole {
	
			constructor() {
				this.currentIdx = 0;
				this.output = new Array();
			}
	
			//-------------------------------------------------------------------------
			// Desc: This method outputs the given string to the current line on the
			//       console output.  For the ArrayConsole implementation of a console,
			//       the text is appended to the current line being output.
			//
			// Args: text (I) Text being output.
			//
			// Retn: None
			//-------------------------------------------------------------------------
			write(text) {
				if (!this.output[this.currentIdx]) {
					this.output[this.currentIdx] = "";
				}
				this.output[this.currentIdx] = this.output[this.currentIdx] + text;
			}
	
			//-------------------------------------------------------------------------
			// Desc: This method outputs the given string to the next line on the
			//       console output.  For the ArrayConsole implementation of a console,
			//       the text is added as the next line being output.
			//
			// Args: text (I) Text being output.
			//
			// Retn: None
			//-------------------------------------------------------------------------
			writeLine(text) {
				this.output[this.currentIdx] = text;
				this.currentIdx++;
			}
		}
	
		//=============================================================================
		// Desc: A utility class to encapsulate outputting to a file based console.
		//=============================================================================
		class FileConsole {
	
			constructor() {
				this.DEFAULT_OUTPUT_FILE_PATH = "C:\\file.txt";
				this.outputFilePath = this.DEFAULT_OUTPUT_FILE_PATH;
				this.fileHandle = null;
			}
	
			ensureFileIsOpen() {
				if (this.fileHandle == null) {
					var fileSystemObject = new ActiveXObject( "Scripting.FileSystemObject" );
					this.fileHandle = fileSystemObject.OpenTextFile(this.outputFilePath, 8, true);
				}
			}
	
			write(text) {
				this.ensureFileIsOpen();
				this.fileHandle.Write(text);
			}
	
			writeLine(line) {
				this.ensureFileIsOpen();
				this.fileHandle.WriteLine(line);
			}
		}
	
		//=============================================================================
		// Desc: A utility class to encapsulate outputting to the EA Output window
		//=============================================================================
		class EaOutputConsole {
		
			constructor() {
				this.name = 'Script';
				this.partialLine = '';
				this.lastLine = '';
				this.isOutputVisible = false;
			}
	
			ensureOutputIsVisible() {
				if (!this.isOutputVisible) {
					Repository.CreateOutputTab(this.name);
					Repository.EnsureOutputVisible(this.name);
					this.isOutputVisible = true;
				}
			}
	
			write(text) {
				this.partialLine += text;
				this.writeOutput(this.partialLine);
			}
	
			writeLine(line) {
			
				var outputLine = "";
			
				// Make sure we can see the
				this.ensureOutputIsVisible();
			
				// Take care of any partial lines
				if (this.partialLine != '') {
					if (this.lastLine != this.partialLine) {
						outputLine += this.partialLine;
					}
					this.partialLine = '';
				}
			
				// Catch null values
				if (line == null) {
					outputLine += '';
				}
			
				// Finally make sure the line given is output
				else {
					outputLine += line;
				}
			
				// And output it
				this.writeOutput(outputLine);
			}
		
			writeOutput(text) {
				// Split text into lines across \n boundaries
				var lines = text.split("\n");
				lines.forEach(line => Repository.WriteOutput(this.name, line, 0));
				this.lastLine = text;
			}
	
			clear() {
				Repository.ClearOutput(this.name);
			}
		}
	
		class Factory {
		
			newArrayConsole() {
				return new ArrayConsole();
			}
		
			newFileConsole() {
				return FileConsole();
			}
		
			newEaOutputConsole(name) {
				var console = new EaOutputConsole();
				console.name = name;
				return console;
			}
		}
	
		// Module Export
		var module = {};
		module.Factory = Factory;
		namespace.registerModule('ser.io', module);
		return module;
	
	};

}//end ser_io

