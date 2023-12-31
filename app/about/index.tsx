import { StyleSheet } from "react-native"

import EditScreenInfo from "@/components/EditScreenInfo"
import { Text, View } from "@/components/Themed"
import { SafeAreaView } from "react-native-safe-area-context"
import { Link, Stack } from "expo-router"

export default function two() {
  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ title: "About" }} />

      <View>
        <Link href={"/about/more/"}>
          <Text style={styles.title}>More</Text>
        </Link>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
})
