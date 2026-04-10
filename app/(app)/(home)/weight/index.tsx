import { useAuth } from "@/AuthContext";
import { Button } from "@/components/Button";
import { WeightLog } from "@/components/WeightLog";
import { globalStyles, typography } from "@/styles";
import { convertDate } from "@/utils/date";
import { checkWeightFormat } from "@/utils/formatting";
import { Link } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import { useEffect, useState } from "react";
import { FlatList, Modal, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function Weight(){

    const { currentUser } = useAuth()
    const db = useSQLiteContext()
    
    
    const insertWeight = async () => {
        if (checkWeightFormat(inputWeight)) {
            const element = weights.find(item => item.date === date) //Check if already logged today

            if (!element){
                onChangeInputError(false)
                await db.runAsync(
                    "INSERT INTO weights (user_id, date, measurement) VALUES (?, ?, ?)",
                    currentUser!.id,
                    date,
                    inputWeight.replaceAll(",", ".")
                )
            } else {
                setModalVisible(true)
            }

            getWeights()
        } else {
            onChangeInputError(true)
        }
    }

    const updateWeight = async() => {
        await db.runAsync(
            "UPDATE weights SET measurement = ? WHERE user_id = ? AND date = ?",
            inputWeight,
            currentUser!.id,
            date
        )
        getWeights()
    }

    const getWeights = async () => {
        const result = await db.getAllAsync(
            "SELECT * FROM (SELECT * FROM weights WHERE user_id = ? ORDER BY date DESC LIMIT 5) sub ORDER BY DATE ASC",
            currentUser!.id
        )
        setWeights(result)
    }

    const date = new Date().toISOString().split("T")[0]; //TODO: Should be capable of selecting earlier date

    const [ inputWeight, onChangeInputWeight ] = useState("")
    const [ weights, setWeights ] = useState<any[]>([])
    const [ inputError, onChangeInputError ] = useState(false)
    const [ modalVisible, setModalVisible ] = useState(false)

    useEffect(() => {
        getWeights()
    }, [])

    return(
        <View>
            <View style={globalStyles.section}>
                <Text style={globalStyles.sectionHeader}>Log weight</Text>
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
                <View style={globalStyles.sectionRow}>
                    <Text style={globalStyles.sectionHeader}>Log <Text style={globalStyles.text}>(last 5)</Text></Text>
                    
                    <Link href="./weight/all_weights" asChild>
                        <TouchableOpacity onPress={() => {}}>
                                <Text style={{fontFamily: typography.regular, color: "blue"}}>View all</Text>
                        </TouchableOpacity>
                    </Link>
                </View>
                <FlatList
                    data={weights}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({item}) => 
                        <WeightLog measurement={item.measurement} date={convertDate(item.date)}/>
                    }
                    ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
                    scrollEnabled={false}
                />
            </View>
            <View style={globalStyles.section}>
                <Text style={globalStyles.sectionHeader}>Weekly progress</Text> 
            </View>
            <View style={globalStyles.section}>
                <Text style={globalStyles.sectionHeader}>Monthly progress</Text>
            </View>
            <Modal
                visible={modalVisible}
                animationType="slide"
                transparent={true}
            >
                <View style={globalStyles.modalView}>
                    <View style={globalStyles.popUp}>
                        <Text style={globalStyles.sectionHeader}>You already logged today mf</Text>
                        <Text style={globalStyles.text}>Would you like to change today's measurment from x to {inputWeight}?</Text>
                        <View style={{flexDirection: "row"}}>
                            <Button onPress={() => {updateWeight(); setModalVisible(false)}} text="Yes"></Button>
                            <Button onPress={() => setModalVisible(false)} text="No"></Button>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    )
}