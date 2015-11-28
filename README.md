Fable Log Parser
=====

[![Code Climate](https://codeclimate.com/github/stevenvelozo/fable-log-parser/badges/gpa.svg)](https://codeclimate.com/github/stevenvelozo/fable-log-parser)
[![Coverage Status](https://coveralls.io/repos/stevenvelozo/fable-log-parser/badge.svg?branch=master)](https://coveralls.io/r/stevenvelozo/fable-log-parser?branch=master)
[![Build Status](https://travis-ci.org/stevenvelozo/fable-log-parser.svg?branch=master)](https://travis-ci.org/stevenvelozo/fable-log-parser)
[![Dependency Status](https://david-dm.org/stevenvelozo/fable-log-parser.svg)](https://david-dm.org/stevenvelozo/fable-log-parser)
[![devDependency Status](https://david-dm.org/stevenvelozo/fable-log-parser/dev-status.svg)](https://david-dm.org/stevenvelozo/fable-log-parser#info=devDependencies)

## Install

```sh
npm install fable-log-parser
```

Then go to the log parser folder, and run npm install to get all the dependencies by running `npm install`.


## Usage

```sh
node FableLogParser.js -p /home/steven/Logs/ -i MyServer.log -x -d -t
```

Which will create a database `FableLogParser` and a table `LogLine` in it which contains each line of the retold log file.  This assumes a local mysql database with the user `root` and the password being blank.  If this isn't the case, you can use the Retold pattern for overloading config files to change the settings.  More documentation to come when time allows!