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
        RequestURL CHAR(248) NOT NULL DEFAULT '',
        Message CHAR(200) NOT NULL DEFAULT '',
        SessionID CHAR(24) NOT NULL DEFAULT '',
        IDUser INT NOT NULL DEFAULT '0',
        IDCustomer INT NOT NULL DEFAULT '0',
        Source CHAR(24) NOT NULL DEFAULT '',
        IPAddress CHAR(48) NOT NULL DEFAULT '',
        RequestID CHAR(24) NOT NULL DEFAULT '',
        Action CHAR(32) NOT NULL DEFAULT '',
        NormalizedYear INT NOT NULL DEFAULT '0',
        NormalizedMonth INT NOT NULL DEFAULT '0',
        NormalizedDay INT NOT NULL DEFAULT '0',
        NormalizedDayOfYear INT NOT NULL DEFAULT '0',
        NormalizedHour INT NOT NULL DEFAULT '0',
        NormalizedMinute INT NOT NULL DEFAULT '0',
        Datum TEXT,

        PRIMARY KEY (IDLogLine)
    );
