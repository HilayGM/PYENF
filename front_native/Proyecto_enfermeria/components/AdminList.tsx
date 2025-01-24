import React, { useState, useEffect } from "react"
import { View, Text, FlatList, StyleSheet, Alert } from "react-native"
import { Button } from "react-native"
import { fetchAdmins, deleteAdmin, createAdmin } from "../services/api"

interface Admin {
  id: number
  name: string
  email: string
}

export default function AdminList() {
  const [admins, setAdmins] = useState<Admin[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const loadAdmins = async () => {
    setIsLoading(true)
    try {
      const data = await fetchAdmins()
      setAdmins(data)
    } catch (error) {
      Alert.alert("Error", "No se pudieron cargar los administradores")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadAdmins()
  }, [])

  const handleDelete = async (id: number) => {
    try {
      await deleteAdmin(id)
      loadAdmins()
    } catch (error) {
      Alert.alert("Error", "No se pudo eliminar el administrador")
    }
  }

  const handleAdd = async () => {
    try {
      const newAdmin = {
        name: `Admin ${admins.length + 1}`,
        email: `admin${admins.length + 1}@example.com`,
        password: "123456",
      }
      await createAdmin(newAdmin)
      loadAdmins()
    } catch (error) {
      Alert.alert("Error", "No se pudo crear el administrador")
    }
  }

  return (
    <View>
      <Text style={styles.title}>Lista de Administradores</Text>
      {isLoading ? (
        <Text>Cargando...</Text>
      ) : (
        <FlatList
          data={admins}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.adminItem}>
              <Text>
                {item.name} ({item.email})
              </Text>
              <Button title="Eliminar" onPress={() => handleDelete(item.id)} buttonStyle={styles.deleteButton} />
            </View>
          )}
        />
      )}
      <Button title="Agregar Administrador" onPress={handleAdd} buttonStyle={styles.addButton} />
    </View>
  )
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  adminItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  deleteButton: {
    backgroundColor: "red",
    width: 100,
  },
  addButton: {
    marginTop: 16,
  },
})

