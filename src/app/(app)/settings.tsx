import { useAuth } from "@/AuthContext";
import { Button } from "@/components/Button";
import { StyleSheet, View } from "react-native";


export default function Settings(){

    const { setCurrentUser } = useAuth()


    return(
        <View style={styles.container}>
            <Button text="Sign out" onPress={() => {setCurrentUser(null)}}></Button>
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        padding: 50,
        alignItems: "center",
    height: "100%",
    justifyContent: "center",
    }
})