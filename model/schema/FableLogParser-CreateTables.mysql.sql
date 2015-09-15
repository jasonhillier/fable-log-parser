-- Data Model -- Generated 2015-09-15T18:39:04.838Z

-- This script creates the following tables:
-- Table ----------------------------------------- Column Count ----------------
--   LogLine                                                23
--   User                                                    5
--   Customer                                                2



--   [ LogLine ]
CREATE TABLE IF NOT EXISTS
    LogLine
    (
        IDLogLine INT UNSIGNED NOT NULL AUTO_INCREMENT,
        GUIDLogLine CHAR(36) NOT NULL DEFAULT '00000000-0000-0000-0000-000000000000',
        CreateDate DATETIME,
        Deleted TINYINT NOT NULL DEFAULT '0',
        Server CHAR(24) NOT NULL DEFAULT '',
        ServerPID CHAR(16) NOT NULL DEFAULT '',
        ServerVersion CHAR(12) NOT NULL DEFAULT '',
        LogLevel INT NOT NULL DEFAULT '0',
        LogUTC DATETIME,
        RequestURL CHAR(128) NOT NULL DEFAULT '',
        SessionID CHAR(24) NOT NULL DEFAULT '',
        IDUser INT NOT NULL DEFAULT '0',
        IDCustomer INT NOT NULL DEFAULT '0',
        Source CHAR(24) NOT NULL DEFAULT '',
        IPAddress CHAR(12) NOT NULL DEFAULT '',
        RequestID CHAR(24) NOT NULL DEFAULT '',
        Action CHAR(32) NOT NULL DEFAULT '',
        NormalizedYear INT NOT NULL DEFAULT '0',
        NormalizedMonth INT NOT NULL DEFAULT '0',
        NormalizedDay INT NOT NULL DEFAULT '0',
        NormalizedHour INT NOT NULL DEFAULT '0',
        NormalizedMinute INT NOT NULL DEFAULT '0',
        Datum TEXT,

        PRIMARY KEY (IDLogLine)
    );



--   [ User ]
CREATE TABLE IF NOT EXISTS
    User
    (
        IDUser INT UNSIGNED NOT NULL AUTO_INCREMENT,
        GUIDUser CHAR(36) NOT NULL DEFAULT '00000000-0000-0000-0000-000000000000',
        IDCustomer INT NOT NULL DEFAULT '0',
        UserFullName CHAR(64) NOT NULL DEFAULT '',
        UserEmail CHAR(64) NOT NULL DEFAULT '',

        PRIMARY KEY (IDUser)
    );



--   [ Customer ]
CREATE TABLE IF NOT EXISTS
    Customer
    (
        IDCustomer INT UNSIGNED NOT NULL AUTO_INCREMENT,
        GUIDCustomer CHAR(36) NOT NULL DEFAULT '00000000-0000-0000-0000-000000000000',

        PRIMARY KEY (IDCustomer)
    );
