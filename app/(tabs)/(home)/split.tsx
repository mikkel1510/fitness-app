import { Link } from "expo-router";
import { Pressable, Text, View } from "react-native";

export default function Split(){
    return(
        <View>
            <Link href="/" asChild>
                <Pressable>
                    <Text>Hello</Text>
                </Pressable>
            </Link>
        </View>
    )
}