import { StyleSheet, Text, View } from "react-native"
import React, { useEffect, useState } from "react"
import { Stack, useLocalSearchParams } from "expo-router"
import axios from "axios"
import { FlatList } from "react-native-gesture-handler"
import { Card, Image } from "@rneui/themed"

const index = () => {
  const { id } = useLocalSearchParams()
  const [transaction, settransaction] = useState({})

  const URL =
    "https://admin-api-production-9bae.up.railway.app/api/Agent/Transactions"

  function getTransaction() {
    axios({
      method: "get",
      url: `${URL}/${id}`,

      headers: {
        Authorization: `Bearer 18|WR26mfVdUZZRUHKalww3CLL9M4EokzzvbR6Youya`,
      },
    })
      .then(function (response) {
        console.log(response.data)
        settransaction(response.data)
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  useEffect(() => {
    getTransaction()
  }, [])
  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: "Details" }} />

      <Card.Title>CARD WITH DIVIDER</Card.Title>
      <Card.Divider />
      <View style={{ position: "relative", alignItems: "center" }}>
        <Image
          style={{ width: "100%", height: 100 }}
          resizeMode="contain"
          source={{
            uri: "https://avatars0.githubusercontent.com/u/32242596?s=460&u=1ea285743fc4b083f95d6ee0be2e7bb8dcfc676e&v=4",
          }}
        />
        <Text>Pranshu Chittora</Text>
      </View>

      <View style={{}}>
        <Text
          style={{
            fontSize: 20,
            textAlign: "right",
            fontWeight: 500,
            marginBottom: 30,
          }}
        >
          {transaction.draw_date}
        </Text>
        <View>
          <Text style={{ fontSize: 30, fontWeight: 500 }}>
            Transaction Code
          </Text>
          <Text style={{ fontSize: 18, marginBottom: 20 }}>{id}</Text>
        </View>
        <Text style={{ fontSize: 18, fontWeight: 400 }}>
          Game: {transaction.game_type}
        </Text>
        <Text style={{ fontSize: 18, fontWeight: 400 }}>
          Time {transaction.draw_time}
        </Text>

        <Text style={{ fontSize: 30, marginTop: 30, fontWeight: 500 }}>
          Combinations
        </Text>
      </View>
      <FlatList
        data={transaction.combinations}
        renderItem={({ item }) => (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingVertical: 10,
            }}
          >
            <View style={{ width: "50%" }}>
              <Text style={{ fontSize: 20 }}>{item.combination}</Text>
            </View>

            <View style={{ width: "50%" }}>
              <Text style={{ fontSize: 20 }}>₱{item.bet}</Text>
            </View>
          </View>
        )}
      />
    </View>
  )
}

const data = {
  agent_name: "Agent 01",
  game_type: "3d",
  draw_date: "2023-08-09",
  draw_time: "14:00:00",
  combinations: [
    {
      game_type: "3d",
      combination: "112",
      bet: 10,
      rumble: 0,
    },
    {
      game_type: "3d",
      combination: "233",
      bet: 30,
      rumble: 0,
    },
    {
      game_type: "3d",
      combination: "333",
      bet: 5,
      rumble: 0,
    },
  ],
  total: 45,
}

export default index

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
})
