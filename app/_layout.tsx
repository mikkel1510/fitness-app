import { AuthProvider, useAuth } from "@/AuthContext";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
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

    const [loaded] = useFonts({
        ByteBounce: require("../assets/fonts/PublicPixel.ttf")
    })

    if (!loaded){
        return null
    }

    return( 
        <SQLiteProvider databaseName="test.db" onInit={createDbIfNeeded}>
            <AuthProvider>
                <RootNavigator/>
            </AuthProvider>
        </SQLiteProvider>
    )
}

function RootNavigator(){
    const { currentUser } = useAuth()

    return(
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Protected guard={!currentUser}>
                <Stack.Screen name={"index"} options={{ animation: "slide_from_bottom", animationDuration: 350 }}/>
            </Stack.Protected>
            <Stack.Protected guard={currentUser != null}>
                <Stack.Screen name={"(app)"} options={{ animation: "fade", animationDuration: 350 }}/>
            </Stack.Protected>
        </Stack>
    )

}