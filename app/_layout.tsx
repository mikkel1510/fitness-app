import { AuthProvider } from "@/AuthContext";
import { Slot } from "expo-router";
import { SQLiteDatabase, SQLiteProvider } from "expo-sqlite";

export default function RootLayout(){

    const createDbIfNeeded = async (db: SQLiteDatabase) => {
        await db.execAsync(
            `
            CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, email TEXT, password TEXT);
            CREATE TABLE IF NOT EXISTS notes (id INTEGER PRIMARY KEY AUTOINCREMENT, user_id INTEGER, text TEXT);
            `
        )
    }

    return( 
        <SQLiteProvider databaseName="test.db" onInit={createDbIfNeeded}>
            <AuthProvider>
                <Slot/>
            </AuthProvider>
        </SQLiteProvider>
    )
}