import { globalStyles } from "@/styles";
import { Text, View } from "react-native";
import exercises from "../../../exercises.json";

export default function Exercises(){

    return(
        <View>
            <Text style={globalStyles.sectionHeader}>See your exercises here!</Text>
            <View style={globalStyles.section}>
                <Text style={globalStyles.sectionHeader}>{exercises[0].name}</Text>
                <Text style={globalStyles.text}>Muscle group: {exercises[0].primary_muscle}</Text>
                <Text style={globalStyles.text}>Secondary muscles: {exercises[0].secondary_muscles}</Text>
            </View>
            <View style={globalStyles.section}>
                <Text style={globalStyles.sectionHeader}>{exercises[1].name}</Text>
                <Text style={globalStyles.text}>Muscle group: {exercises[1].primary_muscle}</Text>
                <Text style={globalStyles.text}>Secondary muscles: {exercises[1].secondary_muscles}</Text>
            </View>
            <View style={globalStyles.section}>
                <Text style={globalStyles.sectionHeader}>{exercises[2].name}</Text>
                <Text style={globalStyles.text}>Muscle group: {exercises[2].primary_muscle}</Text>
                <Text style={globalStyles.text}>Secondary muscles: {exercises[2].secondary_muscles}</Text>
            </View>
    
        </View>
    )
}