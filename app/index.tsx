import { Button } from "@/components/Button";
import { useSQLiteContext } from "expo-sqlite";
import { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

export default function Login(){   
    const db = useSQLiteContext();
    
    const test = async () => {
        const result = await db.getAllAsync("SELECT * FROM users");
        console.log(result);
    };
    
    const signUp = async () => {
        await db.runAsync(
            "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
            signUpName,
            signUpEmail,
            signUpPassword
        )

        test()
    }
    
    const [logInEmail, onChangeLoginEmail] = useState("")
    const [logInPassword, onChangeLoginPassword] = useState("")
    const [signUpName, onChangeSignUpName] = useState("")
    const [signUpEmail, onChangeSignUpEmail] = useState("")
    const [signUpPassword, onChangeSignUpPassword] = useState("")

    return(
        <View style={styles.container}>
            <View>
                <Text>
                    Login here
                </Text>
                
                <TextInput 
                    placeholder="Email" 
                    style={styles.input}
                    value={logInEmail}
                    onChangeText={onChangeLoginEmail}
                />
                
                <TextInput 
                    placeholder="Password" 
                    style={styles.input}
                    value={logInPassword}
                    onChangeText={onChangeLoginPassword}
                    secureTextEntry={true}  
                />
                
                <Button text="Log in" onPress={() => {}}></Button>
            </View>
            <View>
                <Text>Sign up</Text>

                <TextInput 
                    placeholder="Name" 
                    style={styles.input}
                    value={signUpName}
                    onChangeText={onChangeSignUpName}
                />
                
                <TextInput 
                    placeholder="Email" 
                    style={styles.input}
                    value={signUpEmail}
                    onChangeText={onChangeSignUpEmail}
                />
                
                <TextInput 
                    placeholder="Password" 
                    style={styles.input}
                    value={signUpPassword}
                    onChangeText={onChangeSignUpPassword}
                    secureTextEntry={true}  
                />
                
                <Button text="Sign up" onPress={() => signUp()}></Button>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        gap: 20
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