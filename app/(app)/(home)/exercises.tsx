import { globalStyles } from "@/styles";
import { FlatList, Text, View } from "react-native";
import exercises from "../../../exercises.json";

export default function Exercises(){

    return(
        <View>
            <FlatList
                data={exercises}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({item}) => 
                    <View style={globalStyles.section}>
                        <Text style={globalStyles.sectionHeader}>{item.name}</Text>
                        <Text style={globalStyles.text}>Muscle group: {item.primary_muscle}</Text>
                        <Text style={globalStyles.text}>Secondary muscles: {item.secondary_muscles}</Text>
                    </View>
                }
            />
    
        </View>
    )
}