import { Button } from "@/components/Button";
import { useSQLiteContext } from "expo-sqlite";
import { useState } from "react";
import { Text, TextInput, View } from "react-native";

export default function Log(){
    const db = useSQLiteContext()

    const insertLog = async () => {
        await db.runAsync(
            "INSERT INTO notes (user_id, text) VALUES (?, ?)",
            1,
            text
        )
        getLogs()
    }

    const getLogs = async () => {
        const result = await db.getAllAsync("SELECT * FROM notes");
        console.log(result)
    }

    const [text, onChangeText] = useState("")

    return(
        <View>
            <Text>Log your training progress here!</Text>
            <Text>Note</Text>
            <TextInput value={text} onChangeText={onChangeText} placeholder="Write your note here"/>
            <Button text="Save note"  onPress={insertLog}></Button>
        </View>
    )
}