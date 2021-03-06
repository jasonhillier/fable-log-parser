/**
* FableLogParser - Options and Command Line Parsing
*
* @license MIT
*
* @author Steven Velozo <steven@velozo.com>
* @module FableLogParser
*/
var libYargs = require('yargs');

/**
* The Default Execution Options
*/
var _Options =
{
	Command: 'Info',

	InputFilePath: __dirname+'/../',
	InputFileName: null,

	// Automatically DROP the database if it exists
	AutomaticallyDropDatabase: false,
	// Automatically Create the database if it doesn't exist
	AutomaticallyCreateDatabase: false,
	// Automatically Create the tables if they don't exist
	AutomaticallyCreateTables: false,

	// Database to Output Log Lines to
	ParsedLogDatabase: 'FableLogParser',

	// State for if CLI options are parsed.
	Parsed: false,

	// The current platform
	Platform: 'nix'
};

/**
* Parse the command line options if they haven't been parsed before.
*/
var parseCommandLineOptions = function()
{
	if (_Options.Parsed)
	{
		return;
	}

	// The "Command to Execute" -c parameter (Relationships, RelationshipsFull, etc.)
	if (libYargs.argv.c !== undefined)
		_Options.Command = libYargs.argv.c;

	// The -i InputFileName parameter (required)
	if (libYargs.argv.i !== undefined)
	{
		_Options.InputFileName = libYargs.argv.i;
	}

	// The -p InputFilePath parameter (defaults to "./")
	if (libYargs.argv.p !== undefined)
		_Options.InputFilePath = libYargs.argv.p;

	// The -x parameter (drops database if it does exist)
	if (libYargs.argv.x !== undefined)
		_Options.AutomaticallyDropDatabase = true;

	// The -d parameter (creates database if it doesn't exist)
	if (libYargs.argv.d !== undefined)
		_Options.AutomaticallyCreateDatabase = true;

	// The -t parameter (creates tables if they don't exist)
	if (libYargs.argv.t !== undefined)
		_Options.AutomaticallyCreateTables = true;

	// Detect the operating system we're working in
	if (/^win/.test(process.platform))
		_Options.Platform = 'windows';
	if (/^darwin/.test(process.platform))
		_Options.Platform = 'mac';
};
parseCommandLineOptions();

module.exports = _Options;