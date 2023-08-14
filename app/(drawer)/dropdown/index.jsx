import React, { useState } from "react"
import { StyleSheet, Text, View } from "react-native"
import { Dropdown } from "react-native-element-dropdown"
import AntDesign from "@expo/vector-icons/AntDesign"
import { Ionicons } from "@expo/vector-icons"

const timeData = [
  { label: "All", value: "" },
  { label: "2PM", value: "14:00:00" },
  { label: "5PM", value: "17:00:00" },
  { label: "9PM", value: "21:00:00" },
]
const gameData = [
  { label: "All", value: "" },
  { label: "2D", value: "2d" },
  { label: "3D", value: "3d" },
  { label: "4D", value: "4d" },
]

const DropdownComponent = () => {
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
  )
}

export default DropdownComponent

const styles = StyleSheet.create({
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
