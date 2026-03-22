import { Image, StyleSheet, Text, View } from "react-native";

export default function Index() {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <View style={styles.box}>
          <Image source={require("../assets/images/icons/logbook.png")} style={styles.image}></Image>
          <Text style={styles.text}>Workout Split</Text>
        </View>
        <View style={styles.box}>
          <Image source={require("../assets/images/icons/logbook.png")} style={styles.image}></Image>
          <Text style={styles.text}>Log</Text>
        </View>  
      </View>

      <View style={styles.row}>
        <View style={styles.box}>
          <Image source={require("../assets/images/icons/logbook.png")} style={styles.image}></Image>
          <Text style={styles.text}>Exercises</Text>
        </View>
        <View style={styles.box}>
          <Image source={require("../assets/images/icons/logbook.png")} style={styles.image}></Image>
          <Text style={styles.text}>Timer</Text>
        </View>
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
  },
  text: {
    color: "black",
    fontSize: 25
  }
})