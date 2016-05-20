/**
* FableLogParser - Create Database
*
* @license MIT
*
* @author Steven Velozo <steven@velozo.com>
* @module FableLogParser
*/

/***********
 * Create a Database
 *****/
var CreateDatabase = function(pFable, fComplete)
{
	console.info('--> Creating database if it does not exist: '+pFable.settings.MySQL.Database);

	var tmpQuery = 'CREATE DATABASE IF NOT EXISTS `'+pFable.settings.MySQL.Database+'`;';
	console.info('  > Query: [ '+tmpQuery+' ]')

	pFable.MeadowMySQLConnection.query(tmpQuery,
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

			fComplete(pError);
		}
	);
}

module.exports = CreateDatabase;
