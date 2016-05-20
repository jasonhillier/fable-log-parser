/**
* FableLogParser - Drop Database
*
* @license MIT
*
* @author Steven Velozo <steven@velozo.com>
* @module FableLogParser
*/

/***********
 * Drop a Database
 *****/
var DropDatabase = function(pFable, fComplete)
{
	console.info('--> Dropping database if it does exist: '+pFable.settings.MySQL.Database);

	var tmpQuery = 'DROP DATABASE IF EXISTS `'+pFable.settings.MySQL.Database+'`;';
	console.info('  > Query: [ '+tmpQuery+' ]')

	pFable.MeadowMySQLConnection.query(tmpQuery,
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

			fComplete(pError);
		}
	);
}

module.exports = DropDatabase;
