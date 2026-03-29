import { useAuth } from "@/AuthContext";
import { Button } from "@/components/Button";
import { StyleSheet, Text, View } from "react-native";

export default function Settings(){

    const {setCurrentUser} = useAuth()

    return(
        <View style={styles.container}>
            <Text>Hello</Text>
            <Text>Hello</Text>
            <Text>Hello</Text>
            <Text>Hello</Text>
            <Text>Hello</Text>
            <Button text="Sign out" onPress={() => setCurrentUser(null)}></Button>
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        padding: 50,
        backgroundColor: "black",
        alignItems: "center",
    height: "100%",
    justifyContent: "center",
    }
})