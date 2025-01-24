import React, { useState, useEffect } from "react"
import { View, Text, StyleSheet, Alert } from "react-native"
import { Button } from "react-native"
import { fetchUserDetails } from "../services/api"

interface UserDetails {
  id: number
  name: string
  treatment: string
  medications: string[]
  log: string
  medication_taken: boolean
}

interface UserDetailsProps {
  userId: number
  onClose: () => void
}

export default function UserDetails({ userId, onClose }: UserDetailsProps) {
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const loadUserDetails = async () => {
      setIsLoading(true)
      try {
        const data = await fetchUserDetails(userId)
        setUserDetails(data)
      } catch (error) {
        Alert.alert("Error", "No se pudieron cargar los detalles del usuario")
        onClose()
      } finally {
        setIsLoading(false)
      }
    }

    loadUserDetails()
  }, [userId])

  if (isLoading) return <Text>Cargando...</Text>
  if (!userDetails) return null

  return (
    <View style={styles.container}>
      <Text style={styles.name}>{userDetails.name}</Text>
      <Text style={styles.detail}>
        <Text style={styles.bold}>Tratamiento:</Text> {userDetails.treatment}
      </Text>
      <Text style={styles.detail}>
        <Text style={styles.bold}>Medicamentos:</Text> {userDetails.medications.join(", ")}
      </Text>
      <Text style={styles.detail}>
        <Text style={styles.bold}>Bitácora:</Text> {userDetails.log}
      </Text>
      <Text style={styles.detail}>
        <Text style={styles.bold}>Medicamento tomado:</Text>
        {userDetails.medication_taken ? " ✅" : " ❌"}
      </Text>
      <Button title="Cerrar" onPress={onClose} buttonStyle={styles.closeButton} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
  detail: {
    marginBottom: 4,
  },
  bold: {
    fontWeight: "bold",
  },
  closeButton: {
    marginTop: 16,
  },
})

