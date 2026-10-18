import { useAuth } from "@/AuthContext";
import { Button } from "@/components/Button";
import { globalStyles } from "@/styles";
import { useSQLiteContext } from "expo-sqlite";
import { useEffect, useState } from "react";
import { FlatList, Text, TextInput, View } from "react-native";

export default function Log(){

    const { currentUser } = useAuth()
    const db = useSQLiteContext()

    const insertLog = async () => {
        if (text){
            await db.runAsync(
                "INSERT INTO notes (user_id, text) VALUES (?, ?)",
                currentUser!.id,
                text
            )
            getLogs()
        }
    }

    const getLogs = async () => {
        const result = await db.getAllAsync(
            "SELECT * FROM notes WHERE user_id = ?", 
            currentUser!.id
        );
        setLogs(result)
    }

    const [logs, setLogs] = useState<any[]>([])

    const [text, onChangeText] = useState("")

    useEffect(() => {
        getLogs()
    }, [])

    return(
        <View>
            <View style={globalStyles.section}>
                <Text style={globalStyles.sectionHeader}>Note</Text>
                <TextInput 
                    value={text} 
                    onChangeText={onChangeText} 
                    placeholder="Write your note here"
                    style={[globalStyles.input, {width: "auto"}]}
                />
                <Button text="Save note"  onPress={insertLog}></Button>
            </View>
            <FlatList
                data={logs}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({item}) => <Text style={globalStyles.text}>{item.text}</Text>} //TODO: Replace with some type of "note" component
                style={globalStyles.section}
            />
        </View>
    )
}