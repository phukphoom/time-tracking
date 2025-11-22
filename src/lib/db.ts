import { open } from 'sqlite';
import sqlite3 from 'sqlite3';

export const openDatabase = async () => {
	return open({
		filename: './database/database.sqlite3',
		driver: sqlite3.Database,
	});
};
