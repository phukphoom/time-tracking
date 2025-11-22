const sqlite = require('sqlite');
const sqlite3 = require('sqlite3');

const initDatabase = async () => {
    const database = await sqlite.open({
        filename: './database/database.sqlite3',
        driver: sqlite3.Database,
    });
    await database.migrate({ force: 'last' });
};
initDatabase();
