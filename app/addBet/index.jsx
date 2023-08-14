import { StyleSheet, Text, View, Modal, FlatList } from "react-native"
import { useContext, useState } from "react"
import { Link, Stack, router } from "expo-router"
import { Input, Button, CheckBox } from "@rneui/themed"

//ICONS
import { Ionicons } from "@expo/vector-icons"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import { Feather } from "@expo/vector-icons"

import { GlobalState } from "../_layout"
import {
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native-gesture-handler"
const index = () => {
  //GLOBAL STATE
  const { combinations, setcombinations, selectedgame, selectedTime } =
    useContext(GlobalState)

  //MODAL
  const [modal, setmodal] = useState(false)
  const handleModal = () => setmodal(!modal)

  //COMBINATIONS
  const [number, setnumber] = useState("")
  const [bet, setbet] = useState("")

  //TOGGLE NAMES
  const gameName = ["2D", "3D", "4D"]
  const timeName = ["2PM", "5PM", "9PM"]

  //CHECKBOX
  const [checked, setChecked] = useState(false)
  const toggleCheckbox = () => setChecked(!checked)

  //FUNCTIONS
  function handleAdd() {
    setcombinations([
      ...combinations,
      {
        number: number,
        bet: bet,
        game: gameName[selectedgame],
        time: timeName[selectedTime],
        rumble: checked,
      },
    ])
    handleModal()
    setnumber("")
    setbet("")
    setChecked(false)
  }

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: "Add",
          headerRight: () => (
            <TouchableOpacity>
              <Text
                style={{ fontSize: 20, fontWeight: "500", marginRight: 10 }}
                onPress={() => router.push("addBet/submit")}
              >
                Submit
              </Text>
            </TouchableOpacity>
          ),
        }}
      />
      <View
        style={{
          alignItems: "center",
          borderBottomWidth: 1,
          paddingVertical: 5,
        }}
      >
        <Text style={{ fontSize: 40, fontWeight: "500" }}>
          {gameName[selectedgame]}
        </Text>
        <Text style={{ fontSize: 20 }}>{timeName[selectedTime]}</Text>
      </View>
      {/* <ScrollView style={styles.table}>
        {combinations.map((item, ind) => (
          
        ))}
      </ScrollView> */}

      <FlatList
        data={combinations}
        renderItem={({ item }) => (
          <View style={styles.list}>
            <View style={styles.left_List}>
              {/* <Text style={styles.game}>
                <Text>{item.game}</Text>
                <MaterialCommunityIcons
                  name="numeric-2-circle-outline"
                  size={50}
                  color="#0077b6"
                />
              </Text> */}
              <View style={styles.left_List_Right}>
                <Text style={styles.number}>{item.number}</Text>
                {/* <Text style={styles.game}>{item.time}</Text> */}
              </View>
            </View>
            <Text style={styles.amount}>₱{item.bet}</Text>
            <Feather name="x" size={24} color="black" />
          </View>
        )}
        keyExtractor={(item) => item.number}
      />

      <Modal
        animationType="slide"
        transparent={true}
        visible={modal}
        onShow={() => {
          this.textInput.focus()
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={{ justifyContent: "space-between" }}>
              <Text onPress={handleModal} style={{ textAlign: "right" }}>
                <Feather name="x" size={24} color="black" />
              </Text>
            </View>
            <Input
              placeholder="Number"
              ref={(input) => {
                this.textInput = input
              }}
              value={number}
              onChangeText={(text) => setnumber(text)}
              keyboardType="numeric"
            />
            <Input
              placeholder="Amount"
              value={bet}
              onChangeText={(text) => setbet(text)}
              keyboardType="numeric"
            />
            <CheckBox
              checked={checked}
              onPress={toggleCheckbox}
              iconType="material-community"
              checkedIcon="checkbox-outline"
              uncheckedIcon={"checkbox-blank-outline"}
              title="Rumble"
              size={30}
            />
            <Button onPress={handleAdd} title={"Add"} type="clear" />
          </View>
        </View>
      </Modal>
      <View style={styles.floatingButton}>
        <Ionicons
          onPress={handleModal}
          name="add-outline"
          size={24}
          color="black"
        />
      </View>
    </View>
  )
}

export default index

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  centeredView: {
    flex: 1,
    marginTop: 22,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    width: "90%",
    padding: 35,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  table: {
    // height: 450,
  },
  list: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: "#90e0ef",
  },
  left_List: {
    flexDirection: "row",
  },
  left_List_Right: {
    paddingLeft: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  game: {},
  number: {
    fontSize: 24,
    fontWeight: "500",
  },
  time: {},
  amount: {
    fontSize: 25,
  },
  floatingButton: {
    position: "absolute",
    bottom: 30, // Adjust this value as needed
    right: 30, // Adjust this value as needed
    backgroundColor: "skyblue",
    borderRadius: 100,
    padding: 24,
    elevation: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    textAlign: "center",
  },
})
