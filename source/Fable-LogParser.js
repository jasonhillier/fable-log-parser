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

var FableLogParser = function()
{
	var _Fable = require('fable').new({
		Product: 'FableLogParser',
		ProductVersion: require(__dirname+'/../package.json').version,
		ConfigFile: __dirname+'/../Fable-LogParser-Config.json',
		DefaultConfigFile: __dirname+'/../Fable-LogParser-Config-DEFAULT.json'
	});

	// Merge in any default settings that haven't been passed in
	_Fable.settingsManager.fill(require('./Fable-LogParser-Options.js'));

	// Load the JSON, then run the command with the model passed in
	require('./Fable-LogParser-Run-Prepare.js')(_Fable, require('./Fable-LogParser-Run-ExecuteCommand.js'));
};

module.exports = FableLogParser;