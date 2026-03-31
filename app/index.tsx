import { useAuth } from "@/AuthContext";
import { Button } from "@/components/Button";
import { globalStyles, typography } from "@/styles";
import { User } from "@/types/User";
import { useSQLiteContext } from "expo-sqlite";
import { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

export default function Login(){   
    const db = useSQLiteContext();
    
    const signUp = async () => {
        const result = await db.runAsync(
            "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
            name,
            email,
            password
        )
        if (result.changes === 1) signIn()

    }

    const signIn = async() => {
        const user = await db.getFirstAsync<User>(
            "SELECT * FROM users WHERE email = ? AND password = ?",
            email,
            password
        )
        if (user) {
            setCurrentUser(user);
        }
        else setIncorrectInput(true)
    }

    const { setCurrentUser } = useAuth()
    
    const [name, onChangeName] = useState("")
    const [email, onChangeEmail] = useState("")
    const [password, onChangePassword] = useState("")

    var [incorrectInput, setIncorrectInput] = useState(false)
    const [isLogin, setIsLogin] = useState(true)

    return(
        <View style={styles.container}>
            { isLogin ? (
                <View>
                    <Text style={styles.header}>
                        Login here
                    </Text>
                    
                    <TextInput 
                        placeholder="Email" 
                        style={globalStyles.input}
                        value={email}
                        onChangeText={onChangeEmail}
                    />
                    
                    <TextInput 
                        placeholder="Password" 
                        style={globalStyles.input}
                        value={password}
                        onChangeText={onChangePassword}
                        secureTextEntry={true}  
                    />
                    
                    <Button text="Log in" onPress={() => signIn()}></Button>

                    {incorrectInput && <Text style={styles.warning}>Incorrect email or password</Text>}
                    
                    <Pressable onPress={() => setIsLogin(false)}>
                        <Text style={{fontFamily: typography.regular}}>Sign up</Text>
                    </Pressable>
                </View>
            ) : (
                <View>
                    <Text style={styles.header}>Sign up</Text>

                    <TextInput 
                        placeholder="Name" 
                        style={globalStyles.input}
                        value={name}
                        onChangeText={onChangeName}
                    />
                    
                    <TextInput 
                        placeholder="Email" 
                        style={globalStyles.input}
                        value={email}
                        onChangeText={onChangeEmail}
                    />
                    
                    <TextInput 
                        placeholder="Password" 
                        style={globalStyles.input}
                        value={password}
                        onChangeText={onChangePassword}
                        secureTextEntry={true}  
                    />
                    
                    <Button text="Sign up" onPress={() => signUp()}></Button>
                    
                    <Pressable onPress={() => setIsLogin(true)}>
                        <Text style={{fontFamily: typography.regular}}>Back to login</Text>
                    </Pressable>
                </View>
            )
        }
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
    header: {
        fontFamily: typography.regular
    },
    warning: {
        color: "red",
        fontWeight: "bold",
        fontFamily: typography.regular
    },
})