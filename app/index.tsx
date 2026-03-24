import { StyleSheet, Text, TextInput, View } from "react-native";

export default function Login(){
    return(
        <View style={styles.container}>
            <Text>
                Login here
            </Text>
            <TextInput placeholder="Email" style={styles.input}>
            </TextInput>
            <TextInput placeholder="Password" style={styles.input}>
            </TextInput>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
    },
    input: {
        borderColor: "grey",
        borderWidth: 1,
        borderRadius: 15,
        padding: 10,
        width: 150,
        margin: 5
    }
})