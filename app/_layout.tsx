import { AuthProvider } from "@/AuthContext";
import { Stack } from "expo-router";
import { SQLiteDatabase, SQLiteProvider } from 'expo-sqlite';

const isLoggedIn = true; //Placeholder until proper auth

export default function AuthLayout(){

    const createDbIfNeeded = async (db: SQLiteDatabase) => {
        console.log("Creating databse")
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
                <Stack screenOptions={{ headerShown: false }}>
                    <Stack.Protected guard={!isLoggedIn}>
                        <Stack.Screen name="index"/>
                    </Stack.Protected>

                    <Stack.Protected guard={isLoggedIn}>
                        <Stack.Screen name="(tabs)"/>
                    </Stack.Protected>
                </Stack>
            </AuthProvider>
        </SQLiteProvider>
    )
}