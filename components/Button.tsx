import { Pressable, StyleSheet, Text } from "react-native";

type ButtonProps = {
    text: string
    onPress: () => void
}


export function Button(props: ButtonProps){
    return(
        <Pressable style={styles.frame} onPress={props.onPress}>
            <Text style={styles.text}>{props.text}</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    frame: {
        backgroundColor: "black",
        padding: 10,
        borderRadius: 10
    },
    text: {
        color: "white"
    }
})