import FontAwesome from "@expo/vector-icons/FontAwesome"
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native"
import { useFonts } from "expo-font"
import { Slot, SplashScreen, Stack, useRouter } from "expo-router"
import { createContext, useEffect, useState } from "react"
import { useColorScheme } from "react-native"
import { Provider, useAuth } from "../context/auth"
import { Text } from "@/components/Themed"

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router"

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(tabs)",
}

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  })

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error
  }, [error])

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync()
    }
  }, [loaded])

  if (!loaded) {
    return null
  }

  return (
    <Provider>
      <RootLayoutNav />
    </Provider>
  )
}

export const GlobalState = createContext()
function RootLayoutNav() {
  const colorScheme = useColorScheme()

  //PICKER
  const [selectedgame, setSelectedgame] = useState(1)
  const [selectedTime, setSelectedTime] = useState(1)

  const [transactions, settransactions] = useState([])

  const [combinations, setcombinations] = useState([
    // {
    //   number: "123",
    //   amount: "50",
    //   game: "3D",
    //   time: "5PM",
    // },
    // {
    //   number: "123",
    //   amount: "50",
    //   game: "3D",
    //   time: "5PM",
    // },
  ])

  const [successPrint, setSuccessPrint] = useState({})

  const value = {
    combinations: combinations,
    setcombinations: setcombinations,
    transactions: transactions,
    settransactions: settransactions,
    selectedgame: selectedgame,
    setSelectedgame: setSelectedgame,
    selectedTime: selectedTime,
    setSelectedTime: setSelectedTime,
    successPrint: successPrint,
    setSuccessPrint: setSuccessPrint,
  }

  return (
    <GlobalState.Provider value={value}>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="(drawer)" options={{ headerShown: false }} />
          <Stack.Screen name="modal" options={{ presentation: "modal" }} />
        </Stack>
      </ThemeProvider>
    </GlobalState.Provider>
  )
}
