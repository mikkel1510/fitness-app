import { Stack } from "expo-router";

export default function WeightLayout(){
    return (
        <Stack>
            <Stack.Screen 
                name="index"
                options={{headerTitle: "Weight"}}
            />
            <Stack.Screen
                name="all_weights"
                options={{headerTitle: "All weights"}}
            />
        </Stack>
    )
}