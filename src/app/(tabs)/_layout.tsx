import { Tabs } from "expo-router";

export default function AppLayout(){

    return (
        <Tabs initialRouteName="index" screenOptions={{animation: "shift"}}>
            <Tabs.Screen
                name="(weight)"
                options={{
                    title: "Weight",
                    headerShown: false,
                }}
            />
            <Tabs.Screen
                name="log"
                options={{
                    title: "Log"
                }}
            />
            <Tabs.Screen
                name="index"
                options={{
                title: "Home",
                }}
            />
            <Tabs.Screen
                name="split"
                options={{
                    title: "Split"
                }}
            />
            <Tabs.Screen
                name="exercises"
                options={{
                    title: "Exercises"
                }}
            />
        </Tabs>
    )
}