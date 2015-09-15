/**
* FableLogParser - Create the Tables
*
* @license MIT
*
* @author Steven Velozo <steven@velozo.com>
* @module FableLogParser
*/

var libFS = require('fs')

/***********
 * Create the Database Tables
 *****/
var CreateTables = function(pFable, fComplete)
{
	console.log('--> Creating the Fable Log Parser Tables')
	libFS.readFile(__dirname+'/../model/schema/FableLogParser-CreateTables.mysql.sql', 'utf8',
		function (pError, pData)
		{
			if (pError)
			{
				console.log('  > ### Error loading query for creating tables: '+pError);
				return fComplete(pError);
			}

			var tmpTableCreateStatement = pData;
			//console.log(tmpTableCreateStatement)
		
			pFable.MeadowMySQLConnectionPool.query(tmpTableCreateStatement, {},
				function(pError, pData)
				{
					if (pError)
					{
						console.error('  > ### ERROR Creating Tables: '+pError);
					}
					else
					{
						console.log(' > Tables created: '+JSON.stringify(pData));
					}

					fComplete(pError);
				}
			);
		});
}

module.exports = CreateTables;