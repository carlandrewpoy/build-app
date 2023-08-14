import { View, Text, StyleSheet } from "react-native"
import React from "react"
import LottieView from "lottie-react-native"

const LoginLoading = () => {
  return (
    <View style={[StyleSheet.absoluteFillObject, styles.container]}>
      <LottieView
        source={require("@/components/loading/LoginLoading")}
        style={{ width: 200, height: 200 }}
        autoPlay
        loop
      />
    </View>
  )
}

export default LoginLoading

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0, 0.3)",
    zIndex: 1,
  },
})
