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

	// Set the Meadow database to match what is passed in at the command-line
	pFable.settings.MySQL.Database = pFable.settings.ParsedLogDatabase;
	console.info('--> Setting the Database to:'+pFable.settings.ParsedLogDatabase)

	tmpComplete(pFable);
}

module.exports = prepareEnvironment;