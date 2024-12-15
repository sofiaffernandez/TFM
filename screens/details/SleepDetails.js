import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import globalStyles from '../../styles/styles';

const SleepDetails = () => {
  const [sleepData, setSleepData] = useState([]);
  const [sleepInput, setSleepInput] = useState(''); // Estado para el campo de entrada de horas de sueño

  // Cargar el historial de sueño desde AsyncStorage
  const loadSleepData = async () => {
    try {
      const storedSleep = await AsyncStorage.getItem('sleep') || '[]';
      const sleepRecord = JSON.parse(storedSleep);
      setSleepData(sleepRecord);
    } catch (error) {
      console.error('Error loading sleep data', error);
    }
  };

  // Función para guardar las horas de sueño
  const storeSleep = async (sleepHours) => {
    // Validar si el valor de las horas de sueño es válido
    if (!sleepHours || isNaN(sleepHours) || sleepHours <= 0 || sleepHours > 24) {
      Alert.alert('Error', 'Por favor ingresa un valor válido entre 0 y 24 horas.');
      return;
    }

    try {
      const currentDate = new Date().toISOString().split('T')[0]; // Obtener la fecha actual en formato YYYY-MM-DD
      const storedSleep = await AsyncStorage.getItem('sleep') || '[]';
      const updatedSleep = JSON.parse(storedSleep);
      
      // Verificar si ya existe un registro para el día actual
      const todayIndex = updatedSleep.findIndex(item => item.date === currentDate);

      if (todayIndex >= 0) {
        // Si ya existe un registro, mostrar un mensaje de alerta y no permitir más registros.
        Alert.alert('Error', 'Ya has registrado tus horas de sueño para hoy.');
      } else {
        // Si no existe un registro para hoy, agregar uno nuevo
        updatedSleep.push({ date: currentDate, sleep: parseFloat(sleepHours) });

        // Guardar el nuevo registro
        await AsyncStorage.setItem('sleep', JSON.stringify(updatedSleep));
        loadSleepData(); // Recargar los datos de sueño
        setSleepInput(''); // Limpiar el campo de entrada
      }
    } catch (error) {
      console.error('Error saving sleep data', error);
    }
  };

  // Efecto para cargar los datos cuando la pantalla se monta
  useEffect(() => {
    loadSleepData();
  }, []);

  // Renderizar los elementos de la lista
  const renderItem = ({ item }) => (
    <View style={globalStyles.stepItem}>
      <Text style={globalStyles.historyCardText}>{item.sleep} h</Text>
      <Text style={globalStyles.historyCardDate}>{item.date}</Text>
    </View>
  );

  return (
    <View style={globalStyles.container}
    contentContainerStyle={{ paddingBottom:20 }}>
      <Text style={globalStyles.subtitle}>Historial de sueño</Text>
      {/* Lista de registros de sueño */}
      {sleepData.length > 0 ? (
      <FlatList
        data={sleepData}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={globalStyles.historyCard}
      />
      ) : (
        <Text style={globalStyles.emptyText}>No hay registros de sueño</Text>
      )}

      {/* Campo para ingresar horas de sueño */}
      <TextInput
        style={globalStyles.input}
        keyboardType="numeric"
        placeholder="Ingresa tus horas de sueño"
        value={sleepInput}
        onChangeText={setSleepInput}
        
      />
      
      {/* Botón para guardar las horas de sueño */}
      <TouchableOpacity style={globalStyles.button} onPress={() => storeSleep(sleepInput)}>
        <Text style={globalStyles.buttonText}>Guardar sueño</Text>
      </TouchableOpacity>

    </View>
  );
};

export default SleepDetails;
