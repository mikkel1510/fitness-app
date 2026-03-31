import { StyleSheet } from "react-native"

export const typography = {
    regular: "Manrope"
}

export const globalStyles = StyleSheet.create({
    text: {
        fontFamily: typography.regular,
        fontSize: 20,
    },
    input: {
        borderColor: "grey",
        borderWidth: 1,
        borderRadius: 15,
        padding: 10,
        width: 200,
        margin: 5,
        fontFamily: typography.regular,
    },
})
