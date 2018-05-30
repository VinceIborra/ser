//=============================================================================
// Name: ser_io (ser.io)
//
// Auth: Vicente Iborra
//
// Desc: This file/namespace holds a number of classes which are used to
//       abstract out some of the EA specific I/O concerns.
//=============================================================================
!INC Local Scripts.EAConstants-JScript
!INC Ser-Scripts-Src.ser
(function() {
var lns = ser.namespace('io');

//=============================================================================
// Desc: A utility class to encapsulate outputting to a string array as a
//       console.  The main reason for this class is for testing purposes.
//=============================================================================
lns.ArrayConsole = function() {
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
lns.ArrayConsole.prototype.write = function(text) {
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
lns.ArrayConsole.prototype.writeLine = function(text) {
	this.output[this.currentIdx] = text;
	this.currentIdx++;
}

//=============================================================================
// Desc: A utility class to encapsulate outputting to a file based console.
//=============================================================================
lns.FileConsole = function() {}

lns.FileConsole.prototype.DEFAULT_OUTPUT_FILE_PATH = "C:\\file.txt";

lns.FileConsole.prototype.outputFilePath = lns.FileConsole.prototype.DEFAULT_OUTPUT_FILE_PATH;

lns.FileConsole.prototype.fileHandle = null;

lns.FileConsole.prototype.ensureFileIsOpen = function() {
	if (this.fileHandle == null) {
		var fileSystemObject = new ActiveXObject( "Scripting.FileSystemObject" );
		this.fileHandle = fileSystemObject.OpenTextFile(this.outputFilePath, 8, true);	
	}
}

lns.FileConsole.prototype.write = function(text) {
	this.ensureFileIsOpen();
	this.fileHandle.Write(text);
}

lns.FileConsole.prototype.writeLine = function(line) {
	this.ensureFileIsOpen();
	this.fileHandle.WriteLine(line);
}

//=============================================================================
// Desc: A utility class to encapsulate outputting to the EA Output window
//=============================================================================
lns.EaOutputConsole = function() {
	this.partialLine = "";
}

lns.EaOutputConsole.prototype.isOutputVisible = false;

lns.EaOutputConsole.prototype.ensureOutputIsVisible = function() {
	if (!this.isOutputVisible) {
		Repository.EnsureOutputVisible( "Script" );
		this.isOutputVisible = true;
	}
}

lns.EaOutputConsole.prototype.write = function(text) {
	this.partialLine = text;
}

lns.EaOutputConsole.prototype.writeLine = function(line) {
	
	var outputLine = "";
	
	// Make sure we can see the
	this.ensureOutputIsVisible();
	
	// Take care of any partial lines
	if (this.partialLine != "") {
		outputLine += this.partialLine;
		this.partialLine = "";
	}
	
	// Catch null values
	if (line == null) {
		outputLine += "";
	}
	
	// Finally make sure the line given is output
	else {
		outputLine += line;
	}
	
	// And output it
	Session.Output(outputLine);	
}

lns.EaOutputConsole.prototype.clear = function() {
	Repository.ClearOutput("Script");
}

}());