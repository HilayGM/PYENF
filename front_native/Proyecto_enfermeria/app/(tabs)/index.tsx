import React, { useState } from "react"
import { View, StyleSheet } from "react-native"
import { Button } from "react-native"
import AdminList from "../../components/AdminList"
import UserList from "../../components/UserList"

export default function App() {
  const [showAdmins, setShowAdmins] = useState(false)
  const [showUsers, setShowUsers] = useState(false)

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <Button
          title="Administradores"
          onPress={() => {
            setShowAdmins(true)
            setShowUsers(false)
          }}
          buttonStyle={styles.button}
        />
        <Button
          title="Usuarios"
          onPress={() => {
            setShowUsers(true)
            setShowAdmins(false)
          }}
          buttonStyle={styles.button}
        />
      </View>
      {showAdmins && <AdminList />}
      {showUsers && <UserList />}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 16,
  },
  button: {
    width: 150,
  },
})

