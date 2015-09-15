/**
* FableLogParser Bunyan JSON Log Stream Parser
*
* @license     MIT
*
* @author      Steven Velozo <steven@velozo.com>
*
* @description Processes the JSON log into a database
*/

console = require('better-console');

var FableLogParser = function(pSettings)
{
	var _Fable = require('fable').new(pSettings);

	// Merge in any default settings that haven't been passed in
	_Fable.settingsManager.fill(require('./FableLogParser-Options.js'));

	// Make sure the settings contain an input file
	if (_Fable.settings.InputFileName === null)
	{
		console.log('ERROR: You must provide at least an input filename for the DDL JSON file.');
		console.log('       For Example: node FableLogParser.js -i "BestDDLEvar.mddl"');
		process.exit(1);
	}

	// Load the JSON, then run the command with the model passed in
	require('./FableLogParser-Run-Prepare.js')(_Fable, require('./FableLogParser-Run-ExecuteCommand.js'));
};

module.exports = FableLogParser;