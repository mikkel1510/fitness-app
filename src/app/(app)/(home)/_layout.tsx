import { Stack } from "expo-router";

export default function PagesLayout() {
    return (
        <Stack>
            <Stack.Screen 
                name="index" 
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen
                name="weight/index"
                options={{
                    headerTitle: "Weight"
                }}
            />
            <Stack.Screen
                name="weight/all_weights"
                options={{
                    headerTitle: "All weights"
                }}
            />
        </Stack>
    )
}