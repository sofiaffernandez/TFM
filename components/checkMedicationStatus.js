import React from 'react';
import { View, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MedicationDetails = ({ route, navigation }) => {
  const { checkMedicationStatus } = route.params;

  const markAllAsTaken = async () => {
    const currentDate = new Date().toISOString().split('T')[0]; // Formato YYYY-MM-DD
    const storedMedications = await AsyncStorage.getItem('medications') || '[]';
    const medications = JSON.parse(storedMedications);

    const updatedMedications = medications.map(med =>
      med.date === currentDate ? { ...med, taken: true } : med
    );

    await AsyncStorage.setItem('medications', JSON.stringify(updatedMedications));

    // Llamar a la función para recargar el estado en HealthScreen
    checkMedicationStatus();

    // Volver a la pantalla anterior
    navigation.goBack();
  };

  return (
    <View>
      <Button title="Marcar todo como tomado" onPress={markAllAsTaken} />
    </View>
  );
};

export default MedicationDetails;
