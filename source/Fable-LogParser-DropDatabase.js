/**
* FableLogParser - Drop Database
*
* @license MIT
*
* @author Steven Velozo <steven@velozo.com>
* @module FableLogParser
*/
var libMySQL = require('mysql2');

/***********
 * Drop a Database
 *****/
var DropDatabase = function(pFable, fComplete)
{
	// Connect to the database without a database specified
	var tmpConnection = libMySQL.createConnection({
		user: pFable.settings.MySQL.User,
		password: pFable.settings.MySQL.Password,
		host: pFable.settings.MySQL.Server,
		port: pFable.settings.MySQL.Port
	});
	console.info('--> Dropping database if it does exist: '+pFable.settings.MySQL.Database);

	var tmpQuery = 'DROP DATABASE IF EXISTS `'+pFable.settings.MySQL.Database+'`;';
	console.info('  > Query: [ '+tmpQuery+' ]')

	tmpConnection.query(tmpQuery,
		function(pError, pData)
		{
			if (pError)
			{
				console.error('  > ### ERROR Dropping Database: '+pError);
			}
			else
			{
				console.log(' > Database dropped: '+JSON.stringify(pData));
			}

			tmpConnection.end();
			fComplete(pError);
		}
	);
}

module.exports = DropDatabase;