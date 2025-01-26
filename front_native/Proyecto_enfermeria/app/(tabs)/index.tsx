import React, { useState } from "react"
import { View, StyleSheet } from "react-native"
import Login from "../../components/Login"
import AdminDashboard from "../../components/AdminDashboard"

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isMainAdmin, setIsMainAdmin] = useState(false)
  const [currentAdminEmail, setCurrentAdminEmail] = useState("")

  const handleLogin = (isAdmin: boolean, email: string) => {
    setIsLoggedIn(true)
    setIsMainAdmin(isAdmin)
    setCurrentAdminEmail(email)
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setIsMainAdmin(false)
    setCurrentAdminEmail("")
  }

  return (
    <View style={styles.container}>
      {isLoggedIn ? (
        <AdminDashboard isMainAdmin={isMainAdmin} onLogout={handleLogout} />
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

