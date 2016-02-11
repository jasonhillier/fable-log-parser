/**
* FableLogParser - Parse a Log File
*
* @license MIT
*
* @author Steven Velozo <steven@velozo.com>
* @module FableLogParser
*/
var libLineByLine = require('line-by-line');
var libMoment = require('moment');

var CountLogLines = function(pLogFileLocation, fComplete)
{
	var tmpLineCount = 0;
	var tmpLineReader = new libLineByLine(pLogFileLocation);

	console.info(' -> Counting lines... ');
	console.time("Log File Line Count");

	tmpLineReader.on('error',
		function(pError)
		{
			console.error('  > ERROR during log file line count: '+pError);
			fComplete(0);
		}
	);

	tmpLineReader.on('line',
		function(pLine)
		{
			tmpLineCount++;
		}
	);

	tmpLineReader.on('end',
		function()
		{
			console.log('  > Log file line count complete');
			console.log('  > Line count: '+tmpLineCount);
			console.timeEnd("Log File Line Count");
			fComplete(tmpLineCount);
		}
	);	
}

var ImportLogLines = function(pFable, pLogFileLocation, fComplete)
{
	var tmpLineReader = new libLineByLine(pLogFileLocation);
	var DALLogLine = require('meadow').new(pFable)
						.loadFromPackage(__dirname+'/../model/meadowschemas/FableLogParser-LogLine.json')
						.setProvider('MySQL');

	console.info(' -> Importing lines... ');
	console.time("Log File Import");

	var libProgressBar = require('progress');

	var tmpBar = new libProgressBar('[:bar] ETA :eta sec (:current of :total) ', { total: pFable.settings.InputFileLineCount, incomplete: '_', complete: '#' });

	tmpLineReader.on('error',
		function(pError)
		{
			console.error('  > ERROR during log file import: '+pError);
			fComplete(true);
		}
	);

	tmpLineReader.on('line',
		function(pLine)
		{
			tmpLineReader.pause();

			var tmpLogEntry = JSON.parse(pLine);

			var tmpLogEntryTime = libMoment(tmpLogEntry.time);
			// TODO: Make the timezone translation dynamic and ... better than this crap.
			tmpLogPSTTime = libMoment(tmpLogEntry.time).subtract(7, 'hour');

			// Now marshal the record from our parsed JSON to the record format
			var tmpLogRecord = (
				{
					Server: tmpLogEntry.name,
					ServerPID: tmpLogEntry.pid,
					ServerVersion: tmpLogEntry.ver,

					Source: tmpLogEntry.Source,

					LogLevel: tmpLogEntry.level,
					LogUTC: tmpLogEntryTime.format("YYYY-MM-DD HH:mm:ss"),

					Message: tmpLogEntry.msg,

					NormalizedYear: tmpLogPSTTime.format('YYYY'),
					NormalizedMonth: tmpLogPSTTime.format('M'),
					NormalizedDay: tmpLogPSTTime.format('D'),

					NormalizedDayOfYear: tmpLogPSTTime.format('DDD'),

					NormalizedHour: tmpLogPSTTime.format('H'),
					NormalizedMinute: tmpLogPSTTime.format('m'),
					Datum: JSON.stringify(tmpLogEntry.datum, null, 2)
				}
			);

			// TODO: Make this marshalling dynamic, so users can describe the potential datum values per-application
			if (tmpLogEntry.datum != null)
			{
				if (typeof(tmpLogEntry.datum.ClientIP) !== 'undefined')
					tmpLogRecord.IPAddress = tmpLogEntry.datum.ClientIP;

				if (typeof(tmpLogEntry.datum.RequestUUID) !== 'undefined')
					tmpLogRecord.RequestID = tmpLogEntry.datum.RequestUUID;

				if (typeof(tmpLogEntry.datum.RequestID) !== 'undefined')
					tmpLogRecord.RequestID = tmpLogEntry.datum.RequestID;

				if (typeof(tmpLogEntry.datum.SessionID) !== 'undefined')
					tmpLogRecord.SessionID = tmpLogEntry.datum.SessionID;

				if (typeof(tmpLogEntry.datum.RequestURL) !== 'undefined')
					tmpLogRecord.RequestURL = tmpLogEntry.datum.RequestURL;

				if (typeof(tmpLogEntry.datum.Action) !== 'undefined')
					tmpLogRecord.Action = tmpLogEntry.datum.Action;

				if (typeof(tmpLogEntry.datum.IDCustomer) !== 'undefined')
					tmpLogRecord.IDCustomer = tmpLogEntry.datum.IDCustomer;

				if (typeof(tmpLogEntry.datum.IDUser) !== 'undefined')
					tmpLogRecord.IDUser = tmpLogEntry.datum.IDUser;
			}

			var tmpQuery = DALLogLine.query.addRecord(tmpLogRecord);

			DALLogLine.doCreate(tmpQuery,
				function(pError, pQuery, pQueryRead, pRecord)
				{
					tmpBar.tick();
					tmpLineReader.resume();
				}
			)
		}
	);

	tmpLineReader.on('end',
		function()
		{
			console.log('  > Log file import complete');
			console.timeEnd("Log File Import");
			fComplete(false);
		}
	);	
}

/***********
 * Parse a Log File
 *****/
var ParseLogFile = function(pFable, fComplete)
{
	console.log('');
	if (typeof(pFable.settings.InputFileName) === 'undefined')
	{
		console.error('>>> Cannot parse log file -- no input file specified.');
		console.error('  > Please set the -p [PATH] -i [INPUTFILE] parameters and try again.')
		return fComplete(true);
	}

	var tmpLogFileLocation = pFable.settings.InputFilePath + pFable.settings.InputFileName;
	console.info('--> Importing log file: '+tmpLogFileLocation);

	CountLogLines(tmpLogFileLocation,
		function(pLineCount)
		{
			pFable.settings.InputFileLineCount = pLineCount;
			ImportLogLines(pFable, tmpLogFileLocation, fComplete);
		});
}

module.exports = ParseLogFile;