import { Text, View } from "@/components/Themed"
import { useAuth } from "@/context/auth"
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer"
import { Image } from "@rneui/themed"
import { Drawer } from "expo-router/drawer"
import { SafeAreaView } from "react-native-safe-area-context"

export default draweLayout = () => {
  const { user, signOut } = useAuth()
  return (
    <Drawer
      drawerContent={(props) => {
        return (
          <DrawerContentScrollView {...props}>
            <View
              style={{
                height: 200,
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
                borderBottomColor: "#f4f4f4",
                borderBottomWidth: 1,
              }}
            >
              <Image
                source={{ uri: "https://reactnative.dev/img/tiny_logo.png" }}
                style={{
                  height: 130,
                  width: 130,
                  borderRadius: 65,
                }}
              />
              <Text
                style={{
                  fontSize: 22,
                  marginVertical: 6,
                  fontWeight: "bold",
                  color: "#111",
                }}
              >
                {user?.success?.complete_name}
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  color: "#111",
                  marginBottom: 20,
                }}
              >
                {user?.token}
              </Text>
            </View>
            <DrawerItemList {...props} />
            <DrawerItem label="Logout" onPress={() => signOut()} />
          </DrawerContentScrollView>
        )
      }}
    >
      <Drawer.Screen name="(home)/index" options={{ title: "Home" }} />
      <Drawer.Screen name="add/index" options={{ title: "Add" }} />
      <Drawer.Screen name="history/index" options={{ title: "History" }} />
      <Drawer.Screen name="results/index" options={{ title: "Results" }} />
      <Drawer.Screen name="hits/index" options={{ title: "Hits" }} />
      <Drawer.Screen name="reports/index" options={{ title: "Reports" }} />
      <Drawer.Screen name="settings/index" options={{ title: "Settings" }} />
    </Drawer>
  )
}
