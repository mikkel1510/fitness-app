import { AuthProvider, useAuth } from "@/AuthContext";
import { createDbIfNeeded } from "@/database/database";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { SQLiteProvider } from "expo-sqlite";

export default function RootLayout(){

    const [loaded] = useFonts({
        Manrope: require("@/assets/fonts/Manrope-VariableFont_wght.ttf")
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
                <Stack.Screen name={"(tabs)"} options={{ animation: "fade", animationDuration: 350 }}/>
            </Stack.Protected>
        </Stack>
    )

}