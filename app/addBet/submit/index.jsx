import { Alert, StyleSheet, Text, View } from "react-native"
import React, { useContext } from "react"
import { Drawer } from "expo-router/drawer"
import { Stack, router } from "expo-router"
import { GlobalState } from "@/app/_layout"
import cuid from "cuid"
import { format } from "date-fns"
import { Button } from "@rneui/themed"
import { useAuth } from "../../../context/auth"
import axios from "axios"

const index = () => {
  const { setcombinations, combinations } = useContext(GlobalState)

  const { user } = useAuth()
  console.log({ combinations })

  const URL = "https://admin-api-production-9bae.up.railway.app/api/Agent/Bets"

  function handlePrint() {
    axios({
      method: "post",
      url: `${URL}`,

      data: {
        combinations: JSON.stringify(combinations),
      },
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    })
      .then(function (response) {
        console.log(response.data)
      })
      .catch(function (error) {
        console.log(error)
      })
    setcombinations([])
    router.replace("/(drawer)/add")
  }
  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: "Print" }} />
      <View style={styles.printView}>
        <Button
          onPress={handlePrint}
          title={"Print"}
          buttonStyle={{ width: 150 }}
        />
      </View>
    </View>
  )
}

export default index

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  printView: {
    padding: 10,
  },
})
