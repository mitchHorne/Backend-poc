const tableColumns = `id INTEGER PRIMARY KEY ASC AUTOINCREMENT,
surname TEXT NOT NULL, 
initials TEXT NOT NULL, 
department TEXT NOT NULL,
clockNumber TEXT NULL, 
overheadCrane TEXT NULL,
forklift TEXT NULL,
tractor TEXT NULL,
firstAid TEXT NULL, 
workingHeights TEXT NULL,
fire TEXT NULL,
siteRep TEXT NULL, 
mobileCrane TEXT NULL`;

export default tableColumns;
