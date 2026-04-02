import { useAuth } from "@/AuthContext";
import { Button } from "@/components/Button";
import { globalStyles } from "@/styles";
import { useSQLiteContext } from "expo-sqlite";
import { useEffect, useState } from "react";
import { FlatList, Text, TextInput, View } from "react-native";

export default function Weight(){

    const { currentUser } = useAuth()
    const db = useSQLiteContext()
    
    
    const insertWeight = async () => {
        if (checkFormat(inputWeight)) {
            onChangeInputError(false)
            await db.runAsync(
                "INSERT INTO weights (user_id, date, measurement) VALUES (?, ?, ?)",
                currentUser!.id,
                date,
                inputWeight
            )
            getWeights()
        } else {
            onChangeInputError(true)
        }
    }

    const getWeights = async () => {
        const result = await db.getAllAsync(
            "SELECT * FROM weights WHERE user_id = ?",
            currentUser!.id
        )
        setWeights(result)
    }

    const checkFormat = (num: string) => {
        const regEx = /^[0-9]{1,3}([.,][0-9]{1,2})?$/ //Five digits, two of them optional decimals
        return regEx.test(num)
    }

    const date = new Date().toISOString().split("T")[0]; //TODO: Should be capable of selecting earlier date
    const [ inputWeight, onChangeInputWeight ] = useState("")
    const [ weights, setWeights ] = useState<any[]>([])
    const [ inputError, onChangeInputError ] = useState(false)

    useEffect(() => {
        getWeights()
    }, [])

    return(
        <View>
            <View style={globalStyles.section}>
                <Text style={globalStyles.text}>Log weight</Text>
                <View style={{flexDirection: "row"}}>
                    <Button onPress={() => {}} text="Today"/>
                    <TextInput 
                        style={globalStyles.input} 
                        value={inputWeight} 
                        onChangeText={onChangeInputWeight} 
                        placeholder="0.0" 
                        keyboardType="decimal-pad"/>
                    <Button onPress={insertWeight} text="Enter"/>
                </View>
                {inputError && <Text style={[globalStyles.text, {color: "red"}]}>Invalid input</Text>}
            </View>
            <View style={globalStyles.section}>
                <FlatList
                    data={weights}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({item}) => <Text style={globalStyles.text}>{item.measurement}</Text>} //TODO: Replace with some type of "measurement" component
                />
            </View>
            <View style={globalStyles.section}>
                <Text style={globalStyles.text}>Weight for last week</Text> 
            </View>
            <View style={globalStyles.section}>
                <Text style={globalStyles.text}>Weight for last month</Text>
            </View>
            <Button text="Tracking history" onPress={() => {}}></Button>
        </View>
    )
}