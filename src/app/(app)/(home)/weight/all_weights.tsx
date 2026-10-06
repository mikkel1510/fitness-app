import { useAuth } from "@/AuthContext";
import { WeightLog } from "@/components/WeightLog";
import { globalStyles } from "@/styles";
import { convertDate } from "@/utils/date";
import { useSQLiteContext } from "expo-sqlite";
import { useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";

export default function AllWeights(){

    const { currentUser } = useAuth()
    const db = useSQLiteContext()

    const [ weights, setWeights ] = useState<any[]>([])

    useEffect(() => {
        const fetchWeights = async () => {
            const result = await db.getAllAsync(
                "SELECT * FROM weights WHERE user_id = ? ORDER BY date ASC",
                currentUser!.id
            )
            setWeights(result)
        }
        fetchWeights()
    }, [])

    return(
        <View style={globalStyles.section}>
            <Text style={globalStyles.sectionHeader}>Full weight log</Text>
            <FlatList
                data={weights}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({item}) => 
                    <WeightLog measurement={item.measurement} date={convertDate(item.date)}/>
                }
                ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
            />
        </View>
    )
}