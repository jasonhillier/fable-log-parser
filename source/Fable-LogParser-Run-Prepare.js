/**
* FableLogParser - Prepare the environment for running
*
* @license MIT
*
* @author Steven Velozo <steven@velozo.com>
* @module FableLogParser
*/
var _Fable = false;

prepareEnvironment = function(pFable, fComplete)
{
	tmpComplete = (typeof(fComplete) === 'function') ? fComplete : function() {};

	// Create a database connection for Meadow to use

	// Check that the database exists

	// Check that the database schema is in place

	tmpComplete(pFable);
}

module.exports = prepareEnvironment;