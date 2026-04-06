import { globalStyles } from "@/styles";
import { StyleSheet, Text, View } from "react-native";

type WeightLogProps = {
    measurement: string
    date: string
}

export function WeightLog(props: WeightLogProps){
    return(
        <View style={styles.weightItem}>
            <Text style={globalStyles.text}>{props.measurement} kg</Text>
            <Text style={globalStyles.text}>{props.date}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    weightItem: {
        flexDirection: "row",
        justifyContent: "space-between",
    }
})