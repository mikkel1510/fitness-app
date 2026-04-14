import { globalStyles } from "@/styles";
import { FlatList, Text, View } from "react-native";
import splits from "../../../splits.json";

export default function Split(){
    return(
        <View>
            <Text>Choose a predefined split, or create your own.</Text>
            <View>
                <Text style={globalStyles.sectionHeader}>Popular splits</Text>
                <FlatList
                    data={splits}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({item}) => 
                        <View style={globalStyles.section}>
                            <Text style={globalStyles.sectionHeader}>{item.name}</Text>
                            <Text style={globalStyles.text}>Muscle group frequency: {item.frequency}</Text>
                            <Text style={globalStyles.text}>Training days: {item.trainingDays}</Text>
                        </View>
                    }
                />
            </View>
        </View>
    )
}