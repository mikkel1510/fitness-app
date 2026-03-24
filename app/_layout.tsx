import { Stack } from "expo-router";

const isLoggedIn = false; //Placeholder until proper auth

export default function AuthLayout(){
    return(
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Protected guard={!isLoggedIn}>
                <Stack.Screen name="index"/>
            </Stack.Protected>

            <Stack.Protected guard={isLoggedIn}>
                <Stack.Screen name="(tabs)"/>
            </Stack.Protected>
        </Stack>
    )
}