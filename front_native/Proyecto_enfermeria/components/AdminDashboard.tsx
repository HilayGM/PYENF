import React, { useState } from "react"
import { View, Text, StyleSheet } from "react-native"
import { Button } from "react-native"
import AdminList from "./AdminList"
import UserList from "./UserList"
import UserDetails from "./UserDetails"

interface AdminDashboardProps {
  isMainAdmin: boolean
  onLogout: () => void
}

export default function AdminDashboard({ isMainAdmin, onLogout }: AdminDashboardProps) {
  const [selectedUser, setSelectedUser] = useState<number | null>(null)

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Panel de Administrador</Text>
      {isMainAdmin && <AdminList />}
      <UserList onSelectUser={setSelectedUser} />
      {selectedUser && <UserDetails userId={selectedUser} onClose={() => setSelectedUser(null)} />}
      <Button title="Cerrar Sesión" onPress={onLogout} buttonStyle={styles.logoutButton} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  logoutButton: {
    marginTop: 20,
    backgroundColor: "red",
  },
})

