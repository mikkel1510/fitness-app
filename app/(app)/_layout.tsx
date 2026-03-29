import { useAuth } from "@/AuthContext";
import { Redirect, Tabs } from "expo-router";

export default function AuthLayout(){

    const { currentUser } = useAuth()

    if (!currentUser){
        return <Redirect href="/"/>
    }

    return (
        <Tabs screenOptions={{ headerShown: false }}>
            <Tabs.Screen
                name="(home)"
                options={{
                title: "Home",
                }}
            />
            <Tabs.Screen
                name="settings"
                options={{
                title: "Settings"
                }}
            />
        </Tabs>
    )
}