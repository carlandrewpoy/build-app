import { StyleSheet, Text, View } from "react-native"
import React, { useContext } from "react"
import { GlobalState } from "@/app/_layout"
import { Stack } from "expo-router"

const index = () => {
  const { successPrint } = useContext(GlobalState)
  return (
    <View>
      <Stack.Screen options={{ title: "Print" }} />
      <Text>print</Text>
      <Text>{successPrint.success.agent_name}</Text>
    </View>
  )
}

export default index

const styles = StyleSheet.create({})
