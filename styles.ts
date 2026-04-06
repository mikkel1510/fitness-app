import { StyleSheet } from "react-native"

export const typography = {
    regular: "Manrope"
}

export const globalStyles = StyleSheet.create({
    text: {
        fontFamily: typography.regular,
        fontSize: 20,
    },
    sectionHeader: {
        fontFamily: typography.regular,
        fontSize: 30,
        marginBottom: 10,
        fontWeight: "bold"
    },
    input: {
        borderColor: "grey",
        borderWidth: 1,
        borderRadius: 15,
        padding: 10,
        width: 200,
        margin: 5,
        fontFamily: typography.regular,
        backgroundColor: "white"
    },
    section: {
        backgroundColor: "lavender",
        borderRadius: 20,
        padding: 10,
        margin: 20
    },
    sectionRow: {
        flexDirection: "row", 
        alignItems: "center", 
        justifyContent: "space-between"
    }
})
