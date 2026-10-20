import { SQLiteDatabase } from "expo-sqlite"

export const createDbIfNeeded = async (db: SQLiteDatabase) => {
        await db.execAsync(
            `
            CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(100), email VARCHAR(254) UNIQUE, password TEXT); 
            CREATE TABLE IF NOT EXISTS notes (id INTEGER PRIMARY KEY AUTOINCREMENT, user_id INTEGER, text TEXT);
            CREATE TABLE IF NOT EXISTS weights (id INTEGER PRIMARY KEY AUTOINCREMENT, user_id INTEGER, date DATE, measurement DECIMAL(5,2));
            `
        )
    }