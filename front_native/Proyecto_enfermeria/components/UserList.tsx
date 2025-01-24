import React, { useState, useEffect } from "react"
import { View, Text, FlatList, Image, StyleSheet, Alert } from "react-native"
import { Button } from "react-native"
import UserDetails from "./UserDetails"
import { fetchUsers } from "../services/api"

interface User {
  id: number
  name: string
  profile_pic: string
}

export default function UserList() {
  const [users, setUsers] = useState<User[]>([])
  const [selectedUser, setSelectedUser] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const loadUsers = async () => {
    setIsLoading(true)
    try {
      const data = await fetchUsers()
      setUsers(data)
    } catch (error) {
      Alert.alert("Error", "No se pudieron cargar los usuarios")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadUsers()
  }, [])

  return (
    <View>
      <Text style={styles.title}>Lista de Usuarios</Text>
      {isLoading ? (
        <Text>Cargando...</Text>
      ) : (
        <FlatList
          data={users}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.userItem}>
              <Image source={{ uri: item.profile_pic }} style={styles.profilePic} />
              <Text>{item.name}</Text>
              <Button
                title="Ver Detalles"
                onPress={() => setSelectedUser(item.id)}
                buttonStyle={styles.detailsButton}
              />
            </View>
          )}
        />
      )}
      {selectedUser && <UserDetails userId={selectedUser} onClose={() => setSelectedUser(null)} />}
    </View>
  )
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  userItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  profilePic: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 16,
  },
  detailsButton: {
    width: 120,
  },
})

