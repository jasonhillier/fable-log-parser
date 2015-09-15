/**
* Unit tests for Fable Log Parser
*
* @license     MIT
*
* @author      Steven Velozo <steven@velozo.com>
*/

var Chai = require("chai");
var Expect = Chai.expect;
var Assert = Chai.assert;

suite
(
	'Fable-LogParser',
	function()
	{
		setup
		(
			function()
			{
			}
		);

		suite
		(
			'Object Sanity',
			function()
			{
				test
				(
					'The class should initialize itself into a happy little object.',
					function()
					{
						testFableLogParser = require('../source/Fable-LogParser.js');
						Expect(testFableLogParser)
							.to.be.a('function');
					}
				);
			}
		);
	}
);