//=============================================================================
// Name: Ser-Scripts-Tst/all
//
// Auth: Vicente Iborra
//
// Desc: This module runs all the tests.
//=============================================================================
!INC Ser-Scripts-Src.ser
!INC Ser-Scripts-Src.ser_ea_unit

//=============================================================================
// Desc: This section imports all the tests so that they can be run all
//       in one go.  Note that the mode on the testRunner in the
//       module ser.ea.unit is set to "multiple" to inhibit the test
//       modules from running theirs tests as they get loaded.
//=============================================================================

// Configure the default test runner
ser.ea.unit.testRunner.mode = "multiple";
ser.ea.unit.testRunner.testClassDetail = true;
ser.ea.unit.testRunner.testMethodDetail = true;

// Select test modules to run
!INC Ser-Scripts-Tst.ser
//!INC Ser-Scripts-Tst.ser_ea
!INC Ser-Scripts-Tst.ser_ea_unit
!INC Ser-Scripts-Tst.ser_io

//=============================================================================
// Desc: This section runs the tests using the default test runner.
//=============================================================================
ser.ea.unit.testRunner.runTests("multiple");