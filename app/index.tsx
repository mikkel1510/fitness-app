import { Button } from "@/components/Button";
import { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

export default function Login(){
    
    const [email, onChangeEmail] = useState("")
    const [password, onChangePassword] = useState("")
    return(
        <View style={styles.container}>
            <Text>
                Login here
            </Text>
            
            <TextInput 
                placeholder="Email" 
                style={styles.input}
                value={email}
                onChangeText={onChangeEmail}
            />
            
            <TextInput 
                placeholder="Password" 
                style={styles.input}
                value={password}
                onChangeText={onChangePassword}
                secureTextEntry={true}  
            />
            
            <Button text="Log in" onPress={() => console.log("Email: "+email+"\nPassword: "+password)}></Button>
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
        width: 200,
        margin: 5
    }
})