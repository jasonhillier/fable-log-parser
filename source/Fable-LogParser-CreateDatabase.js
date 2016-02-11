/**
* FableLogParser - Create Database
*
* @license MIT
*
* @author Steven Velozo <steven@velozo.com>
* @module FableLogParser
*/
var libMySQL = require('mysql2');

/***********
 * Create a Database
 *****/
var CreateDatabase = function(pFable, fComplete)
{
	// Connect to the database without a database specified
	var tmpConnection = libMySQL.createConnection({
		user: pFable.settings.MySQL.User,
		password: pFable.settings.MySQL.Password,
		host: pFable.settings.MySQL.Server,
		port: pFable.settings.MySQL.Port
	});
	console.info('--> Creating database if it does not exist: '+pFable.settings.MySQL.Database);

	var tmpQuery = 'CREATE DATABASE IF NOT EXISTS `'+pFable.settings.MySQL.Database+'`;';
	console.info('  > Query: [ '+tmpQuery+' ]')

	tmpConnection.query(tmpQuery,
		function(pError, pData)
		{
			if (pError)
			{
				console.error('  > ### ERROR Creating Database: '+pError);
			}
			else
			{
				console.log(' > Database created: '+JSON.stringify(pData));
			}

			tmpConnection.end();
			fComplete(pError);
		}
	);
}

module.exports = CreateDatabase;