import { useAuth } from "@/AuthContext";
import { Button } from "@/components/Button";
import { WeightLog } from "@/components/WeightLog";
import { getAllWeights, getWeight, insertWeight, updateWeight } from "@/database/repositories/weightRepository";
import { globalStyles, typography } from "@/styles";
import { convertDate, cycleMonth } from "@/utils/date";
import { checkWeightFormat } from "@/utils/formatting";
import { Calendar, toDateId } from "@marceloterreiro/flash-calendar";
import { Link } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import { useEffect, useState } from "react";
import { FlatList, Modal, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function Weight(){

    const { currentUser } = useAuth()
    const db = useSQLiteContext()
    
    const enterWeight = async () => {
        if (checkWeightFormat(inputWeight)) {
            onChangeInputError(false)
            const element = await getWeight(db, currentUser!.id, selectedDate)
            if (!element){
                insertWeight(db, currentUser!.id, selectedDate, inputWeight) 
            } else {
                setDateWeight(element.measurement)
                setConfirmModalVisible(true)
            }
            getWeights()
        } else {
            onChangeInputError(true)
        }
    }

    const updateSelectedWeight = async() => {
        await updateWeight(db, currentUser!.id, inputWeight, selectedDate)
        getWeights()
    }

    const getWeights = async () => {
        const result = await getAllWeights(db, currentUser!.id, 5)
        setWeights(result)
    }

    const [ selectedDate, setSelectedDate ] = useState(new Date().toISOString().split("T")[0])
    const today = toDateId(new Date())
    const [ selectedDateId, setSelectedDateId ] = useState(today)
    const [ monthId, setMonthId ] = useState(today)
    
    const [ dateWeight, setDateWeight ] = useState<number | null>(null)
    const [ inputWeight, onChangeInputWeight ] = useState("")
    const [ inputError, onChangeInputError ] = useState(false)
    const [ weights, setWeights ] = useState<any[]>([])
    
    const [ confirmModalVisible, setConfirmModalVisible ] = useState(false)
    const [ calendarModalVisible, setCalendarModalVisible ] = useState(false)

    useEffect(() => {
        getWeights()
    }, [])

    return(
        <View>
            <View style={globalStyles.section}>
                <Text style={globalStyles.sectionHeader}>Log weight</Text>
                <Button text={selectedDateId} onPress={() => setCalendarModalVisible(true)}/>
                <View style={{flexDirection: "row", width: "100%"}}>
                    <TextInput 
                        style={[globalStyles.input, {flex: 1}]} 
                        value={inputWeight} 
                        onChangeText={onChangeInputWeight} 
                        placeholder="0.0" 
                        keyboardType="decimal-pad"/>
                    <Button onPress={enterWeight} text="Enter"/>
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
                    <View style={[globalStyles.modalView]}>
                        <View style={[globalStyles.popUp]}>
                            <View style={{height: "40%"}}>
                                <Calendar
                                    calendarActiveDateRanges={[
                                    {
                                        startId: selectedDateId,
                                        endId: selectedDateId,
                                    },
                                    ]}
                                    calendarMaxDateId={today}
                                    calendarMonthId={monthId}
                                    onCalendarDayPress={(date) => {setSelectedDateId(date); setMonthId(date); setSelectedDate(new Date(date).toISOString().split("T")[0]); setCalendarModalVisible(false)}}
                                />
                            <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                                <Button onPress={() => {setMonthId(cycleMonth(monthId, -1))}} text="Prev"/>
                                <Button onPress={() => {setMonthId(cycleMonth(monthId, 1))}} text="Next"/>
                            </View>
                            </View>
                            <Button text="Cancel" onPress={() => {setCalendarModalVisible(false); setMonthId(selectedDateId)}}/>
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
                        <Text style={globalStyles.sectionHeader}>Existing entry on {selectedDate}</Text>
                        <Text style={globalStyles.text}>Would you like to change the measurement from {dateWeight} to {inputWeight}?</Text>
                        <View style={{flexDirection: "row", gap: 8}}>
                            <Button onPress={() => {updateSelectedWeight(); setConfirmModalVisible(false)}} text="Yes"></Button>
                            <Button onPress={() => setConfirmModalVisible(false)} text="No"></Button>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    )
}