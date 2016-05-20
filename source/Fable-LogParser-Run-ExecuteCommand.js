/**
* FableLogParser - Run Command Options
*
* @license MIT
*
* @author Steven Velozo <steven@velozo.com>
* @module FableLogParser
*/
var libAsync = require('async');
var libMySQL = require('mysql2');

// Execute whatever command was passed in
var runCommand = function(pFable)
{
	// Create a connection without a pool or database
	pFable.MeadowMySQLConnection = libMySQL.createConnection
	(
		{
			connectionLimit: pFable.settings.MySQL.ConnectionPoolLimit,
			host: pFable.settings.MySQL.Server,
			port: pFable.settings.MySQL.Port,
			user: pFable.settings.MySQL.User,
			password: pFable.settings.MySQL.Password
		}
	);

	libAsync.waterfall(
		[
			// ## 0. Drop the Database
			function(fStageComplete)
			{
				if (pFable.settings.AutomaticallyDropDatabase)
				{
					require('./Fable-LogParser-DropDatabase')(pFable, fStageComplete);
				}
				else
				{
					fStageComplete(false);
				}
			},
			// ## 1. Create the Database
			function(fStageComplete)
			{
				if (pFable.settings.AutomaticallyCreateDatabase)
				{
					require('./Fable-LogParser-CreateDatabase')(pFable, fStageComplete);
				}
				else
				{
					fStageComplete(false);
				}
			},
			// ## 2. Build the shared database connection
			function(fStageComplete)
			{
				console.info('--> Connecting to the Database: '+ pFable.settings.MySQL.Database);
				pFable.MeadowMySQLConnection.end();
				// Create a connection without a pool or database
				pFable.MeadowMySQLConnection = libMySQL.createConnection
				(
					{
						connectionLimit: pFable.settings.MySQL.ConnectionPoolLimit,
						host: pFable.settings.MySQL.Server,
						port: pFable.settings.MySQL.Port,
						user: pFable.settings.MySQL.User,
						password: pFable.settings.MySQL.Password,
						database: pFable.settings.MySQL.Database
					}
				);
				// TODO: Bail on error.
				fStageComplete(false);
			},
			// ## 3. Create the tables
			function(fStageComplete)
			{
				if (pFable.settings.AutomaticallyCreateTables)
				{
					require('./Fable-LogParser-CreateTables')(pFable, fStageComplete);
				}
				else
				{
					fStageComplete(false);
				}
			},
			// TODO: Allow DELETION of data in existing database as a parameter
			// ## 5. Parse the passed-in file
			function(fStageComplete)
			{
				pFable.MeadowMySQLConnection.end();
				require('./Fable-LogParser-ParseLogFile')(pFable, fStageComplete);
			}
		],
		function(pError)
		{
			/*
			var tmpCommand = pFable.settings.Command;

			console.log('');
			console.info('--> Running Command: '+tmpCommand);
			switch(tmpCommand)
			{
				// No command provided, default to info
				default:
					if (tmpCommand !== 'Info')
						console.error('==> Command "'+tmpCommand+'" was not recognized.  Defaulting to Log file list operation!')
					break;
			}
			*/
			// Exit safely now.
			process.exit(0);
		});
}

module.exports = runCommand;