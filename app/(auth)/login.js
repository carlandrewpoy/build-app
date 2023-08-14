import { ActivityIndicator, Text, View } from "react-native"
import { useAuth } from "../../context/auth"
import { TextInput } from "react-native-gesture-handler"
import { useEffect, useRef, useState } from "react"
import { Stack } from "expo-router"
import { Button, Input } from "@rneui/themed"
import styles from "./styles"
import { Image } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import LottieView from "lottie-react-native"
import LoginLoading from "../../components/loading/LoginLoading"

export default function login() {
  const { signIn, loading } = useAuth()
  const [username, setusername] = useState("")
  const [password, setpassword] = useState("")
  console.log(username, password)

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.headerView}>
        <Image style={styles.logo} source={require("../../images/logo.png")} />
        <Text style={styles.upTitle}>Welcome to</Text>
        <Text style={styles.botTitle}>Small Town Lottery</Text>
      </View>
      <View style={styles.inputWrapper}>
        <Input
          style={styles.input}
          placeholder="Username"
          value={username}
          onChangeText={(text) => setusername(text)}
        />
        <Input
          style={styles.input}
          placeholder="Password"
          secureTextEntry={true}
          value={password}
          onChangeText={(text) => setpassword(text)}
        />
        <Button
          title={"Sign in"}
          containerStyle={{
            width: 200,
            marginHorizontal: 50,
          }}
          onPress={() => signIn(username, password)}
        />
        {loading ? (
          <View
            style={{
              position: "absolute",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 1,
            }}
          >
            <LottieView
              source={require("@/assets/loading2.json")}
              style={{ width: 200, height: 200 }}
              autoPlay
              loop
            />
          </View>
        ) : null}
      </View>
    </SafeAreaView>
  )
}
