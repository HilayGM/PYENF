import React, { useState, useEffect } from "react"
import { View, Text, TextInput, FlatList, StyleSheet, Alert } from "react-native"
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
  const [isAddingAdmin, setIsAddingAdmin] = useState(false)
  const [newAdminName, setNewAdminName] = useState("")
  const [newAdminEmail, setNewAdminEmail] = useState("")
  const [newAdminPassword, setNewAdminPassword] = useState("")

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
  }, []) //Fixed: Added empty dependency array to run only once on mount

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
      await createAdmin({
        name: newAdminName,
        email: newAdminEmail,
        password: newAdminPassword,
      })
      setIsAddingAdmin(false)
      setNewAdminName("")
      setNewAdminEmail("")
      setNewAdminPassword("")
      loadAdmins()
    } catch (error) {
      Alert.alert("Error", "No se pudo crear el administrador")
    }
  }

  if (isAddingAdmin) {
    return (
      <View style={styles.formContainer}>
        <Text style={styles.title}>Agregar Nuevo Administrador</Text>
        <TextInput style={styles.input} placeholder="Nombre" value={newAdminName} onChangeText={setNewAdminName} />
        <TextInput
          style={styles.input}
          placeholder="Correo"
          value={newAdminEmail}
          onChangeText={setNewAdminEmail}
          keyboardType="email-address"
        />
        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          value={newAdminPassword}
          onChangeText={setNewAdminPassword}
          secureTextEntry
        />
        <Button title="Guardar" onPress={handleAdd} buttonStyle={styles.button} />
        <Button title="Cancelar" onPress={() => setIsAddingAdmin(false)} buttonStyle={styles.button} />
      </View>
    )
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
      <Button title="Agregar Administrador" onPress={() => setIsAddingAdmin(true)} buttonStyle={styles.addButton} />
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
  formContainer: {
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  button: {
    marginTop: 10,
  },
})

