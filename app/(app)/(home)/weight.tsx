import { Button } from "@/components/Button";
import { globalStyles } from "@/styles";
import { Text, TextInput, View } from "react-native";

export default function Weight(){
    return(
        <View>
            <View style={globalStyles.section}>
                <Text style={globalStyles.text}>Log weight</Text>
                <View style={{flexDirection: "row"}}>
                    <Button onPress={() => {}} text="Today"/>
                    <TextInput style={globalStyles.input}/>
                    <Button onPress={() => {}} text="Enter"/>
                </View>
            </View>
            <View style={globalStyles.section}>
                <Text style={globalStyles.text}>Track your weight here!</Text>
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