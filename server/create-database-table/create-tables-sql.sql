CREATE TABLE IF NOT EXISTS usersSession
(
    sessionId   TEXT NOT NULL,
    name        TEXT NOT NULL,
    email       TEXT NOT NULL UNIQUE,
    login       TEXT NOT NULL UNIQUE,
    password    TEXT NOT NULL,
    profileInfo TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS addressList
(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name  TEXT NOT NULL,
    phone TEXT NOT NULL,
    city  TEXT NOT NULL
);
DELETE
FROM addressList;
