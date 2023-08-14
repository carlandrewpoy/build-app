import axios from "axios"
import {
  router,
  useRootNavigationState,
  useRouter,
  useSegments,
} from "expo-router"
import React, { useState } from "react"
import { Alert } from "react-native"

const AuthContext = React.createContext(null)

// This hook can be used to access the user info.
export function useAuth() {
  return React.useContext(AuthContext)
}

// This hook will protect the route access based on user authentication.
function useProtectedRoute(user) {
  const segments = useSegments()
  const router = useRouter()

  const navigationState = useRootNavigationState()
  React.useEffect(() => {
    if (!navigationState?.key) return

    const inAuthGroup = segments[0] === "(auth)"

    if (
      // If usernot signed in and the initial segment is not anything in the auth group.
      !user &&
      !inAuthGroup
    ) {
      // Redirect to the login page.
      router.replace("/login")
    } else if (user && inAuthGroup) {
      // Redirect away from the login page.
      router.replace("/")
    }
  }, [user, segments, navigationState])
}

const URL = "https://admin-api-production-9bae.up.railway.app/api"
export function Provider(props) {
  const [loading, setloading] = useState(false)
  const [user, setAuth] = React.useState(
    // null
    {
      success: {
        area_name: "area_name",
        complete_name: "Agent 01",
        created_at: null,
        deleted_at: null,
        id: 2,
        location: "location",
        phone_number: "123456789",
        role: "Agent",
        status: null,
        updated_at: null,
        username: "agent01",
      },
      token: "54|99Ou96mXi2h8kyEIGbCiWhc64IRAFZm0tQ6utvxF",
    }
  )

  function handleLogin(username, password) {
    setloading(true)

    console.log(username, password)

    if (!username || !password) {
      Alert.alert("Input required.")
      setloading(false)
    } else {
      axios({
        method: "post",
        url: "https://admin-api-production-9bae.up.railway.app/api/login",
        data: {
          username: username,
          password: password,
        },
      })
        .then((res) => {
          console.log(res.data)
          setAuth(res.data)
          setloading(false)
        })
        .catch(function (error) {
          Alert.alert("Invalid username or password.")
          setloading(false)
        })
    }
  }

  function handleLogout() {
    axios({
      method: "delete",
      url: "https://admin-api-production-9bae.up.railway.app/api/logout",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    })
      .then((res) => {
        console.log(res.data)
      })
      .catch(function (error) {
        console.log(error.data)
      })
    setAuth(null)
  }

  useProtectedRoute(user)

  return (
    <AuthContext.Provider
      value={{
        signIn: handleLogin,
        signOut: handleLogout,
        user: user,
        loading: loading,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  )
}
