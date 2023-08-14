import { ActivityIndicator, FlatList, StyleSheet } from "react-native"

import { Text, View } from "@/components/Themed"
import { Link } from "expo-router"
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler"
import { GlobalState } from "../../_layout"

//ICONS
import { AntDesign } from "@expo/vector-icons"
import { MaterialIcons } from "@expo/vector-icons"
import { Foundation } from "@expo/vector-icons"
import { Octicons } from "@expo/vector-icons"
import { Feather } from "@expo/vector-icons"

import { useContext, useEffect, useState } from "react"
import { format, formatDistanceToNow, parseISO } from "date-fns"
import { useAuth } from "../../../context/auth"
import { useIsFocused } from "@react-navigation/native"
import axios from "axios"
import { Card, ListItem } from "@rneui/themed"

export default function index() {
  const { user } = useAuth()

  //URL
  const URL = "https://admin-api-production-9bae.up.railway.app/api/Agent"

  const [transactions, settransactions] = useState([])
  const isFocused = useIsFocused()

  useEffect(() => {
    if (isFocused) {
      axios({
        method: "post",
        url: `${URL}/Transactions`,

        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
        .then(function (response) {
          settransactions(response.data)
        })
        .catch(function (error) {
          console.log(error)
        })
      console.log("history loaded")
    }
  }, [isFocused])

  function firstPart(code) {
    const firstPart = code.split("-")[0]
    return firstPart
  }

  function formattedDistance(date) {
    const dateTime = parseISO(date)
    const formattedDistance = formatDistanceToNow(dateTime, { addSuffix: true })
    return formattedDistance
  }

  return (
    <View style={styles.container}>
      <View style={styles.upperSection}>
        <Card>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <View>
              <Text>Total</Text>
              <View style={{ flexDirection: "row", alignItems: "baseline" }}>
                <Text style={{ fontSize: 20, paddingRight: 5 }}>₱</Text>
                <Text style={styles.total}>2300</Text>
              </View>
            </View>
            <Text style={{ fontSize: 20 }}>2D</Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 20,
            }}
          >
            <View>
              <>
                <Text style={styles.time}>234</Text>
                <Text>02:00 pm</Text>
              </>
            </View>
            <View>
              <>
                <Text style={styles.time}>414</Text>
                <Text>05:00 pm</Text>
              </>
            </View>
            <View>
              <>
                <Text style={styles.time}>875</Text>
                <Text>09:00 pm</Text>
              </>
            </View>
          </View>
        </Card>
      </View>
      <View style={styles.linkView}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{}}
        >
          <Link style={styles.link} href={"add"}>
            <TouchableOpacity style={styles.touchableOpacity}>
              <AntDesign name="plus" size={24} color="#caf0f8" />
              <Text style={styles.text}>Add</Text>
            </TouchableOpacity>
          </Link>
          <Link style={styles.link} href={"history"}>
            <TouchableOpacity style={styles.touchableOpacity}>
              <MaterialIcons name="history" size={24} color="#caf0f8" />
              <Text style={styles.text}>History</Text>
            </TouchableOpacity>
          </Link>
          <Link style={styles.link} href={"results"}>
            <TouchableOpacity style={styles.touchableOpacity}>
              <Foundation name="results" size={24} color="#caf0f8" />
              <Text style={styles.text}>Results</Text>
            </TouchableOpacity>
          </Link>
          <Link style={styles.link} href={"hits"}>
            <TouchableOpacity style={styles.touchableOpacity}>
              <Feather name="target" size={24} color="#caf0f8" />
              <Text style={styles.text}>Hits</Text>
            </TouchableOpacity>
          </Link>
          <Link style={styles.link} href={"reports"}>
            <TouchableOpacity style={styles.touchableOpacity}>
              <Feather name="target" size={24} color="#caf0f8" />
              <Text style={styles.text}>Reports</Text>
            </TouchableOpacity>
          </Link>
        </ScrollView>
      </View>
      <View>
        <Text
          style={{
            fontSize: 20,
            marginTop: 20,
            paddingLeft: 20,
            fontWeight: "500",
          }}
        >
          Recently Added
        </Text>
        <View>
          <FlatList
            data={transactions}
            renderItem={({ item }) => (
              <ListItem bottomDivider>
                <ListItem.Content>
                  <View>
                    <ListItem.Title style={{ color: "red" }}>
                      Code
                    </ListItem.Title>
                    <ListItem.Subtitle>
                      {firstPart(item.transaction_code)}...
                    </ListItem.Subtitle>
                  </View>
                </ListItem.Content>
                <ListItem.Content right>
                  <ListItem.Subtitle style={{ fontSize: 18 }}>
                    {item.game_type}
                  </ListItem.Subtitle>
                  <ListItem.Title right style={{ color: "green" }}>
                    Total: ₱{item.total}
                  </ListItem.Title>
                  <ListItem.Subtitle right>
                    {formattedDistance(item.bet_time)}
                  </ListItem.Subtitle>
                </ListItem.Content>
              </ListItem>
            )}
            keyExtractor={(item) => item.transaction_code}
          />
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  upperSection: {
    paddingVertical: 10,
  },
  linkView: {
    // flexDirection: "row",
    // justifyContent: "center",
    gap: 20,
    // backgroundColor: "#90e0ef",
    // borderTopEndRadius: 30,
    // borderTopLeftRadius: 30,
    paddingVertical: 25,
  },
  touchableOpacity: {
    width: 100,
    height: 110,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0096c7",
    borderRadius: 10,
    marginHorizontal: 10,
  },
  text: {
    color: "#caf0f8",
    fontSize: 18,
    paddingTop: 10,
  },
  time: {
    fontSize: 24,
  },
  total: {
    fontSize: 40,
    fontWeight: "400",
  },
})
