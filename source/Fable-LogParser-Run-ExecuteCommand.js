/**
* FableLogParser - Run Command Options
*
* @license MIT
*
* @author Steven Velozo <steven@velozo.com>
* @module FableLogParser
*/


// Execute whatever command was passed in
var runCommand = function(pFable)
{
	var tmpCommand = pFable.settings.Command;
	console.log('');
	console.info('--> Running Command: '+tmpCommand);
	switch(tmpCommand)
	{
		// No command provided, show basic info (the line count of each file)
		default:
			if (tmpCommand !== 'Info')
				console.error('==> Command "'+tmpCommand+'" was not recognized.  Defaulting to Log file list operation!')
			break;
	}
}

module.exports = runCommand;