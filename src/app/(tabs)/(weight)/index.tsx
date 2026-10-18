import { useAuth } from "@/AuthContext";
import { Button } from "@/components/Button";
import { WeightLog } from "@/components/WeightLog";
import { globalStyles, typography } from "@/styles";
import { convertDate } from "@/utils/date";
import { checkWeightFormat } from "@/utils/formatting";
import { Calendar, toDateId } from "@marceloterreiro/flash-calendar";
import { Link } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import { useEffect, useState } from "react";
import { FlatList, Modal, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function Weight(){

    const { currentUser } = useAuth()
    const db = useSQLiteContext()
    
    
    const insertWeight = async () => {
        if (checkWeightFormat(inputWeight)) {
            onChangeInputError(false)
            const element = weights.find(item => item.date === todayString) //Check if already logged today
            if (!element){
                await db.runAsync(
                    "INSERT INTO weights (user_id, date, measurement) VALUES (?, ?, ?)",
                    currentUser!.id,
                    todayString,
                    inputWeight.replaceAll(",", ".")
                )
                setTodayEntry(Number.parseInt(inputWeight))
            } else {
                setConfirmModalVisible(true)
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
            todayString
        )
        setTodayEntry(Number.parseInt(inputWeight))
        getWeights()
    }

    const getWeights = async () => {
        const result = await db.getAllAsync(
            "SELECT * FROM (SELECT * FROM weights WHERE user_id = ? ORDER BY date DESC LIMIT 5) sub ORDER BY DATE ASC",
            currentUser!.id
        )
        setWeights(result)
    }

    const todayString = new Date().toISOString().split("T")[0] //TODO: shit from a butt
    const today = toDateId(new Date())
    const [ todayEntry, setTodayEntry ] = useState<number | null>(null)
    const [selectedDate, setSelectedDate] = useState(today)
    const [ inputWeight, onChangeInputWeight ] = useState("")
    const [ weights, setWeights ] = useState<any[]>([])
    const [ inputError, onChangeInputError ] = useState(false)
    const [ confirmModalVisible, setConfirmModalVisible ] = useState(false)
    const [ calendarModalVisible, setCalendarModalVisible ] = useState(false)

    useEffect(() => {
        getWeights()
    }, [])

    return(
        <View>
            <View style={globalStyles.section}>
                <Text style={globalStyles.sectionHeader}>Log weight</Text>
                <Button text={selectedDate} onPress={() => setCalendarModalVisible(true)}/>
                <View style={{flexDirection: "row", width: "100%"}}>
                    <TextInput 
                        style={[globalStyles.input, {flex: 1}]} 
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
                    
                    <Link href="./all_weights" asChild>
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
                    visible={calendarModalVisible}
                    onRequestClose={() => setCalendarModalVisible(false)}
                    transparent={true}
                    animationType="slide"
                >
                    <View style={[globalStyles.popUp, {height: "50%"}]}>
                        <View style={[globalStyles.modalView, {padding: 12}]}>
                            <View style={{height: "80%"}}>
                                <Calendar
                                    calendarActiveDateRanges={[
                                    {
                                        startId: selectedDate,
                                        endId: selectedDate,
                                    },
                                    ]}
                                    calendarMaxDateId={today}
                                    calendarMonthId={today}
                                    onCalendarDayPress={() => {setSelectedDate; setCalendarModalVisible(false)}}
                                />
                            </View>
                            <Button text="Cancel" onPress={() => setCalendarModalVisible(false)}/>
                        </View>
                    </View>
                </Modal>
            <Modal
                visible={confirmModalVisible}
                animationType="slide"
                transparent={true}
            >
                <View style={globalStyles.modalView}>
                    <View style={globalStyles.popUp}>
                        <Text style={globalStyles.sectionHeader}>You already logged today mf</Text>
                        <Text style={globalStyles.text}>Would you like to change today's measurment from {todayEntry} to {inputWeight}?</Text>
                        <View style={{flexDirection: "row", gap: 8}}>
                            <Button onPress={() => {updateWeight(); setConfirmModalVisible(false)}} text="Yes"></Button>
                            <Button onPress={() => setConfirmModalVisible(false)} text="No"></Button>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    )
}