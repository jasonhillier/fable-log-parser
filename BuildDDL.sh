#! /bin/bash
echo "Fable Log Parser"
echo "Contact: Steven Velozo <steven@velozo.com>"
echo ""
echo "---"
echo ""

echo "--> Running npm install"
npm install

echo "--> Generating JSON model from DDL using Stricture"
./node_modules/stricture/bin/stricture -i model/ddl/FableLogParser.mddl -c Compile -f model/json/ -o FableLogParser

echo "--> Generating MySQL Create Statements from JSON using Stricture"
./node_modules/stricture/bin/stricture -i model/json/FableLogParser.json -c MySQL -f model/schema/ -o FableLogParser-CreateTables

echo "--> Generating Meadow Schemas from JSON using Stricture"
./node_modules/stricture/bin/stricture -i model/json/FableLogParser.json -c Meadow  -f model/meadowschemas/ -o "FableLogParser-"
