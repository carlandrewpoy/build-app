import { StyleSheet, Text, View, Modal, FlatList, Alert } from "react-native"
import { useState } from "react"
import { Stack } from "expo-router"
import { Input, Button, CheckBox, ButtonGroup, ListItem } from "@rneui/themed"

//ICONS
import { Ionicons } from "@expo/vector-icons"
import { Feather } from "@expo/vector-icons"

import { TouchableOpacity } from "react-native-gesture-handler"
import cuid from "cuid"
import useGenerateCombinations from "@/hooks/useGenerateCombinations"
import LottieView from "lottie-react-native"
import axios from "axios"
import { useAuth } from "@/context/auth"
import { Card } from "@rneui/base"
import { Dropdown } from "react-native-element-dropdown"

const index = () => {
  const { user } = useAuth()
  //INPUT MODAL
  const [modal, setmodal] = useState(false)
  const handleModal = () => setmodal(!modal)

  //COMBINATIONS
  const [combinations, setcombinations] = useState([])

  //SUCCESS PRINT
  const [successRes, setSuccessRes] = useState({})

  //PRINT MODAL
  const [printModal, setPrintModal] = useState(false)
  const handlePrintModal = () => setPrintModal(!printModal)

  //COMBINATIONS
  const [number, setnumber] = useState("")
  const [bet, setbet] = useState("")

  //CHECKBOX
  const [checked, setChecked] = useState(false)
  const toggleCheckbox = () => setChecked(!checked)

  //SUBMIT LOADING STATE
  const [isSubmitLoading, setIsSubmitLoading] = useState(false)

  //SUBMIT LOADING STATE
  const [isPrintLoading, setIsPrintLoading] = useState(false)

  //FUNCTIONS
  function handleAdd() {
    if (checked) {
      const generatedNumbers = useGenerateCombinations(number)
      const allRumbleBets = generatedNumbers.map((num) => ({
        id: cuid(),
        number: num,
        bet: (bet / generatedNumbers.length).toFixed(2),
        game: gameValue,
        time: timeValue,
        rumble: checked,
      }))

      setcombinations([...combinations, ...allRumbleBets])
    } else {
      setcombinations([
        ...combinations,
        {
          id: cuid(),
          number: number,
          bet: bet,
          game: gameValue,
          time: timeValue,
          rumble: checked,
        },
      ])
    }

    handleModal()
    setnumber("")
    setbet("")
    setChecked(false)
  }
  const URL = "https://admin-api-production-9bae.up.railway.app/api/Agent/Bets"

  function handleSubmit() {
    if (combinations.length === 0) return
    setIsSubmitLoading(true)
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
        setSuccessRes(response.data)
        setIsSubmitLoading(false)
        handlePrintModal()
      })
      .catch(function (error) {
        // Alert.alert(error.response.data.error)
        // setIsSubmitLoading(false)
        if (error.response) {
          // The request was made and the server responded with a status code
          if (error.response.status === 404) {
            Alert.alert("API link is not found.")
            setIsSubmitLoading(false)
          } else {
            Alert.alert(error.response.data.error)
            setIsSubmitLoading(false)
          }
        } else if (error.request) {
          // The request was made but no response was received
          Alert.alert("No response received from the server.")
          setIsSubmitLoading(false)
        } else {
          // Something happened in setting up the request that triggered an error
          Alert.alert(
            "An error occurred. Please check your network connection."
          )
          setIsSubmitLoading(false)
        }
      })
    setcombinations([])
  }

  const timeData = [
    { label: "2PM", value: "2pm" },
    { label: "5PM", value: "5pm" },
    { label: "9PM", value: "9pm" },
  ]
  const gameData = [
    { label: "2D", value: "2d" },
    { label: "3D", value: "3d" },
    { label: "4D", value: "4d" },
  ]

  // GAME STATE
  const [gameValue, setGameValue] = useState(null)
  const [isGameFocus, setIsGameFocus] = useState(false)

  const renderGameLabel = () => {
    if (gameValue || isGameFocus) {
      return (
        <Text style={[styles.label, isGameFocus && { color: "blue" }]}>
          Game
        </Text>
      )
    }
    return null
  }
  // TIME STATE
  const [timeValue, settimeValue] = useState(null)
  const [istimeFocus, setIstimeFocus] = useState(false)

  const renderTimeLabel = () => {
    if (timeValue || istimeFocus) {
      return (
        <Text style={[styles.label, istimeFocus && { color: "blue" }]}>
          Time
        </Text>
      )
    }
    return null
  }

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: "Add",
          headerRight: () => (
            <TouchableOpacity>
              <Text
                style={{ fontSize: 18, fontWeight: "400", marginRight: 10 }}
                onPress={handleSubmit}
              >
                Submit
              </Text>
            </TouchableOpacity>
          ),
        }}
      />
      {/* SUBMIT LOADING  */}
      {isSubmitLoading && (
        <View
          style={[
            StyleSheet.absoluteFillObject,
            {
              flex: 1,
              zIndex: 1,
              justifyContent: "center",
              alignItems: "center",
              zIndex: 1,
            },
          ]}
        >
          <LottieView
            source={require("@/assets/loading2.json")}
            style={{ width: 200, height: 200 }}
            autoPlay
            loop
          />
        </View>
      )}

      {/* PRINT LOADING  */}
      {isPrintLoading && (
        <View
          style={[
            StyleSheet.absoluteFillObject,
            {
              flex: 1,
              zIndex: 1,
              justifyContent: "center",
              alignItems: "center",
              zIndex: 1,
            },
          ]}
        >
          <LottieView
            source={require("@/assets/printloader.json")}
            style={{ width: 200, height: 200 }}
            autoPlay
            loop
          />
        </View>
      )}

      {/* DROPDOWN */}
      <View style={{ flexDirection: "row" }}>
        <View style={styles.dropdownContainer}>
          {renderTimeLabel()}
          <Dropdown
            style={[styles.dropdown, istimeFocus && { borderColor: "blue" }]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            iconStyle={styles.iconStyle}
            data={timeData}
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={!istimeFocus ? "Select Time" : "..."}
            value={timeValue}
            onFocus={() => setIstimeFocus(true)}
            onBlur={() => setIstimeFocus(false)}
            onChange={(item) => {
              settimeValue(item.value)
              setIstimeFocus(false)
            }}
            renderLeftIcon={() => (
              <Ionicons
                style={styles.icon}
                color={istimeFocus ? "blue" : "black"}
                name="time-outline"
                size={20}
              />
            )}
          />
        </View>
        <View style={styles.dropdownContainer}>
          {renderGameLabel()}
          <Dropdown
            style={[styles.dropdown, isGameFocus && { borderColor: "blue" }]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            iconStyle={styles.iconStyle}
            data={gameData}
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={!isGameFocus ? "Select Game" : "..."}
            value={gameValue}
            onFocus={() => setIsGameFocus(true)}
            onBlur={() => setIsGameFocus(false)}
            onChange={(item) => {
              setGameValue(item.value)
              setIsGameFocus(false)
            }}
            renderLeftIcon={() => (
              <Ionicons
                style={styles.icon}
                color={isGameFocus ? "blue" : "black"}
                name="game-controller-outline"
                size={20}
              />
            )}
          />
        </View>
      </View>

      {/* <View style={{ padding: 10 }}>
        <Text style={styles.subHeader}>
          {timeValue} / {gameValue}
        </Text>
      </View> */}

      <FlatList
        data={combinations}
        renderItem={({ item }) => (
          <ListItem.Swipeable
            bottomDivider
            rightWidth={90}
            minSlideWidth={40}
            rightContent={(action) => (
              <Button
                containerStyle={{
                  flex: 1,
                  justifyContent: "center",
                  backgroundColor: "#f4f4f4",
                }}
                type="clear"
                icon={{ name: "delete-outline" }}
                onPress={() => {
                  setcombinations(combinations.filter((i) => i.id !== item.id))
                }}
              />
            )}
          >
            <ListItem.Content>
              <ListItem.Title>{item.game}</ListItem.Title>
            </ListItem.Content>
            <ListItem.Content>
              <ListItem.Title>{item.number}</ListItem.Title>
            </ListItem.Content>
            <ListItem.Content right>
              <ListItem.Subtitle>₱{item.bet}</ListItem.Subtitle>
            </ListItem.Content>
            <ListItem.Chevron />
          </ListItem.Swipeable>
        )}
        keyExtractor={(item) => item.id}
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

      {/* PRINT MODAL */}
      <Modal animationType="slide" transparent={true} visible={printModal}>
        <View style={styles.centeredViewPrint}>
          <View style={styles.modalView}>
            <View>
              <Card.Title>{successRes?.success?.transaction_code}</Card.Title>
              <Card.Divider />
            </View>
            <ListItem bottomDivider>
              <ListItem.Content>
                <View>
                  <ListItem.Title style={{ color: "red" }}>
                    Combinations
                  </ListItem.Title>
                </View>
              </ListItem.Content>
              <ListItem.Content right>
                <ListItem.Title right style={{ color: "green" }}>
                  Amount
                </ListItem.Title>
              </ListItem.Content>
            </ListItem>
            <View style={{ maxHeight: "80%" }}>
              <FlatList
                data={successRes?.success?.combinations}
                renderItem={({ item }) => (
                  <>
                    <ListItem bottomDivider>
                      <ListItem.Content>
                        <View>
                          <ListItem.Subtitle>
                            {item.combination}
                          </ListItem.Subtitle>
                        </View>
                      </ListItem.Content>
                      <ListItem.Content right>
                        <ListItem.Subtitle right>₱{item.bet}</ListItem.Subtitle>
                      </ListItem.Content>
                    </ListItem>
                  </>
                )}
              />
              <ListItem bottomDivider>
                <ListItem.Content>
                  <View>
                    <ListItem.Subtitle>Total</ListItem.Subtitle>
                  </View>
                </ListItem.Content>
                <ListItem.Content right>
                  <ListItem.Subtitle right>
                    ₱{successRes?.success?.total}
                  </ListItem.Subtitle>
                </ListItem.Content>
              </ListItem>
            </View>

            <Button
              onPress={() => {
                handlePrintModal()
                setIsPrintLoading(true)
                setTimeout(() => {
                  setIsPrintLoading(false)
                }, 3000)
                setcombinations([])
              }}
              title={"Print"}
              type="clear"
            />
          </View>
        </View>
      </Modal>
      <View style={[StyleSheet.absoluteFill, styles.floatingButton]}>
        <TouchableOpacity>
          <Text
            onPress={handleModal}
            style={{ color: "#00A8E8", fontSize: 18, textAlign: "center" }}
          >
            Add
          </Text>
        </TouchableOpacity>
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
  centeredViewPrint: {
    flex: 1,
    marginTop: 22,
    alignItems: "center",
    justifyContent: "center",
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
    justifyContent: "flex-end",
    marginBottom: 40,
    // position: "absolute",
    // justifyContent: "center",
    // bottom: 10, // Adjust this value as needed
    // right: 30, // Adjust this value as needed
    // left: 30, // Adjust this value as needed
    // backgroundColor: "skyblue",
    // borderRadius: 100,
    // padding: 24,
    // elevation: 5,
  },

  subHeader: {
    backgroundColor: "#2089dc",
    color: "white",
    textAlign: "center",
    paddingVertical: 10,
    marginBottom: 0,
    fontSize: 16,
  },
  dropdownContainer: {
    backgroundColor: "white",
    padding: 16,
    width: "50%",
  },
  dropdown: {
    height: 50,
    borderColor: "gray",
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: "absolute",
    backgroundColor: "white",
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
})
