import { globalStyles } from "@/styles";
import { Link } from "expo-router";
import { Pressable, Text, View } from "react-native";

export default function Split(){
    return(
        <View>
            <Link href="/" asChild>
                <Pressable>
                    <Text style={globalStyles.text}>See your training split here!</Text>
                </Pressable>
            </Link>
        </View>
    )
}