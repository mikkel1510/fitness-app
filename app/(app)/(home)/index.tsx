import { globalStyles } from "@/styles";
import { Link } from "expo-router";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

export default function Index() {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Link href="./split" asChild>
          <Pressable style={styles.box}>
            <Image source={require("../../../assets/images/icons/calendar-249.png")} style={styles.image}></Image>
            <Text style={[globalStyles.text, {textAlign: "center"}]}>Workout Split</Text>
          </Pressable>
        </Link>
        <Link href="./log" asChild>
          <Pressable style={styles.box}>
            <Pressable></Pressable>
            <Image source={require("../../../assets/images/icons/logbook.png")} style={styles.image}></Image>
            <Text style={[globalStyles.text, {textAlign: "center"}]}>Log</Text>
          </Pressable>  
        </Link>
      </View>

      <View style={styles.row}>
        <Link href="./exercises" asChild>
          <Pressable style={styles.box}>
            <Image source={require("../../../assets/images/icons/lifting.png")} style={styles.image}></Image>
            <Text style={[globalStyles.text, {textAlign: "center"}]}>Exercises</Text>
          </Pressable>
        </Link>
        <Link href="./weight" asChild>
          <Pressable style={styles.box}>
            <Image source={require("../../../assets/images/icons/logbook.png")} style={styles.image}></Image>
            <Text style={[globalStyles.text, {textAlign: "center"}]}>Weight</Text>
          </Pressable>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    height: "100%",
    justifyContent: "center",
  },
  row: {
    flexDirection: "row"
  },
  box: {
    height: 150,
    width: 150,
    padding: 20,
    borderRadius: 10,
    margin: 5,
    backgroundColor: "#e7e7e7",
    alignItems: "center",
    justifyContent: "space-between"
  },
  image: {
    height: 80,
    width: 80,
    color: "black"
  }
})